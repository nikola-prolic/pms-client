<!-- src/components/Sidebar.vue -->
<template>
  <div class="sidebar bg-gray-800 text-white h-[100vh]">
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
  </div>
</template>

<style scoped>
.sidebar {
  width: 250px;
}
</style>
