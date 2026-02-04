<template>
  <button
    :class="[
      'px-4 py-2 rounded text-xs sm:text-lg font-thin hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex flex-1 w-full items-center justify-center gap-2 cursor-pointer',
      colorClass,
      {
        'inline-block': defaultButton === 'inline',
        block: defaultButton === 'normal'
      }
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
  defaultButton?: 'inline' | 'normal'
  disabled?: boolean
  onClick?: () => void
}>()

const colorClass = computed(() => {
  switch (props.color) {
    case 'red':
      return props.disabled
        ? 'bg-red-400 text-white'
        : 'bg-red-600 text-white hover:bg-red-700'
    case 'green':
      return props.disabled
        ? 'bg-green-400 text-white'
        : 'bg-green-600 text-white hover:bg-green-700'
    case 'gray':
      return props.disabled
        ? 'bg-gray-400 text-white'
        : 'bg-gray-600 text-white hover:bg-gray-700'
    default:
      return props.disabled
        ? 'bg-blue-400 text-white'
        : 'bg-blue-600 text-white hover:bg-blue-700'
  }
})
</script>

<style scoped>
.icon {
  display: flex;
  align-items: center;
}
</style>
