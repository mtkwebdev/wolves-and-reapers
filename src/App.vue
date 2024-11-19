<script setup>
import { ref } from "vue";
import Home from "./views/Home.vue";

const dynamicViews = [Home];

const selectedViewIndex = ref(0);
</script>

<template><component :is="dynamicViews[selectedViewIndex]" /></template>
