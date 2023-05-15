<template>
    <q-btn flat class="bg-purple-8 q-ml-md" round dense icon="shopping_cart">
        <q-popup-proxy ref="popup">
            <!-- {{ cart }} -->
            <div class="column q-pa-md">
                <div v-for="(poke, i) in store.cart" :key="'cart' + poke.id">

                    <poke-card :index="i" hide-add-button :poke="poke" @delete="deleted">
                    </poke-card>
                </div>
            </div>
        </q-popup-proxy>

        <q-badge color="red" floating>{{ store.cart.length }}</q-badge>
    </q-btn>
</template>
  
<script setup>

import { store } from 'stores/cart'
import { ref } from 'vue'
import PokeCard from 'components/PokeCard.vue'

const popup = ref()

async function deleted(data) {
    console.log('DELETED...', data, popup)
    // popup.value.$forceUpdate()
    await popup.value.hide()
    await popup.value.show()
}
console.log('cart', store.cart)

</script>