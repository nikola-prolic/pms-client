<template>
  <router-link :to="`/projects/${project.id}`" class="block bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
    <h2 class="text-xl font-semibold truncate">{{ project.name }}</h2>
    <p class="text-gray-600 text-sm">{{ project.status }}</p>
    <div class="flex items-center mt-2">
      <span class="text-gray-500 text-xs">Deadline:</span> 
      <span class="ml-2 font-medium">{{ new Date(project.deadline).toLocaleDateString() }}</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { useProjectStore } from "@/stores/projectStore"; 
import type { Project } from "@/types/dbTypes"; 
defineProps<{ 
  project: Project;
}>();

</script>
