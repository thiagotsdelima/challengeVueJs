import { ref } from 'vue'

export type Product = {
  id: string
  name: string
  price: number
  available: boolean
  imageUrl: string
  rating: number
}

export const products = ref<Product[]>([])

function adjustItem(a: Product, b: Product) {
  return a.name.localeCompare(b.name)
}

export function addProductRow(product: Product): void {
  const existingItem = products.value.find((p) => p.id === product.id)

  if (!existingItem) {
    products.value = [...products.value, product].sort(adjustItem)
  } else {
    console.warn('Product already exists in the list.')
  }
}

export function updateProduct(idx: number, patch: Partial<Product>) {
  products.value[idx] = { ...products.value[idx], ...patch }
}
