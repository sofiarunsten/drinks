<template lang="html">
  <div id="drink">
    <button v-on:click="goBack">Go back</button>
    <div class="one-drink" v-for="drink in drinks">
      <div class="top">
        <h3> {{ drink.strDrink }} </h3>
        <div @click="favoriteDrink()" v-bind:class="{ 'liked': liked, 'not-liked': notLiked }" title="Click to Like or Unlike Drink">
        </div>
      </div>

      <div class="drink-img">
        <img v-bind:src="drink.strDrinkThumb">
      </div>

      <h4>Ingredients</h4>

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


      <h4>Instructions</h4>
      <p> {{ drink.strInstructions}}</p>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      'id': this.$route.params.id, //detta sparar id:t: /drink/****
      'drinks': [],
      'liked': false, //för klasserna
      'notLiked': true //för klasserna
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    },
    favoriteDrink: function() { //local storage
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


      },
      likedOrNot: function() {
        this.liked = false;
        this.notLiked = true;

        for (var i = 0; i < this.$favorites.length; i++) {
          if (this.$favorites[i].idDrink == this.id) {
            this.liked = true;
            this.notLiked = false;
          }
        }

      }
  },
  created() {
    this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + this.id).then(function(data) {
        this.drinks = data.body.drinks;

        this.likedOrNot(); // får denna vara här?
    });

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
    font-size: 25px;
    margin-bottom: 10px;
    display: inline-block;
    grid-area: name;
  }

  .top {

    display: grid;
    grid-template-columns: 1fr 50px;
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
    img {
      width: 100%;
    }

  }

  h4 {
    font-weight:400;
    text-transform: uppercase;
    text-align: center;
    padding: 5px;
  }

  .ingredients {
    p:last-child {
      margin-top: 15px;
    }
  }
}

.one-drink:nth-child(4n-2) {
  background-color: $orange;

  h4 {
  border: 2px solid $light-orange;
  }
}

.one-drink:nth-child(4n-1) {
  background-color: $pink;

  h4 {

  }
}

.one-drink:nth-child(4n) {
  background-color: $blue;

  h4 {

  }
}

.one-drink:nth-child(4n+1) {
  background-color: $green;

  h4 {

  }
}

</style>
