<template lang="html">
  <div id="sbn">
    <div class="input-div">
      <input type="text" placeholder="Search for drinks" v-model="search" />
    </div>


        <div class="one-drink" v-for="drink in drinks">
          <router-link v-bind:to='"/drink/" + drink.idDrink'>

          <div class="grid-one-drink">
            <div class="title">
              <h3> {{ drink.strDrink }} </h3>
            </div>

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
      search: '',
      drinks: []
    }
  },
  methods: {
  },
  created() {
    if (sessionStorage.nameSearch !== undefined) {
      this.search = sessionStorage.nameSearch;

      this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + this.search).then(function(data) {
        this.drinks = data.body.drinks; //data.body är hela arrayen med alla drinkar
      })
    }
  },
  updated() { //before update för att den alltid ska söka på nytt när man skriver något i sökrutan
    this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + this.search).then(function(data) {
      this.drinks = data.body.drinks; //data.body är hela arrayen med alla drinkar

      sessionStorage.nameSearch = this.search;
    })
  }
}
</script>

<style lang="scss">
  $orange: #f2b765;
  $background: #fafafa;
  $pink: #ff91b9;
  $blue: #97ecef;
  $green: #a0ef92;
  $dark-blue: #3fb8ba;


  #sbn {
    box-sizing: border-box;
    font-family: 'Montserrat';
    font-weight: 400;

  .input-div {
    margin: 10px;
    text-align: center;

    ::placeholder {
      color: $dark-blue;
      opacity: 0.5;
    }

    input {
      background-color: $background;
      padding: 10px;
      text-transform: uppercase;
      border: 2px solid $blue;
      color: $dark-blue;
      display: inline-block;
      width: 230px;
    }

    input:focus {
      outline: none;
      background-color: $background;
      border: 2px solid $dark-blue;
      color: $dark-blue;

      ::placeholder {
        color: $orange;
      }
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


} //end #sbn







</style>
