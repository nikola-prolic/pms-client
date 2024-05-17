<template>
  <ul v-if="tasks && tasks.length > 0">
    <TaskCard v-for="task in tasks" :key="task.id" :task="task" /> 
  </ul>
</template>

<script setup lang="ts">
import type { Task } from "@/types/dbTypes";
import TaskCard from "@/components/tasks/TaskCard.vue";

defineProps<{
  tasks: Task[];
}>();
</script>
