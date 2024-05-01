<template>
  <div>
    <button
      @click="signInWithGoogle"
      class="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
    >
      Login with Google
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import auth from "@/utils/firebase";

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    // Redirect or handle the login success
  } catch (error) {
    alert(error.message); // Consider a better error handling approach
  }
};

const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    // Redirect or handle the login success
  } catch (error) {
    alert(error.message); // Consider a better error handling approach
  }
};
</script>
