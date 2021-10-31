<script setup>
import TheViewer from "@/components/TheViewer.vue";
</script>

<template>
  <div class="absolute top-0 left-0 h-full w-full bg-green-400">
    <TheViewer ifcURL="/tvbyen.ifc" :showReused="false" />
  </div>
</template>
