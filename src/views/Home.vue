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
    <div class="z-40 max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between space-y-8">
      <div class="absolute bottom-20 w-full left-0 flex space-x-8 z-40 px-40">
        <AdaptabilityCard />
        <PieChart />
        <ProfitCard />
      </div>
      <TheViewer />
    </div>
  </div>
</template>
