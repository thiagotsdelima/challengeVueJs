<template>
  <div
    class="border border-gray-200 p-2 rounded-lg"
    v-for="(p, idx) in filteredProducts"
    :key="'g' + (p.ID || idx)"
  >
    <router-link
      :to="`/edit/${p.ID}`"
      class="block hover:shadow-lg transition-shadow duration-300"
    >
      <img
        class="w-full h-35 object-cover rounded-md"
        :src="p.BB_Image_Url"
        :alt="p.Name"
      />
      <div class="name">{{ p.Name }}</div>
      <div class="score">⭐ {{ p.Score || 0 }}</div>
      <div class="Status" :class="{ 'text-red-700': !p.Status }">
        {{ p.Status ? 'Status' : 'Unstatus' }}
      </div>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  filteredProducts: Array<{
    ID?: string
    EAN: number
    Name?: string
    Status?: string
    Score: number
    Mirakl_Image?: string
    BB_Image_Url?: string
  }>
}>()
</script>
