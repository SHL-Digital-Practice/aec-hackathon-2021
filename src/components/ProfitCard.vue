<script setup>
import { computed } from "vue";

const savings = computed(() => {
  return "369.000 kr.";
});
</script>

<template>
  <div class="bg-indigo-200 flex-1 text-center">
    <div class="p-6">
      <div>You are saving</div>
      <div class="text-4xl font-bold">{{ savings }}</div>
      <div>in readapted materials 💚</div>
    </div>
  </div>
</template>

<style></style>
