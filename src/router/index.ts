// src/router/index.js or index.ts if using TypeScript
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";
import ProjectList from "../views/ProjectList.vue";
import MyTasks from "../views/MyTasks.vue";
import ProjectDetails from "../views/ProjectDetails.vue";
import Auth from "../views/Auth.vue";
import MainLayout from "@/layouts/MainLayout.vue";
import Settings from "../views/Settings.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/",
    redirect: "/projects",
    component: MainLayout,
    children: [
      {
        path: "/projects",
        name: "Projects",
        component: ProjectList,
        meta: { requiresAuth: true },
      },
      {
        path: "/projects/:projectId",
        name: "ProjectDetails",
        component: ProjectDetails,
        props: true,
        meta: { requiresAuth: true },
      },
      {
        path: "/settings",
        name: "Settings",
        component: Settings,
        meta: { requiresAuth: true },
      },
      {
        path: "/my-tasks",
        name: "MyTasks",
        component: MyTasks,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext,
  ) => {
    const requiresAuth = to.matched.some(
      (record: RouteRecordRaw) => record.meta!.requiresAuth,
    );
    const isAuthRoute = to.path === "/auth";
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user && isAuthRoute) {
        // If the user is already authenticated and is trying to access the /auth route
        next("/"); // Redirect them to the root or another appropriate route
      } else if (requiresAuth && !user) {
        // If the route requires authentication and the user is not authenticated
        next("/auth"); // Redirect to the Auth page
      } else {
        // In all other cases, proceed to the requested route
        next();
      }
    });
  },
);

export default router;
