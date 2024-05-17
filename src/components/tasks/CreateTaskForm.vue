<template>
  <div v-if="showForm">
    <form @submit.prevent="handleSubmit" class="mt-4">
      <div class="mb-2">
        <label for="taskName" class="block text-gray-700 font-medium text-sm mb-1">Task Name:</label>
        <input v-model="taskName" type="text" id="taskName" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <div class="mb-2">
        <label for="assignee" class="block text-gray-700 font-medium text-sm mb-1">Assignee:</label>
        <select v-model="assignee" id="assignee" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Select Assignee</option>
          <option :value="user.id" :key="user.id" v-for="user in users">{{ user.name }}</option>
        </select>
      </div>
      <div class="mb-4">
        <label for="deadline" class="block text-gray-700 font-medium mb-2">Deadline:</label>
        <input v-model="deadline" type="date" id="deadline" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <div class="mb-2">
        <label for="estimatedHours" class="block text-gray-700 font-medium text-sm mb-1">Estimated Hours:</label>
        <input v-model.number="estimatedHours" type="number" id="estimatedHours" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Task
      </button>
      <button @click="showForm = false" type="button" class="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Cancel
      </button>
    </form>
  </div>
  <button v-else @click="showForm = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    Add Task
  </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTaskStore } from "@/stores/taskStore";
import { storeToRefs } from "pinia"
import { useUserStore } from '@/stores/userStore';
import type { Status } from "@/types/dbTypes";

const userStore = useUserStore();

const { dbUser } = storeToRefs(userStore)
const users = computed(() => dbUser.value.organization.users)

const taskStore = useTaskStore();
const taskName = ref('');
const assignee = ref('');
const deadline = ref('')
const estimatedHours = ref(0);
const showForm = ref(false);

const props = defineProps<{
  status: Status;
  projectId: string;
}>();

const handleSubmit = async () => {
  try {
    await taskStore.createTask({
      name: taskName.value,
      projectId: props.projectId,
      status: props.status,
      assignedUserId: assignee.value,
      estimatedHours: estimatedHours.value,
      deadline: new Date(), // Set a default deadline or add deadline input
    });

    // Clear form inputs
    taskName.value = '';
    assignee.value = '';
    estimatedHours.value = 0;

    // Hide the form
    showForm.value = false;
  } catch (error) {
    console.error('Error creating task:', error);
    // Handle error appropriately
  }
};
</script>
