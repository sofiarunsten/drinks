<template lang="html">
  <div id="random-drink">
    <div id="buttoncontainer">
      <button @click="randomDrink">Get another recipe</button>
    </div>

    <div class="one-drink" v-for="drink in drinks"> <!-- h3, bild för varje drink som finns -->
      <div class="top">
        <h3> {{ drink.strDrink }} </h3>
        <div @click="favoriteDrink()" v-bind:class="{ 'liked': liked, 'not-liked': notLiked }" title="Click to Like or Unlike Drink">
        </div>
      </div>

      <div class="drink-img">
        <img v-bind:src="drink.strDrinkThumb">
      </div>

      <div class="header-container">
        <h4>Ingredients</h4>
      </div>


      <div class="ingredients">
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

      <div class="header-container">
        <h4>Instructions</h4>
      </div>
      <p> {{ drink.strInstructions}}</p>
    </div>
    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      search: "",
      drinks: [],
      'liked': false, //för klasserna
      'notLiked': true //för klasserna
    };
  },
  methods: {
    randomDrink: function() {
      this.$http
        .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(function(data) {
          this.drinks = data.body.drinks;
          this.likedOrNot();
        });
    },
    favoriteDrink: function() {
      if (this.liked == false) {

        this.$favorites.unshift(this.drinks[0]);

        this.liked = true;
        this.notLiked = false;
      } else if (this.liked == true) {
        for (var i = 0; i < this.$favorites.length; i++) {
          if (this.$favorites[i].idDrink == this.drinks[0].idDrink) { //om drinken finns i this.$favorites
            this.$favorites.splice(i, 1);
          }
        }

        this.liked = false;
        this.notLiked = true;
      }

      localStorage.favoriteDrinks = JSON.stringify(this.$favorites); //skriver över localStorage med den nya favoritlistan.
    },
    likedOrNot: function() {
      this.liked = false;
      this.notLiked = true;

      for (var i = 0; i < this.$favorites.length; i++) {
        if (this.$favorites[i].idDrink == this.drinks.idDrink) {
          this.liked = true;
          this.notLiked = false;
        }
      }

    }
  },
  created() {
    this.randomDrink();
    this.likedOrNot();

    if (localStorage.favoriteDrinks !== undefined) {
      this.$favorites = JSON.parse(localStorage.favoriteDrinks);
    }
  }
};
</script>

<style lang="scss">
$orange: #f2b765;
$background: #fafafa;
$pink: #ff91b9;
$light-pink: #ffccde;
$blue: #97ecef;
$green: #a0ef92;
$dark-blue: #3fb8ba;

#random-drink {
  padding: 10px;
  font-family: 'Montserrat';
  font-weight: 400;
  color: white;
  box-sizing: border-box;

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
      margin-bottom: 10px;
      font-weight: 700;
    }

    button:focus {
      outline: none;
      color: white;
      background-color: $dark-blue;
    }
  }

  .one-drink {
    padding: 10px;
    border: 2px solid $pink;
    background-color: $light-pink;

    ::-moz-selection {
       background-color: $pink;
    }
    ::selection {
        background-color: $pink;
    }
    a {
      text-decoration: none;
    }

    h3 {
      color: $pink;
      font-weight: 400;
      text-transform: uppercase;
      font-size: 20px;
      margin-bottom: 10px;
      display: inline-block;
      grid-area: name;
    }

    .top {

      display: grid;
      grid-template-columns: 1fr 25px;
      grid-template-areas:
        "name like"
      ;

      .liked {
        grid-area: like;
        width: 25px;
        background-image: url("../img/heartliked.png");
        background-repeat: no-repeat;
        background-size: contain;
      }

      .not-liked {
        grid-area: like;
        width: 25px;
        background-image: url("../img/heartnotliked.png");
        background-repeat: no-repeat;
        background-size: contain;
      }
    }


    .drink-img {
      text-align: center;
      img {
        width: 90%;
        border: 3px solid rgba(255, 255, 255, 0.3);
        padding: 5px;
      }

    }

    .header-container {
      margin-top: 5px;
      text-align: center;
    }

    h4 {
      font-weight:400;
      text-transform: uppercase;
      text-align: center;
      padding: 5px;
      color: $pink;
      padding: 5px;
      border: 2px solid $pink;
      display: inline-block;
      margin-bottom: 7px;
    }

    .ingredients {
      p:last-child {
        margin-top: 15px;
      }
    }
  }
}
</style>
