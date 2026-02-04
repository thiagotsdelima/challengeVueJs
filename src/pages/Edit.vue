<template>
  <div class="grid max-w-5xl mx-auto my-8 px-4">
    <Button
      label="Back to Home"
      color="blue"
      type="button"
      class="max-w-48"
      @click="() => router.push('/')"
    />
    <Label label="Edit Product:" class="mt-4" />

    <form @submit.prevent="saveProductEdit">
      <Label label="Image URL:" />
      <div class="mb-4">
        <input
          v-model="product.imageUrl"
          type="text"
          class="w-full border border-gray-300 p-2 rounded mt-1"
          placeholder="Enter image URL"
        />
      </div>
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          <Label label="Name:" />
          <input
            v-model="product.name"
            type="text"
            class="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Enter product name"
          />
        </div>

        <div class="w-1/4">
          <Label label="Price:" />
          <input
            v-model.number="product.price"
            type="number"
            class="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Enter product price"
            step="0.01"
          />
        </div>

        <div class="w-1/6">
          <Label label="Rating:" />
          <input
            v-model.number="product.rating"
            type="number"
            class="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="Enter product rating"
            min="0"
            max="10"
            step="0.1"
          />
        </div>
      </div>

      <Label label="Available:" />
      <div class="mb-4">
        <input v-model="product.available" type="checkbox" class="mr-2" />
        <span>Is Available</span>
      </div>

      <div class="flex gap-3 justify-end">
        <div class="flex justify-end mt-4">
          <Button label="Cancel" color="red" type="button" @click="cancel" />
        </div>
        <div class="flex justify-end mt-4">
          <Button label="Save Changes" color="green" type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { products, updateProduct } from '@/utils/store'
import Button from '@/components/Button.vue'
import Label from '@/components/Label.vue'

const router = useRouter()
const route = useRoute()

const productId = route.params.id as string
const productIndex = products.value.findIndex((p) => p.id === productId)

const product = ref({ ...products.value[productIndex] })

function saveProductEdit() {
  updateProduct(productIndex, product.value)
  router.push('/')
}

function cancel() {
  router.push('/')
}
</script>
