<template>
  <div
    class="border border-gray-200 p-2 rounded-lg"
    v-for="(p, idx) in filteredProducts"
    :key="'g' + (p.id || idx)"
  >
    <img
      class="w-full h-35 object-cover rounded-md"
      :src="p.imageUrl"
      :alt="p.name"
    />
    <div class="name">{{ p.name }}</div>
    <div class="price">R$ {{ p.price }}</div>
    <div class="rating">⭐ {{ p.rating || 0 }}</div>
    <div class="available" :class="{ 'text-red-700': !p.available }">
      {{ p.available ? 'Available' : 'Unavailable' }}
    </div>
    <div class="flex justify-center mt-2 flex-1">
      <Button
        color="blue"
        label="Alter Availability"
        type="normal"
        @click="updateProduct(idx, { available: !p.available })"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from '@/components/Button.vue'
defineProps<{
  filteredProducts: Array<{
    id?: number | string
    name?: string
    price?: number
    imageUrl?: string
    rating?: number
    available?: boolean
  }>
  updateProduct: (idx: number, patch: Partial<{ available?: boolean }>) => void
}>()
</script>
