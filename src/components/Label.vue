<template>
  <label
    :for="$attrs.for as string | undefined"
    class="text-gray-800 rounded text-xs sm:text-lg font-thin"
  >
    {{ label }}
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
}>()
</script>
