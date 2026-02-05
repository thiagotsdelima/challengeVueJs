import { ref } from 'vue'

export type Product = {
  ID?: string
  EAN: number
  Name?: string
  Status?: string
  Score: number
  Mirakl_Image?: string
  BB_Image_Url?: string
}

export const products = ref<Product[]>([])

function adjustItem(a: Product, b: Product): number {
  return a.Name?.localeCompare(b.Name!) ?? 0
}

export function addProductRow(product: Product): void {
  const existingItem = products.value.find((p) => p.ID === product.ID)

  if (!existingItem) {
    products.value = [...products.value, product].sort(adjustItem)
  } else {
    console.warn('Product already exists in the list.')
  }
}

export function updateProduct(idx: number, patch: Partial<Product>) {
  products.value[idx] = { ...products.value[idx], ...patch }
}
