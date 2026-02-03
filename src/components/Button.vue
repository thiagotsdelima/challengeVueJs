<template>
  <button
    :class="[
      'px-4 py-2 rounded hover:opacity-90 disabled:opacity-50 flex flex-1 w-full items-center justify-center gap-2 cursor-pointer',
      colorClass,
      { 'inline-block': type === 'inline', block: type === 'normal' }
    ]"
    :disabled="disabled"
    @click="onClick"
  >
    <span v-if="icon" class="icon">
      <component :is="icon" />
    </span>
    <span>{{ label }}</span>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps<{
  label: string
  icon?: string | object
  color?: 'blue' | 'red' | 'green' | 'gray'
  type?: 'inline' | 'normal'
  disabled?: boolean
  onClick?: () => void
}>()

const colorClass = computed(() => {
  switch (props.color) {
    case 'red':
      return 'bg-red-600 text-white hover:bg-red-700'
    case 'green':
      return 'bg-green-600 text-white hover:bg-green-700'
    case 'gray':
      return 'bg-gray-600 text-white hover:bg-gray-700'
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700'
  }
})
</script>

<style scoped>
.icon {
  display: flex;
  align-items: center;
}
</style>
