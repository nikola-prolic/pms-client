<template>
  <div class="mt-8">
    <h2 class="text-xl font-semibold mb-4">Tasks</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 min-h-80 h-full ">
      <div v-for="status in statuses" :key="status" class="bg-gray-100 min-h-96 rounded-md  p-4">
        <h3 class="text-lg font-medium mb-2 capitalize text-center">{{ status.replaceAll("_", " ").toLowerCase()}}</h3>
        <TaskList :tasks="filteredTasks(status)" /> 
        <CreateTaskForm v-if="project" :status="status" :projectId="project.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Project, Task, Status } from "@/types/dbTypes";
import  CreateTaskForm  from "@/components/tasks/CreateTaskForm.vue"
import { useTaskStore } from "@/stores/taskStore"
import TaskList from "@/components/tasks/TaskList.vue"; 
const props = defineProps<{ 
  project?: Project;
  tasks: Task[];
}>();
const taskStore = useTaskStore()

const statuses = taskStore.taskStatuses

console.log("From TasksColumns | project is: ", props.project)

// const statuses = Object.values(Status);

const filteredTasks = ((status: Status) => {
  return props.tasks.filter((task: Task) => task.status === status); 
})
</script>
