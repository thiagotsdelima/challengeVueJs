<script lang="ts" setup>
// function adjustItem(a: itens, b: itens) {
//   a.produtcs.name.localeCompare(b.produtcs.name)
// }

// function addProductRow(produtcs: Product): void {
//   const exitingItem = itens.find((i) => i.produtcs.id === produtcs.id) ?? {
//     products,
//     quantity: 0
//   }
//   const newItems = { ...exitingItem, quantity: exitingItem.quantity + 1 }
//   const itemWithoutItemSelected = itens.value.filter(
//     (i) => i.produtcs.id !== produtcs.id
//   )
//   itens.value = [...itemWithoutItemSelected, newItems].sort(adjustItem)
// }
</script>

<template>
  <router-view />
</template>
