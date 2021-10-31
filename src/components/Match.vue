<script setup>
import TheViewer from "@/components/TheViewer.vue";
</script>

<template>
  <div class="absolute top-0 left-0 h-full w-1/2 bg-blue-500">
    <TheViewer ifcURL="/bloxhub2.ifc" :showReused="true" />
  </div>
  <div class="absolute top-0 left-1/2 h-full w-1/2 bg-green-400">
    <div class="relative w-full h-full">
      <TheViewer class="absolute h-full" ifcURL="/tvbyen.ifc" :showReused="true" />
    </div>
  </div>
</template>
