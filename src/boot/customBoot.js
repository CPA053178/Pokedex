import { boot } from 'quasar/wrappers'

import PokeCart from 'src/components/PokeCart.vue'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router }) => {
  // something to do
  app.component('PokeCart', PokeCart)
})