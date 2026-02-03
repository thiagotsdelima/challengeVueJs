<template>
  <input
    v-bind="$attrs"
    :type="type"
    class="border border-gray-300 rounded px-4 py-2 w-72 sm:w-full focus:outline-none focus:ring-2 focus:ring-zinc-400"
    :placeholder="placeholder"
    @change="onChange"
    @input="onInput"
  />
</template>

<script lang="ts" setup>
defineProps<{
  type: 'text' | 'file' | 'number'
  placeholder?: string
  onChange?: (e: Event) => void
  onInput?: (e: Event) => void
}>()

const emit = defineEmits(['update:modelValue'])

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>
