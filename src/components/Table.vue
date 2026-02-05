<template>
  <div class="overflow-y-auto max-h-192">
    <table class="w-full border-collapse sm:text-lg text-sm">
      <thead>
        <tr>
          <th
            v-for="col in columnsOrder"
            :key="col"
            class="border border-gray-300 p-2 text-[10px] sm:text-lg hidden sm:table-cell"
          >
            {{ col }}
          </th>
          <th
            class="border border-gray-300 p-2 text-xs sm:text-md hidden sm:table-cell"
          >
            Ações
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, idx) in filteredProducts" :key="p.ID || idx">
          <td class="border border-gray-300 text-xs sm:text-md sm:p-2 p-1 w-6">
            <input v-model="p.ID" type="string" class="w-6 sm:w-12" />
          </td>

          <td
            class="border border-gray-300 text-xs sm:text-md p-1 sm:p-2 sm:w-20 w-8"
          >
            <input
              v-model="p.EAN"
              type="number"
              min="0"
              max="0"
              step="0"
              class="w-9 sm:w-28"
            />
          </td>

          <td class="border border-gray-300 p-1 sm:p-2 text-xs sm:text-md w-18">
            <input type="string" v-model="p.Name" class="w-16 sm:w-68" />
          </td>

          <td class="border border-gray-300 p-1 sm:p-2 text-xs sm:text-md w-9">
            <input type="string" v-model="p.Status" class="w-6 sm:w-16" />
          </td>

          <td
            class="border border-gray-300 text-xs sm:text-md p-1 sm:p-2 sm:max-w-20 max-w-4"
          >
            <input
              v-model.number="p.Score"
              type="number"
              min="0"
              max="0"
              step="0"
              class="w-8 sm:max-w-16"
            />
          </td>

          <td
            class="border border-gray-300 text-xs sm:text-md p-1 sm:p-2 sm:w-20 w-14"
          >
            <input
              type="string"
              v-model="p.Mirakl_Image"
              class="sm:w-32 w-12"
            />
          </td>

          <td
            class="border border-gray-300 text-xs sm:text-md p-1 sm:p-2 sm:w-20 w-14"
          >
            <input
              type="string"
              v-model="p.BB_Image_Url"
              class="sm:w-32 w-12"
            />
          </td>

          <td class="border border-gray-300 p-1 sm:p-2 text-center max-w-4">
            <button
              class="text-red-500 cursor-pointer hover:text-red-600 text-xs sm:text-md"
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
const columnsOrder = [
  'ID',
  'EAN',
  'Name',
  'Status',
  'Score',
  'Mirakl_Image',
  'BB_Image_Url'
]
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
