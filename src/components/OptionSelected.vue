<template>
  <div>
    <select
      v-model="filters.available"
      class="border border-gray-300 rounded px-4 py-2.5 max-w-32 focus:ring-zinc-400 focus:outline-none focus:ring-2"
    >
      <option :value="true">Available</option>
      <option :value="false">Unavailable</option>
    </select>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  filters: {
    available: boolean | null
  }
}>()
</script>
