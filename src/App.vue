<script setup>
import { ref } from "vue";
import Home from "./views/Home.vue";
import Instructions from "./views/Instructions.vue";

const dynamicViews = [Home, Instructions];

const selectedViewIndex = ref(1);
</script>

<template><component :is="dynamicViews[selectedViewIndex]" /></template>
