<template lang="html">
  <div id="random-drink">
    <button @click="randomDrink">Random drink</button>
    
    <div class="one-drink" v-for="drink in drinks.randomDrink"> <!-- h3, bild för varje drink som finns -->
      <h3> {{ drink.strDrink }}</h3>
          
          <div class="drink-img">
              <img v-bind:src="drink.strDrinkThumb">
          </div>
    </div>
  
  </div>

</template>

<script>
export default {
  data() {
    return {
      search: "",
      drinks: {
        randomDrink: []
      }
    };
  },
  methods: {
    randomDrink: function() {
      console.log("i function");
      this.$http
        .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(function(data) {
          this.drinks.randomDrink = data.body.drinks;
          console.log(data.body.drinks);
        });
    }
  }
};
</script>

<style lang="scss">

</style>
