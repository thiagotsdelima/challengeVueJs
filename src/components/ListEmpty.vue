<template>
  <div class="flex flex-col items-center justify-center py-10 text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-16 w-16 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9h6m-6 4h6"
      />
    </svg>
    <p class="text-lg">No items found.</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{}>()
</script>
