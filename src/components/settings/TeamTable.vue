<template>
  <div class="container mx-auto p-4">
    <button 
      @click="showInviteDialog = true" 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
    >
      Invite User
    </button>

    <InviteUser v-if="showInviteDialog" @close="showInviteDialog = false" />

    <table class="table-auto w-full">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in orgUsers" :key="user.id">
          <td class="border px-4 py-2">{{ user.name }}</td>
          <td class="border px-4 py-2">{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import InviteUser from '@/components/settings/InviteUser.vue';

const userStore = useUserStore();
const { dbUser } = storeToRefs(userStore);

const orgUsers = computed(() => dbUser.value?.organization.users || []);
console.log("from team table | users are ", orgUsers)

const showInviteDialog = ref(false);
</script>
