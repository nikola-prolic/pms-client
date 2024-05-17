<template>
  <div class="container mx-auto p-4" v-if="!loading">
    <h1 class="text-3xl capitalize font-bold">{{ project.name }} </h1>
    <div class="mt-4 mb-8 flex  items-stretch space-x-3">
    <div class="bg-white p-4 border border-gray-700 rounded-md w-1/3">
      <p class="text-gray-600 text-sm capitalize">Status: {{ project.status }}</p>
      <div class="flex items-center mt-2">
        <span class="text-gray-500 text-xs">Owner:</span> 
        <span class="ml-2 font-medium" v-if="project.projectOwner && project.projectOwner.name">{{ project.projectOwner.name }}</span>
      </div>
      <div class="flex items-center mt-2">
        <span class="text-gray-500 text-xs">Created At:</span> 
        <span class="ml-2 font-medium">{{  new Date(project.createdAt).toLocaleDateString() }}</span>
      </div>
    </div>
    <div class="bg-white p-4 border border-gray-700 rounded-md w-1/3">
      <div class="flex items-center mt-2">
        <span class="text-gray-500 text-xs">Deadline:</span> 
        <span class="ml-2 font-medium">{{ new Date(project.deadline).toLocaleDateString() }}</span>
      </div>
      <div class="flex items-center mt-2">
        <span class="text-gray-500 text-xs">Actual/Estimated Hours:</span> 
        <span class="ml-2 font-medium">{{ project.actualHours }}/{{ project.estimatedHours }} hours</span>
      </div>
    </div>
    </div>
    <div v-if="!loading ">
      <TaskColumns  :project="project" :tasks="project.tasks" />
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useProjectStore } from "@/stores/projectStore"; 
import TaskColumns from '@/components/tasks/TaskColumns.vue';
import type { Project } from "@/types/dbTypes";
//
const route = useRoute(); 
const projectId = route.params.projectId as string;

const projectStore = useProjectStore();
onBeforeMount(async() => {
  await projectStore.getProject(projectId)
})
const { currentProject, loading }   = storeToRefs(projectStore) ;
const project = computed(() => currentProject.value ||{}) 
watch(project ,(project) => {
  console.log("from ProjectDetails | this project is", project.projectOwner)
})
</script>
