<template>
  <li class="border-b py-2 bg-white rounded-lg shadow-md p-4 mb-2">
    <p class="font-medium mb-2">{{ task.name }}</p>
    <div class="">
      <div class="w-full">
        <label for="status" class="block text-gray-700 font-medium text-sm mb-1">Status:</label>
        <select v-model="updatedTask.status" id="status" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option :value="status" :key="status" v-for="status in statuses">{{ status }}</option>
        </select>
      </div>
      <div class="w-full">
        <label for="actualHours" class="block text-gray-700 font-medium text-sm mb-1">Actual Hours:</label>
        <input v-model.number="updatedTask.actualHours" type="number" id="actualHours" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="w-full">
        <label for="deadline" class="block text-gray-700 font-medium text-sm mb-1">Deadline:</label>
        <input v-model="updatedTask.deadline" type="date" id="deadline" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
    </div>
    <button @click="updateTask" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline">
      Update Task
    </button>
  </li>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useTaskStore } from "@/stores/taskStore";
import type { Task, Status } from "@/types/dbTypes";

const taskStore = useTaskStore();

const statuses = taskStore.taskStatuses

const props = defineProps<{
  task: Task;
}>();

const updatedTask = reactive({ ...props.task }); 

const updateTask = async () => {
  try {
    // Add validation if needed before updating
    await taskStore.updateTask({ 
      id: updatedTask.id,
      status: updatedTask.status,
      actualHours: updatedTask.actualHours,
      deadline: new Date(updatedTask.deadline), // Convert to Date object
    });
  } catch (error) {
    console.error('Error updating task:', error);
    // Handle errors (e.g., display an error message)
  }
};
</script>
