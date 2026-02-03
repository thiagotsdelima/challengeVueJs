<template>
  <div class="grid max-w-5xl mx-auto my-8 px-4">
    <div class="mb-4">
      <Label
        label="Choose file"
        for="file-upload"
        class="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      />
      <Input
        id="file-upload"
        type="file"
        accept=".xlsx,.csv"
        @change="onFileChange"
        class="hidden"
      />
    </div>

    <Label label="Search Products:" />
    <div class="flex gap-4 flex-1 mb-4">
      <Input
        v-model="searchQuery"
        type="text"
        placeholder="Search by name or ID"
      />
      <OptionSelected :filters="filters" />
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 justify-center items-center sm:mx-auto mb-4"
    >
      <Metrics
        :countWithImage="countWithImage"
        :countUnavailable="countUnavailable"
        :countOk="countOk"
        :avgScore="avgScore"
      />
    </div>

    <Label label="List:" />
    <Table
      :removeProduct="removeProduct"
      :filteredProducts="filteredProducts"
    />

    <Label label="Gallery:" />
    <div class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
      <Galery
        :filteredProducts="filteredProducts"
        :updateProduct="updateProduct"
      />
    </div>

    <div class="mt-4">
      <Button
        label="Download Spreadsheet"
        color="green"
        type="normal"
        @click="exportXlsx"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as XLSX from 'xlsx'
import { ref, computed } from 'vue'
import Button from '@/components/Button.vue'
import Label from '@/components/Label.vue'
import Input from '@/components/Input.vue'
import OptionSelected from '@/components/OptionSelected.vue'
import Metrics from '@/components/Metrics.vue'
import Table from '@/components/Table.vue'
import Galery from '@/components/Gallery.vue'

const products = ref<Product[]>([])
const sheetName = ref('Produtos')
const searchQuery = ref('')
const filters = ref({
  available: null
})

type Product = {
  id: string
  name: string
  price: number
  available: boolean
  imageUrl: string
  rating: number
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

function rowToProduct(r: Product): Product {
  return {
    id: String(r.id ?? ''),
    name: String(r.name ?? ''),
    price: isNaN(Number(r.price)) ? 0 : Number(r.price),
    available: Boolean(r.available ?? false),
    imageUrl: String(r.imageUrl ?? ''),
    rating: isNaN(Number(r.rating)) ? 0 : Number(r.rating)
  }
}

function productToRow(p: Product): Product {
  return {
    id: p.id,
    name: p.name,
    price: isNaN(Number(p.price)) ? 0 : Number(p.price),
    available: p.available,
    imageUrl: p.imageUrl,
    rating: isNaN(Number(p.rating)) ? 0 : Number(p.rating)
  }
}

function exportXlsx() {
  const data = products.value.map(productToRow)
  const ws = XLSX.utils.json_to_sheet(data, { skipHeader: false })
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, sheetName.value)
  XLSX.writeFile(wb, 'updated-products.xlsx')
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

function updateProduct(idx: number, patch: Partial<Product>) {
  products.value[idx] = { ...products.value[idx], ...patch }
}

function removeProduct(idx: number) {
  products.value.splice(idx, 1)
}

const props = defineProps<{}>()
</script>
