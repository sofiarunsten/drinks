<template>
  <div>
    <app-header></app-header>
    <router-view></router-view> <!--kommer visa olika content beroende på route-->
    <app-footer></app-footer>
  </div>
</template>

<script>
//components
import header from './components/header.vue'
import footer from './components/footer.vue'
import drink from './components/drink.vue'
import favorites from './components/favorites.vue'
import randomDrink from './components/randomDrink.vue'
import searchByIngredients from './components/searchByIngredients.vue'
import searchByName from './components/searchByName.vue'
import start from './components/start.vue'

export default {
  components: {
    'app-header': header,
    'app-footer': footer,
    'drink': drink,
    'favorites': favorites,
    'random-drink': randomDrink,
    'search-by-ingredients': searchByIngredients,
    'search-by-name': searchByName,
    'start': start,
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
$background: #fafafa;
  * {
    margin: 0;
    padding: 0;
  }

  body {
    position: relative;
    background-color: $background;
    padding-bottom: 50px;
  }

</style>
