<template>
  <div class="font-thin text-md sm:text-lg">
    With image: {{ countWithImage }}
  </div>
  <div class="font-thin text-md sm:text-lg">
    Unavailable: {{ countUnavailable }}
  </div>
  <div class="font-thin text-md sm:text-lg">OK: {{ countOk }}</div>
  <div class="font-thin text-md sm:text-lg">Score avarenge: {{ avgScore }}</div>
</template>

<script lang="ts" setup>
defineProps<{
  countWithImage: number
  countUnavailable: number
  countOk: number
  avgScore: string
}>()
</script>
