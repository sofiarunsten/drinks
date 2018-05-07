<template lang="html">
  <div id="sbn">
    <div class="input-div">
      <input type="text" placeholder="Search for drinks" v-model="search" />
    </div>


        <div class="one-drink" v-for="drink in drinks">
          <router-link v-bind:to='"/drink/" + drink.idDrink'>
            <h3> {{ drink.strDrink }} </h3>
            <!-- Länken till drinksidan måste läggas in på alla komponenter som ska ha den -->
            <div class="drink-img">
              <img v-bind:src="drink.strDrinkThumb">
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
  updated() { //before update för att den alltid ska söka på nytt när man skriver något i sökrutan
    this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + this.search).then(function(data) {
      this.drinks = data.body.drinks; //data.body är hela arrayen med alla drinkar
    })
  }
}
</script>

<style lang="scss">
  $orange: #f2b765;
  $light-orange: #f9cc8e;
  $pink: #ff91b9;
  $blue: #97ecef;
  $green: #a0ef92;
  $details: #fff;

* {
  box-sizing: border-box;
}

  #sbn {

  .input-div {
    background-color: $orange;
    padding-top: 10px;
    width: 100%; //***************ÄNDRA DETTA!

    ::placeholder {
      color: $details;
      opacity: 0.5;
    }

    input {
      background-color: $light-orange;
      width: 250px;
      margin-left: 10px;
      padding: 10px;
      text-transform: uppercase;
      border: 2px solid $details;
      margin-bottom:10px;
      color: $details;
    }

    input:focus {
      outline: none;
      background-color: $details;
      border: 2px solid $light-orange;
      color: $orange;

      ::placeholder {
        color: $orange;
      }
    }

  }





  .one-drink {
    padding: 10px;
    color: #fff;
    position: relative;

    a {
      text-decoration: none;
    }

    h3 {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 0px;
      padding: 10px 0 10px 20px;
      background-color: rgba(255, 255, 255, 0.5);
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
}

</style>
