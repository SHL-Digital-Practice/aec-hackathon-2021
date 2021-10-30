<script setup>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

const chart = "This will be a chart";
const pieChart = {
  type: "doughnut",
  data: {
    labels: ["Walls", "Columns", "Windows", "Doors"],
    datasets: [
      {
        backgroundColor: ["#FDE68A", "#FECACA", "#BFDBFE", "#A7F3D0"],
        data: [40, 20, 80, 10],
      },
    ],
  },
};
</script>

<template>
  <div class="flex bg-gray-100 flex-1 items-center justify-center z-50">
    <div class="p-6">
      <vue3-chart-js v-bind="{ ...pieChart }" />
    </div>
  </div>
</template>

<style></style>
