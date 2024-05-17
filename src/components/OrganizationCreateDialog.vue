<template>
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">

    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 class="text-xl text-center mb-6" >You have No Organization</h1>
      <div v-if="invite" class="mb-6 flex justify-between items-baseline"> 
        <h2 class="text-lg font-semibold mb-4">You have been invited to {{invite.organization.name}}</h2>
        <button type="button" @click="acceptInvite" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          accept
        </button>
      </div>
      <h2 class="text-lg font-semibold mb-4">Create New Organization</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Organization Name</label>
          <input type="text" id="name" v-model="orgName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
        </div>
        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Create Organization
        </button>
        <button type="button" @click="close" class="ml-2 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Cancel
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import axios from "axios"
import { useUserStore } from "@/stores/userStore";
import { useOrgStore } from "@/stores/organizationStore"
import { useInviteStore } from "@/stores/inviteStore"

const props = defineProps({
  close: Function
});
const orgName = ref('');


const userStore = useUserStore()
const orgStore = useOrgStore()
const inviteStore = useInviteStore()


const { dbUser } = storeToRefs(userStore)
const { org, createOrg } = storeToRefs(orgStore)



const invite = computed(() => dbUser.value?.invite) 

const acceptInvite = async () => {
  try{
    if(!invite.value.id){
      console.log("no id")
      return
    }
    await inviteStore.acceptInvite(invite.value.id)
    props.close();
  }catch(err){
    console.log("error happened while accepting invite", err)
  }
}

const submitForm = async () => {
  try {
    const response = await axios.post(import.meta.env.VITE_BACKEND_ENDPOINT+ '/organization', {
      name: orgName.value, 
      adminId: dbUser.value.id
    }, { 
      headers: {
        'Content-Type': 'application/json'
      }
    });

    props.close();
  } catch (error) {
    console.error('Error creating organization:', error);
  }
};
</script>

