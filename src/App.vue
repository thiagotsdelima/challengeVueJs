<script lang="ts" setup>
import * as XLSX from 'xlsx'
import { ref, computed } from 'vue'

const products = ref<Product[]>([])
const sheetName = ref('Produtos')
const columnsOrder = ['id', 'name', 'price', 'available', 'imageUrl', 'rating']
const searchQuery = ref('')
const filters = ref({
  available: null as boolean | null
})

type Product = {
  id: string
  name: string
  price: number
  available: boolean
  imageUrl: string
  rating: number
}

function rowToProduct(r: Product): Product {
  return {
    id: String(r.id ?? ''),
    name: String(r.name ?? ''),
    price: Number(r.price ?? 0),
    available: Boolean(r.available ?? false),
    imageUrl: String(r.imageUrl ?? ''),
    rating: Number(r.rating ?? 0)
  }
}

function productToRow(p: Product): Product {
  return {
    id: p.id,
    name: p.name,
    price: p.price,
    available: p.available,
    imageUrl: p.imageUrl,
    rating: p.rating
  }
}

async function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const buf = await file.arrayBuffer()
  const wb = XLSX.read(buf, { type: 'array' })
  const name = wb.SheetNames[0]
  sheetName.value = name
  const ws = wb.Sheets[name]
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '', raw: true }) as any[]
  products.value = rows.map(rowToProduct)
}

function exportXlsx() {
  const data = products.value.map(productToRow)
  const ws = XLSX.utils.json_to_sheet(data, { skipHeader: false })
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName.value)
  XLSX.writeFile(wb, 'produtos-atualizados.xlsx')
}

const countWithImage = computed(
  () => products.value.filter((p) => p.imageUrl?.trim()).length
)
const countUnavailable = computed(
  () => products.value.filter((p) => !p.available).length
)
const countOk = computed(
  () =>
    products.value.filter(
      (p) => p.available && p.name && p.price > 0 && p.imageUrl?.trim()
    ).length
)
const avgScore = computed(() => {
  const arr = products.value.map((p) => p.rating).filter((n) => !isNaN(n))
  return arr.length
    ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2)
    : '0.00'
})

function updateProduct(idx: number, patch: Partial<Product>) {
  products.value[idx] = { ...products.value[idx], ...patch }
}

function removeProduct(idx: number) {
  products.value.splice(idx, 1)
}

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const search =
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.id.toLowerCase().includes(searchQuery.value.toLowerCase())

    const availability =
      filters.value.available === null ||
      product.available === filters.value.available

    return search && availability
  })
})
</script>

<template>
  <div class="grid gap-4 max-w-5xl mx-auto my-8 px-4">
    <div>
      <label
        for="file-upload"
        class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Escolher arquivo
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".xlsx,.csv"
        @change="onFileChange"
        class="hidden"
      />
    </div>

    <div class="flex items-center gap-4 flex-1">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por nome ou ID"
        class="border border-gray-300 rounded px-4 py-2 w-full"
      />
      <select
        v-model="filters.available"
        class="border border-gray-300 rounded px-4 py-2.5"
      >
        <option :value="true">Disponíveis</option>
        <option :value="false">Indisponíveis</option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      <div>Com imagem: {{ countWithImage }}</div>
      <div>Indisponíveis: {{ countUnavailable }}</div>
      <div>OK: {{ countOk }}</div>
      <div>Score médio: {{ avgScore }}</div>
    </div>

    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            v-for="col in columnsOrder"
            :key="col"
            class="border border-gray-300 p-2"
          >
            {{ col }}
          </th>
          <th class="border border-gray-300 p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(p, idx) in filteredProducts" :key="p.id || idx">
          <td class="border border-gray-300 p-2">
            <input v-model="p.id" />
          </td>
          <td class="border border-gray-300 p-2">
            <input v-model="p.name" />
          </td>
          <td class="border border-gray-300 p-2">
            <input v-model.number="p.price" type="number" min="0" />
          </td>
          <td class="border border-gray-300 p-2">
            <input type="checkbox" v-model="p.available" />
          </td>
          <td class="border border-gray-300 p-2">
            <input v-model="p.imageUrl" />
          </td>
          <td class="border border-gray-300 p-2">
            <input
              v-model.number="p.rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
            />
          </td>
          <td class="border border-gray-300 p-2">
            <button
              class="text-red-500 cursor-pointer hover:text-red-600"
              @click="removeProduct(idx)"
            >
              Excluir
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
      <div
        class="border border-gray-200 p-2 rounded-lg"
        v-for="(p, idx) in filteredProducts"
        :key="'g' + (p.id || idx)"
      >
        <img
          class="w-full h-[140px] object-cover rounded-md"
          :src="p.imageUrl || '/img/placeholder.png'"
          :alt="p.name"
          @error="(e) => ((e.target as HTMLImageElement).src = '/img/placeholder.png')"
        />
        <div class="name">{{ p.name }}</div>
        <div class="price">R$ {{ p.price }}</div>
        <div class="rating">⭐ {{ p.rating }}</div>
        <div class="available" :class="{ 'text-red-700': !p.available }">
          {{ p.available ? 'Disponível' : 'Indisponível' }}
        </div>
        <button
          class="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 cursor-pointer"
          @click="updateProduct(idx, { available: !p.available })"
        >
          Alternar disponibilidade
        </button>
      </div>
    </div>

    <button
      class="mt-4 cursor-pointer hover:bg-green-600 bg-green-500 text-white px-4 py-2 rounded"
      @click="exportXlsx"
    >
      Baixar planilha
    </button>
  </div>
</template>
