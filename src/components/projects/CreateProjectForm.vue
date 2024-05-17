<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-xl font-bold mb-4">Create New Project</h2>

    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-medium mb-2">Project Name:</label>
        <input v-model="name" type="text" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>
      <div class="mb-4">
        <label for="deadline" class="block text-gray-700 font-medium mb-2">Deadline:</label>
        <input v-model="deadline" type="date" id="deadline" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
      </div>

      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Create Project
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectStore } from "@/stores/projectStore"; 
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia"
import { useRouter } from 'vue-router';

const projectStore = useProjectStore();
const userStore = useUserStore();
const router = useRouter();

const { dbUser } = storeToRefs(userStore)
const { currentProject } = storeToRefs(projectStore)

const name = ref('');
const deadline = ref('');

const handleSubmit = async () => {
  try {
    await projectStore.createProject({
      name: name.value,
      deadline: new Date(deadline.value),
      organizationId: dbUser.value.organizationId, // Assuming user is logged in and has organization
      projectOwnerId: dbUser.value.id, 
    });
    router.push(`/projects/${currentProject.value.id}`); // Navigate to the projects list after creation
  } catch (error) {
    console.error('Error creating project:', error);
    // Handle error, e.g., display an error message
  }
};
</script>
