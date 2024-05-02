<template>
  <div>
    <button
      @click="signInWithGoogle"
      class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
    >
      Login with Google
    </button>
    <div v-if="errorMessage" class="text-red-500 text-center mt-2">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import auth from "@/utils/firebase";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();
const errorMessage = ref("");

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const resp = await signInWithPopup(auth, provider);
    const { email, displayName } = resp.user;

    if (email) {
      console.log("this thing is working ");
      // User not found, create new user
      await userStore.registerNewUser(
        email,
        displayName.split(" ")[0],
        displayName.split(" ")[1],
      );
      router.push("/");
    } else {
      signOut(auth);
      console.error("Error fetching user details:", error);
      errorMessage.value = "Something went wrong, please try again.";
    }
  } catch (error) {
    signOut(auth);
    console.error("Google Sign In Error:", error);
    errorMessage.value = error.message;
  }
};
</script>
