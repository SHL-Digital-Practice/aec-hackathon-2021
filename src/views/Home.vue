<script setup>
import ButtonRepo from "@/components/ButtonRepo.vue";
import AdaptabilityCard from "../components/AdaptabilityCard.vue";
import PieChart from "../components/PieChart.vue";
import ProfitCard from "../components/ProfitCard.vue";
import TheViewer from "@/components/TheViewer.vue";
</script>

<template>
  <div>
    <!-- <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"> -->
    <div class="z-50 max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between space-y-8">
      <div class="absolute w-full bot-0 left-0 flex space-x-8 z-50 h-40 mt-96">
        <AdaptabilityCard />
        <PieChart />
        <ProfitCard />
      </div>
      <TheViewer />
    </div>
  </div>
</template>
