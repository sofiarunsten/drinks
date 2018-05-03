<template lang="html">
  <div id="sbn">
    <div class="input-div">
      <input type="text" placeholder="Search for drinks" v-model="search" />
    </div>

    <div class="one-drink" v-for="drink in drinks">
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
      search: '',
      drinks: [],
    }
  },
  methods: {

  },
  updated() { //before update för att den alltid ska söka på nytt när man skriver något i sökrutan
    this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + this.search).then(function(data) {
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
      color: white;
    }

  }





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
