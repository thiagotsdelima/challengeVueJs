<template>
  <label
    :for="$attrs.for as string | undefined"
    class="px-2 py-1 text-gray-800 rounded text-xs sm:text-lg font-medium"
  >
    {{ label }}
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  label: string
}>()
</script>
