<template>
  <div class="container mx-auto px-4">
    <div class="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow">
      <h2 class="text-2xl font-bold text-center mb-6">Authentication</h2>
      <Creds />
      <hr class="my-6" />
      <OAuth />
    </div>
  </div>
</template>

<script setup>
import Creds from "@/components/auth/Creds.vue";
import OAuth from "@/components/auth/OAuth.vue";
</script>
