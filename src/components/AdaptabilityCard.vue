<script setup>
import { computed } from "vue";

const reusedElements = computed(() => {
  return 206;
});
</script>

<template>
  <div class="bg-white hover:text-blue-700 flex-1 text-center items-center flex justify-center z-50">
    <div class="p-6">
      <div>You have reused</div>
      <div class="text-5xl font-bold">10.2%</div>
      <div>of elements 😀</div>
    </div>
  </div>
</template>

<style></style>
