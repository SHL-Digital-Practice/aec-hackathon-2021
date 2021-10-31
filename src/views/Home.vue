<script setup>
import { ref, shallowRef } from "vue";
import ButtonRepo from "@/components/ButtonRepo.vue";
import AdaptabilityCard from "../components/AdaptabilityCard.vue";
import PieChart from "../components/PieChart.vue";
import ProfitCard from "../components/ProfitCard.vue";
import TheViewer from "@/components/TheViewer.vue";
import Design from "@/components/Design.vue";
import Source from "@/components/Source.vue";
import Match from "@/components/Match.vue";

const viewerMap = {
  design: Design,
  source: Source,
  match: Match,
};

const currentView = shallowRef(Design);

const setView = (viewname) => {
  currentView.value = viewerMap[viewname];
};
</script>

<template>
  <div>
    <!-- <div class="max-w-screen-xl px-4 py-12 mx-auto sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between"> -->
    <div class="flex bg-indigo-700 h-screen justify-center">
      <div class="absolute top-40 flex space-x-20 z-40">
        <button class="p-3 hover:bg-white hover:text-black text-white" @click="setView('design')">
          <p class="text-2xl font-semibold">Design</p>
        </button>
        <button class="p-3 hover:bg-white hover:text-black text-white" @click="setView('source')">
          <p class="text-2xl font-semibold">Reuse</p>
        </button>

        <button class="p-3 hover:bg-white hover:text-black text-white" @click="setView('match')">
          <p class="text-2xl font-semibold">Match</p>
        </button>
      </div>
      <div class="absolute bottom-20 w-full left-0 flex space-x-8 z-40 px-40">
        <AdaptabilityCard />
        <PieChart />
        <ProfitCard />
      </div>
      <keep-alive>
        <component class="h-screen" :is="currentView" />
      </keep-alive>
    </div>
  </div>
</template>
