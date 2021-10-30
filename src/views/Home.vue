<script setup>
import ButtonRepo from "@/components/ButtonRepo.vue";
import AdaptabilityCard from "../components/AdaptabilityCard.vue";
import PieChart from "../components/PieChart.vue";
import ProfitCard from "../components/ProfitCard.vue";
</script>

<template>
  <div>
    <!-- <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"> -->
    <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:items-center lg:justify-between space-y-8">
      <!-- <h2 class="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        Ready to dive in?
        <br />
        <span class="text-indigo-600">Vite + Vue 3 + Tailwind CSS</span>
      </h2>
      <div class="flex mt-8 lg:flex-shrink-0 lg:mt-0">
        <div class="inline-flex rounded-md shadow">
          <router-link to="/about" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none">Next Page</router-link>
        </div>
        <ButtonRepo />
      </div> -->
      <div class="bg-green-200">Viewer</div>
      <div class="flex space-x-8">
        <AdaptabilityCard />
        <PieChart />
        <ProfitCard />
      </div>
    </div>
  </div>
</template>
