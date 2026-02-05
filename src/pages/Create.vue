<template>
  <div class="grid max-w-5xl mx-auto my-8 px-4">
    <Button
      label="Back to Home"
      color="blue"
      type="normal"
      class="max-w-48"
      @click="() => $router.push('/')"
    />
    <Label label="Create New Product:" class="mt-4" />

    <form @submit.prevent="saveProduct">
      <Label label="Image URL:" />
      <div class="mb-4">
        <input
          v-model="product.BB_Image_Url"
          type="text"
          class="w-full border border-gray-300 p-2 rounded mt-1"
          placeholder="image URL"
        />
      </div>
      <Label label="Mirakl Image:" />
      <div class="mb-4">
        <input
          v-model="product.Mirakl_Image"
          type="text"
          class="w-full border border-gray-300 p-2 rounded mt-1"
          placeholder="mirakl Image"
        />
      </div>
      <div class="flex gap-4 mb-4">
        <div class="flex-1">
          <Label label="Name:" />
          <input
            v-model="product.Name"
            type="text"
            class="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="product name"
          />
        </div>

        <div class="w-1/4">
          <Label label="Status:" />
          <input
            v-model.number="product.Status"
            type="string"
            class="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="product Status"
            step="0.01"
          />
        </div>

        <div class="w-1/6">
          <Label label="Score:" />
          <input
            v-model.number="product.Score"
            type="number"
            class="w-full border border-gray-300 p-2 rounded mt-1"
            placeholder="product Score"
            min="0"
            max="10"
            step="0.1"
          />
        </div>
      </div>

      <div class="flex gap-3 justify-end">
        <div class="flex justify-end mt-4">
          <Button label="Cancel" color="red" type="button" @click="cancel" />
        </div>
        <div class="flex justify-end mt-4">
          <Button label="Save Product" color="green" type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { addProductRow } from '@/utils/store'
import Button from '@/components/Button.vue'
import Label from '@/components/Label.vue'

const router = useRouter()

defineProps<{}>()

const product = ref({
  ID: Date.now().toString(),
  EAN: 0,
  Name: '',
  Status: '',
  Score: 0,
  Mirakl_Image: '',
  BB_Image_Url: ''
})

function saveProduct() {
  addProductRow(product.value)
  router.push('/')
}

function cancel() {
  router.push('/')
}
</script>
