<template lang="html">
  <div id="drink">
    <button v-on:click="goBack">Go back</button>
    <div class="one-drink" v-for="drink in drinks">
      <h3> {{ drink.strDrink }} </h3>
      <div @click="liked = !liked; notLiked = !notLiked; favoriteDrink();" v-bind:class="{ 'liked': liked, 'not-liked': notLiked }">
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
      'liked': false,
      'notLiked': true
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    },
    favoriteDrink: function() { //local storage
        if (this.liked == true) {
          console.log('Nu gillas drinken');

          this.$favorites.unshift(this.drinks);

          for (var i = 0; i < this.$favorites.length; i++) {

              console.log(this.$favorites[i]);
            }

        } else { //om drinken inte redan finns i favorites
          console.log('nu gillas inte drinken');

          for (var i = 0; i < this.$favorites.length; i++) {
            if (this.$favorites[i].idDrink == this.drinks.idDrink) {
              this.$favorites.splice(i, 1); //******detta funkar inte!!!

              console.log(this.$favorites[i]);
            }
          }



          console.log(this.$favorites[0]);
        }
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
    font-size: 30px;
    margin-bottom: 10px;
  }

  .liked {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: red;
  }

  .not-liked {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    border: 2px solid red;
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
