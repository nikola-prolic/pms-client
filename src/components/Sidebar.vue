<!-- src/components/Sidebar.vue -->
<template>
  <div class="relative sidebar bg-gray-800 text-white h-[100vh]">
    <div class="p-5">Logo</div>
    <ul class="text-center">
      <li class="py-2 border-b border-b-white mx-2">
        <router-link to="/projects">Projects</router-link>
      </li>
      <li class="py-2 border-b border-b-white mx-2">
        <router-link to="/settings">Settings</router-link>
      </li>
      <li class="py-2 mx-2">
        <router-link to="/my-tasks">My Tasks</router-link>
      </li>
    </ul>
    <button
      @click="handleSignOut"
      type="submit"
      class="absolute bottom-6 bg-black text-white capitalize px-4 py-2 w-full"
    >
      Sign Out
    </button>
  </div>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";
import auth from "@/utils/firebase";
import { useRouter } from "vue-router";

const router = useRouter();

const handleSignOut = async () => {
  try {
    await signOut(auth);
    router.push("/auth");
  } catch (error) {
    alert(error.message);
  }
};
</script>
<style scoped>
.sidebar {
  width: 250px;
}
</style>
