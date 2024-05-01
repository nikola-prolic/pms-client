<!-- src/layouts/MainLayout.vue -->
<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <router-view />
      <!-- Where nested routes will be rendered -->
    </div>
  </div>
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>
