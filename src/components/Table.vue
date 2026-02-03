<template>
  <table class="w-full border-collapse sm:text-lg text-sm mb-4">
    <thead>
      <tr>
        <th
          v-for="col in columnsOrder"
          :key="col"
          class="border border-gray-300 p-2 hidden sm:table-cell"
        >
          {{ col }}
        </th>
        <th class="border border-gray-300 p-2 hidden sm:table-cell">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(p, idx) in filteredProducts" :key="p.id || idx">
        <td class="border border-gray-300 sm:p-2 sm:max-w-1 p-1 max-w-6">
          <input v-model="p.id" type="number" min="0" max="0" step="0" />
        </td>
        <td class="border border-gray-300 p-2">
          <input v-model="p.name" class="sm:w-full rounded sm:p-1 w-16 p-0" />
        </td>
        <td class="border border-gray-300 sm:p-2 sm:max-w-2 p-1 max-w-14">
          <input
            v-model.number="p.price"
            type="number"
            min="0"
            max="100"
            step="0.1"
          />
        </td>
        <td class="border border-gray-300 p-1 w-6 text-center">
          <input type="checkbox" v-model="p.available" />
        </td>
        <td class="border border-gray-300 p-2">
          <input v-model="p.imageUrl" class="w-full rounded p-1" />
        </td>
        <td class="border border-gray-300 sm:px-6 sm:max-w-1 p-1 max-w-8">
          <input
            v-model.number="p.rating"
            type="number"
            min="0"
            max="10"
            step="0"
          />
        </td>
        <td class="border border-gray-300 p-2 text-center">
          <button
            class="text-red-500 cursor-pointer hover:text-red-600 text-xs sm:text-lg"
            @click="removeProduct(idx)"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
const columnsOrder = ['id', 'name', 'price', 'available', 'imageUrl', 'rating']
defineProps<{
  filteredProducts: Array<{
    id?: number | string
    name?: string
    price?: number
    imageUrl?: string
    rating?: number
    available?: boolean
  }>
  removeProduct: (idx: number) => void
}>()
</script>
