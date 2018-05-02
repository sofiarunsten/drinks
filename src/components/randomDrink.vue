<template lang="html">
  <div id="random-drink">

    <div class="one-drink" v-for="drink in drinks">
      <h3> {{ drink.strDrink }}</h3>
      <div class="drink-img">
        <img v-bind:src="drink.strDrinkThumb">
      </div>

      <p>{{ drink.strMeasure1}} {{ drink.strIngredient1 }}</p>
      <p>{{ drink.strMeasure2}} {{ drink.strIngredient2 }}</p>
      <p>{{ drink.strMeasure3}} {{ drink.strIngredient3 }}</p>
      <p>{{ drink.strMeasure4}} {{ drink.strIngredient4 }}</p>
      <p>{{ drink.strMeasure5}} {{ drink.strIngredient5 }}</p>
      <p>{{ drink.strMeasure6}} {{ drink.strIngredient6 }}</p>
      <p>{{ drink.strMeasure7}} {{ drink.strIngredient7 }}</p>
      <p>{{ drink.strMeasure8}} {{ drink.strIngredient8 }}</p>
      <p>{{ drink.strMeasure9}} {{ drink.strIngredient9 }}</p>
      <p>{{ drink.strMeasure10}} {{ drink.strIngredient10 }}</p>
      <p>{{ drink.strMeasure11}} {{ drink.strIngredient11 }}</p>
      <p> {{ drink.strInstructions }}</p>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      search: '',
      drinks: [],
    }
  },
  methods: {

  },
  created() { //before update för att den alltid ska söka på nytt när man skriver något i sökrutan
    this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(function(data) {
      this.drinks = data.body.drinks; //data.body är hela arrayen med alla drinkar
    })
  }
}
</script>

<style lang="scss">
  $orange: #f2b765;
  $pink: #ff91b9;
  $blue: #97ecef;
  $green: #a0ef92;

  .one-drink {
    padding: 10px;
    color: #fff;
    h3 {
      color: #fff;
      font-family: 'Montserrat';
      font-weight: 300;
      text-transform: uppercase;
      font-size: 30px;
      margin-bottom: 10px;
    }

    .drink-img {
      img {
        width: 100%;
      }

    }

    p:last-child {
      margin-top: 15px;
    }
  }

  .one-drink:nth-child(4n-2) {
    background-color: $orange;
  }

  .one-drink:nth-child(4n-1) {
    background-color: $pink;
  }

  .one-drink:nth-child(4n) {
    background-color: $blue;
  }

  .one-drink:nth-child(4n+1) {
    background-color: $green;
  }

</style>
