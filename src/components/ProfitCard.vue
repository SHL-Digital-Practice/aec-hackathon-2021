<script setup>
import { computed } from "vue";

const savings = computed(() => {
  return "379.800 kr.";
});
</script>

<template>
  <div class="bg-white hover:text-blue-700 flex-1 text-center flex items-center justify-center z-50">
    <div class="p-6">
      <div>You are saving</div>
      <div class="text-4xl font-bold">{{ savings }}</div>
      <div>in readapted materials 💚</div>
    </div>
  </div>
</template>

<style></style>
