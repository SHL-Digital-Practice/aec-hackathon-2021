<script setup>
import { computed } from "vue";

const reusedElements = computed(() => {
  return 369;
});
</script>

<template>
  <div class="bg-purple-200 flex-1 text-center items-center">
    <div class="p-6">
      <div>You have reused</div>
      <div class="text-5xl font-bold">{{ reusedElements }}</div>
      <div>elements 🤯</div>
    </div>
  </div>
</template>

<style></style>
