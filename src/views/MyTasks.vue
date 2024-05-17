<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">My Tasks</h1>
    <TaskColumns v-if="tasks" :tasks="tasks" />
    <h2 v-else class="text-2xl font-semibold"> you have no tasks. you can create tasks for projects you own form the projects tab. Tasks assigned to you will show here</h2>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore"; 
import { computed, watch } from "vue"
import { storeToRefs } from 'pinia';
import TaskColumns from "@/components/tasks/TaskColumns.vue";

const userStore = useUserStore();
const { dbUser } = storeToRefs(userStore)

const tasks = computed(() => dbUser.value?.tasks || undefined)
</script>
