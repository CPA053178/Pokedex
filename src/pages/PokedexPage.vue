<template>
    <q-toolbar class="bg-light-green-10 text-white">

        <q-toolbar-title>
            <big id="roy"> Pokedex</big>
        </q-toolbar-title>
        <!-- <q-btn flat round dense icon="apps" class="q-mr-xs" /> -->
        <!-- <q-btn flat round dense icon="more_vert" /> -->
        <q-input @keyup.enter={triggerSearch} placeholder="Search" dark dense standout v-model="textSearch"
            input-class="text-left" class="q-ml-md" />
        <!-- <input type="text" v-model="textSearch" /> -->
        <q-btn @click={triggerSearch} flat class="bg-purple-8 q-ml-md" round dense icon="search" />
        <poke-cart></poke-cart>
    </q-toolbar>
    <div class="row justify-center">
        {{ filteredPokemons.length }}
        <q-select style="width: 350px;" square filled v-model="state.pokeType" :options="types" label="Type" />
    </div>

    <div class="row q-gutter-md q-pa-md justify-center">
        <poke-card v-for="poke in filteredPokemons" :key="'page' + poke.types" :poke="poke" v-model="counter">
        </poke-card>
        {{ counter }}
    </div>
</template>


<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import PokeCard from 'src/components/PokeCard.vue'
import PokeCart from 'src/components/PokeCart.vue'
const textSearch = ref('')
const counter = ref(1)

const host = 'https://pokeapi.co/api/v2/pokemon?limit=151'
const pokemons = ref([])
const state = reactive({
    pokeType: 'all',
    pokemons: [],
    searchedPokemons: []

})
const types = [
    'all',
    'grass',
    'water',
    'fire',
    'flying',
    'bug',
    'poison',
    'normal',
    'ground',
    'fairy',
    'electric',
    'fighting',
    'psychic',
    'rock',
    'ice',
    'ghost',
    'dragon',
    'steel'
]
function triggerSearch () {
  state.searchedPokemons = search()
}

const filteredPokemons = computed(() => {
  if (state.pokeType === 'all' && !textSearch.value) return state.pokemons
  if (state.pokeType === 'all') return state.pokemons.filter(p => p.name.includes(textSearch.value))
  return state.pokemons.filter(poke => {
    return poke.data.types.map(t => t.type.name).includes(state.pokeType) && poke.name.includes(textSearch.value)
  })
})

function search () {
  if (state.pokeType === 'all' && !textSearch.value) return state.pokemons
  if (state.pokeType === 'all') return state.pokemons.filter(p => p.name.includes(textSearch.value))
  return state.pokemons.filter(poke => {
    return poke.data.types.map(t => t.type.name).includes(state.pokeType) && poke.name.includes(textSearch.value)
  })
}

onMounted(async () => {
  // create a fetch request that will get pokemons from https://pokeapi.co/api/v2/pokemon
  state.pokemons = await getPokemons()

  triggerSearch()
})

async function getPokemons () {
  const { results: pokes } = await (await fetch(host)).json()
  console.log(pokes)
  for (const pokemon of pokes) {
    pokemon.data = await getPokeData(pokemon.url)
  }
  console.log('pokemonsssss', pokes)
  return pokes
}

async function getPokeData (url) {
  return await (await fetch(url)).json()
}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nabla&display=swap');

#roy {
    font-family: "Nabla";
    color: white;
    text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;

}
</style>
