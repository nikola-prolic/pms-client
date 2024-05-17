<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Projects</h1>

    <div v-if="projects && projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProjectCard 
        v-for="project in projects" 
        :key="project.id" 
        :project="project"
      /> 
    </div>
    <div v-else>
      <CreateProjectForm /> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore"; 
import {  computed } from 'vue';
import { storeToRefs } from "pinia"
import ProjectCard from "@/components/projects/ProjectCard.vue"; 
import CreateProjectForm from "@/components/projects/CreateProjectForm.vue"

const userStore = useUserStore();
const { dbUser } = storeToRefs(userStore);

const projects = computed(() => dbUser.value?.projects || []);

</script>
