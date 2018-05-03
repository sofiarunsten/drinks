<template lang="html">
  <div id="drink">
    <button v-on:click="goBack">Go back</button>
    <div class="one-drink" v-for="drink in drinks">
      <h3> {{ drink.strDrink }} </h3>
      <div class="drink-img">
        <img v-bind:src="drink.strDrinkThumb">
      </div>

      <p> {{ drink.strMeasure1 }} {{drink.strIngredient1 }}</p>
      <p> {{ drink.strMeasure2 }} {{drink.strIngredient2 }}</p>
      <p> {{ drink.strMeasure3 }} {{drink.strIngredient3 }}</p>
      <p> {{ drink.strMeasure4 }} {{drink.strIngredient4 }}</p>
      <p> {{ drink.strMeasure5 }} {{drink.strIngredient5 }}</p>
      <p> {{ drink.strMeasure6 }} {{drink.strIngredient6 }}</p>
      <p> {{ drink.strMeasure7 }} {{drink.strIngredient7 }}</p>
      <p> {{ drink.strMeasure8 }} {{drink.strIngredient8 }}</p>
      <p> {{ drink.strMeasure9 }} {{drink.strIngredient9 }}</p>
      <p> {{ drink.strMeasure10 }} {{drink.strIngredient10 }}</p>
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
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  },
  created() {
    this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + this.id).then(function(data) {
        this.drinks = data.body.drinks;
    })
  }
}
</script>

<style lang="scss">
$orange: #f2b765;
$pink: #ff91b9;
$blue: #97ecef;
$green: #a0ef92;

#sbn {

}

.input-div {
  width: calc(100% - 45px); //***************ÄNDRA DETTA!

  input {
    width: 100%;
    margin-left: 10px;
    padding: 10px;
    text-transform: uppercase;
    border: 2px solid $blue;
    margin-bottom:10px;
  }

  input:focus {
    outline: none;
    background-color: #f4ffff;
    color: $pink;
  }

}





.one-drink {
  padding: 10px;
  color: #fff;

  a {
    text-decoration: none;
  }

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
