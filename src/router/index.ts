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
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (requiresAuth && !user) {
        next("/auth"); // Redirect to the Auth page if not authenticated
      } else {
        next(); // Proceed to the requested route
      }
    });
  },
);

export default router;
