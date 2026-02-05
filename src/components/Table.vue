<template>
  <div class="overflow-y-auto max-h-192">
    <table class="w-full border-collapse sm:text-lg text-sm">
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
        <tr v-for="(p, idx) in filteredProducts" :key="p.ID || idx">
          <td class="border border-gray-300 sm:p-2 sm:max-w-1 p-1 max-w-6">
            <input v-model="p.ID" type="string" min="0" max="0" step="0" />
          </td>

          <td class="border border-gray-300 sm:p-2 sm:max-w-1 p-1 max-w-6">
            <input v-model="p.EAN" type="number" min="0" max="0" step="0" />
          </td>

          <td class="border border-gray-300 p-2">
            <input
              type="string"
              v-model="p.Name"
              class="sm:w-full rounded sm:p-1 w-16 p-0"
            />
          </td>

          <td class="border border-gray-300 p-1 w-6 text-center">
            <input type="string" v-model="p.Status" />
          </td>

          <td class="border border-gray-300 sm:p-2 sm:max-w-2 p-1 max-w-14">
            <input
              v-model.number="p.Score"
              type="number"
              min="0"
              max="100"
              step="0.01"
            />
          </td>

          <td class="border border-gray-300 p-2">
            <input
              type="string"
              v-model="p.Mirakl_Image"
              class="w-full rounded p-1"
            />
          </td>

          <td class="border border-gray-300 p-2">
            <input
              type="string"
              v-model="p.BB_Image_Url"
              class="w-full rounded p-1"
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
  </div>
</template>

<script lang="ts" setup>
const columnsOrder = ['id', 'name', 'price', 'status', 'imageUrl', 'rating']
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
  removeProduct: (idx: number) => void
}>()
</script>
