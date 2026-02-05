<template>
  <div class="grid max-w-5xl mx-auto my-8 px-4">
    <div class="mb-4">
      <Label
        label="Choose file"
        for="file-upload"
        class="cursor-pointer bg-blue-600 text-white px-9 py-2 rounded hover:bg-blue-700"
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
        :countUnstatus="countUnstatus"
        :countOk="countOk"
        :avgScore="avgScore"
      />
    </div>

    <div class="flex justify-end items-end">
      <Button
        label="Add New Product"
        color="blue"
        type="normal"
        class="max-w-48"
        @click="() => router.push('/create')"
      />
    </div>

    <TabsRoot default-value="tab1">
      <TabsList class="relative shrink-0 flex">
        <TabsIndicator
          class="absolute left-0 h-1 bottom-0 bg-blue-600 rounded-full transition-[width,transform] duration-300"
          style="
            width: var(--radix-tabs-indicator-size);
            transform: translateX(var(--radix-tabs-indicator-position));
          "
        />

        <TabsTrigger
          value="tab1"
          class="flex-1 text-center px-4 py-2 sm:px-6 sm:py-3"
        >
          <Label label="List" />
        </TabsTrigger>
        <TabsTrigger
          value="tab2"
          class="flex-1 text-center px-4 py-2 sm:px-6 sm:py-3"
        >
          <Label label="Gallery" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div v-if="filteredProducts.length > 0" class="mb-4 mt-4">
          <Table
            :removeProduct="removeProduct"
            :filteredProducts="filteredProducts"
          />
        </div>
        <div v-else>
          <ListEmpty />
        </div>
      </TabsContent>
      <TabsContent
        class="grow p-5 bg-white rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
        value="tab2"
      >
        <div
          class="grid grid-cols-[repeat(auto-fill,minmax(185px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3"
        >
          <Galery :filteredProducts="filteredProducts" />
        </div>
      </TabsContent>
    </TabsRoot>

    <div class="mt-4">
      <Button
        :disabled="filteredProducts.length === 0"
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
import { Product, products } from '@/utils/store'
import Label from '@/components/Label.vue'
import Input from '@/components/Input.vue'
import Metrics from '@/components/Metrics.vue'
import Table from '@/components/Table.vue'
import Galery from '@/components/Gallery.vue'
import ListEmpty from '@/components/ListEmpty.vue'
import {
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger
} from 'radix-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const sheetName = ref('Produtos')
const searchQuery = ref('')
const filters = ref({
  status: null
})

const countWithImage = computed(
  () => products.value.filter((p) => p.BB_Image_Url?.trim()).length
)
const countUnstatus = computed(
  () =>
    products.value.filter(
      (p) => p.Status === 'INDISPONIVEL' || p.Status === 'ERRO'
    ).length
)
const countOk = computed(
  () =>
    products.value.filter(
      (p) => p.Status === 'OK' && p.Name && p.EAN > 0 && p.BB_Image_Url?.trim()
    ).length
)
const avgScore = computed(() => {
  const result = products.value.map((p) => p.Score)
  return result.length
    ? (result.reduce((a, b) => a + b, 0) / result.length).toFixed(2)
    : '0.0'
})

function rowToProduct(r: Product): Product {
  return {
    ID: String(r.ID ?? ''),
    EAN: isNaN(Number(r.EAN)) ? 0 : Number(r.EAN),
    Name: String(r.Name ?? ''),
    Status: String(r.Status ?? false),
    Score: isNaN(Number(r.Score)) ? 0 : Number(r.Score),
    Mirakl_Image: String(r.Mirakl_Image ?? ''),
    BB_Image_Url: String(r.BB_Image_Url ?? '')
  }
}

function productToRow(p: Product): Product {
  return {
    ID: p.ID,
    EAN: p.EAN,
    Name: p.Name,
    Status: p.Status,
    Score: p.Score,
    Mirakl_Image: p.Mirakl_Image,
    BB_Image_Url: p.BB_Image_Url
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
  const ws = wb.Sheets[wb.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json(ws, { defval: '', raw: true }) as any[]
  products.value = rows.map(rowToProduct)
}

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const search =
      product.Name?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.ID?.toLowerCase().includes(searchQuery.value.toLowerCase())

    return search
  })
})

function removeProduct(idx: number) {
  products.value.splice(idx, 1)
}

const props = defineProps<{}>()
</script>
