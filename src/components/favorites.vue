<template lang="html">
  <div id="favorites">
    <div id="buttoncontainer">
      <button v-on:click="goBack">Go back</button>
    </div>

    <div class="one-drink" v-for="drink in this.$favorites">
      <router-link v-bind:to='"/drink/" + drink.idDrink'>

      <div class="grid-one-drink">
        <div class="title">
          <h3> {{ drink.strDrink }} </h3>
        </div>

        <!-- Länken till drinksidan måste läggas in på alla komponenter som ska ha den -->
        <div class="drink-img">
          <img v-bind:src="drink.strDrinkThumb">
        </div>
      </div>

      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  },
  created() {
    if (localStorage.favoriteDrinks !== undefined) {
      this.$favorites = JSON.parse(localStorage.favoriteDrinks);
    }
  }
}
</script>

<style lang="scss">
$orange: #f2b765;
$background: #fafafa;
$pink: #ff91b9;
$light-pink: #ffccde;
$blue: #97ecef;
$green: #a0ef92;
$dark-blue: #3fb8ba;

#favorites {

  #buttoncontainer {
    text-align: center;
    button {
      padding: 5px 10px;
      background-color: $blue;
      border-radius: 15px;
      text-transform: uppercase;
      border: 2px solid $blue;
      color: $dark-blue;
      display: inline-block;
      font-weight: 700;
    }
  }

  .one-drink {
    margin: 10px;
    padding: 10px;


    .grid-one-drink {
      display: grid;
      grid-template-columns: 35% 1fr;
      grid-template-areas:
      "drinkimg title"
      ;
    }

    .title {
      grid-area: title;
    }

    .drink-img {
      grid-area: drinkimg;

      img {
        width: 100%;

        padding: 5px;
        border: 3px solid $background;
      }
    }

    h3 {
      font-family: 'Montserrat';
      text-transform: uppercase;
      color: $background;
      font-weight: 400;
      padding: 10px;
      display: inline-block;
      margin-left: 20px;

    }

    a {
      text-decoration: none;
      color: black;

    }
  }

  .one-drink:nth-child(4n-2) {
    background-color: $pink;
  }

  .one-drink:nth-child(4n-1) {
    background-color: $orange;
  }

  .one-drink:nth-child(4n) {
    background-color: $blue;
  }

  .one-drink:nth-child(4n+1) {
    background-color: $green;
  }
}
</style>
