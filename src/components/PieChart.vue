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
  <div class="bg-white hover:text-blue-700 flex-1 text-center flex items-center justify-center z-50">
    <div class="p-6">
      <div>You are saving</div>
      <div class="text-4xl font-bold">16.9 tons</div>
      <div>of CO2 🏭</div>
    </div>
  </div>
</template>

<style></style>
