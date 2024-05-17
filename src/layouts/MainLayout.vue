<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <router-view />
    </div>
    <OrganizationCreateDialog
      v-if="showCreateDialog" 
      :close="closeDialog" 
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Sidebar from "@/components/Sidebar.vue";
import OrganizationCreateDialog from "@/components/OrganizationCreateDialog.vue";

const auth = getAuth();
const userStore = useUserStore();
const router = useRouter();
const showCreateDialog = ref(false)

const { dbUser } = storeToRefs(userStore)


onMounted(async () => {
  console.log("we mounted")
  try{
  onAuthStateChanged(auth, async (authUser) => {
    if (authUser && authUser.email) {
      console.log("we are fetching the user")
      await userStore.fetchUserDetailsByEmail(authUser.email);
      console.log("we have fetched the user")
      console.log("db user organization", dbUser.value.organization)

    } else {
      router.push("/auth"); 
    }
   if(!dbUser || !dbUser.value.organizationId) {
      showCreateDialog.value = true; 
    }
  });
  }catch(err){
    console.log("we have a problem",err)
  }
});

const closeDialog = () => {
  showCreateDialog.value = false  
};
</script>
