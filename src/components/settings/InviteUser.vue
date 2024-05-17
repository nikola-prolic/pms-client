<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-lg font-semibold mb-4">Invite User</h2>
      <form @submit.prevent="submitInvite">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="inviteEmail" 
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            required
          >
        </div>
        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Send Invite
        </button>
        <button type="button" @click="closeDialog" class="ml-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useInviteStore } from '@/stores/inviteStore';
import { useOrgStore } from '@/stores/organizationStore';

const emit = defineEmits(['close']);
const inviteStore = useInviteStore();
const orgStore = useOrgStore();
const { org } = storeToRefs(orgStore);
const inviteEmail = ref('');

const submitInvite = async () => {
  console.log("from invite user org value is ",org.value)
  try {
    await inviteStore.createInvite({ 
      userEmail: inviteEmail.value, 
      organizationId: org.value?.id || '' 
    });
    closeDialog();
  } catch (error) {
    console.error('Error sending invite:', error);
  }
};

const closeDialog = () => {
  emit('close');
};
</script>
