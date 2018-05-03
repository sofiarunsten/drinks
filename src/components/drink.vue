<template lang="html">
  <div id="drink">
    <div class="theDrink" v-for="drink in drinks">
      <h2>{{ drink.strDrink }}</h2>
        <p>{{ drink.strIn }}</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id, //detta sparar id:t: /drink/****
      drinks: []
    }
  },
  created() {
    this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + this.id).then(function(data) {
        this.drinks = data.body.drinks;
    })
  }
}
</script>

<style lang="css">
</style>
