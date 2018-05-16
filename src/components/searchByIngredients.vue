<template>
    <div id="sbi">
        <!--
        @check kopplar ett event till checkboxen, -->
        <form>
            <div id="selectSpirites">
                <h2>Spirites</h2>
                <select class="ingredient" @change="getDrinks" v-model="drinks.selectedIngredient">
                  <option v-for="ingredient in drinks.drinkIngredients" :value="ingredient">{{ingredient}}</option>
                    <!--<input type="checkbox" value="kaluha" v-model="drinks.ingredients" @change="getDrinks"/>-->
                </select>
            </div>
        </form>

        <h2>Your Ingredients</h2>
        <p class="ingredient-list" v-for="ingredient in drinks.ingredients">{{ingredient}}</p>

        <div class="one-drink" v-for="drink in drinks.drinkFromIngredients"> <!-- h3, bild för varje drink som finns -->
          <router-link v-bind:to='"/drink/" + drink.idDrink'>
            <div class="grid-one-drink">
              <div class="title">
                <h3> {{ drink.strDrink }}</h3>
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
//ingredients = det man kryssat i
//drinkFromIngredients = objekt med alla drinkar som finns enl. ingridienser

export default {
  components: {},
  data() {
    return {
      drinks: {
        selectedIngredient: "",
        ingredients: [],
        drinkFromIngredients: [],
        drinkTitles: [],
        drinkName: [],
        drinkIngredients: [],
        drinkId: [],
        allDrinkInfo: []
      }
    };
  },
  mounted: function() {
    console.log("mounted", this);
    this.getAlcoholicDrinks();
  },
  methods: {
    // loopa igenom get drink by ingredients object, för varje, spara id.
    // loopa igenom get drink by name objectet och spara id
    // för varje id hämta ingridienser och spara i drinkIngredients

    getAlcoholicDrinks: function() {
      this.$http
        .get(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic"
        )
        .then(function(data) {
          for (var i = 0; i < data.body.drinks.length; i++) {
            this.drinks.drinkId.push(data.body.drinks[i].idDrink);
          }
          this.loopDrinkId();
        });

      //för varje id, hitta drinkar med all info
    },
    //loopa igenom id, och hämta all drinkinfo spara i allino array
    loopDrinkId: function() {
      for (var j = 0; j < this.drinks.drinkId.length; j++) {
        console.log("hgdgdgfdugdjgdjg");
        this.$http
          .get(
            "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
              this.drinks.drinkId[j]
          )
          .then(function(data) {
            for (var k = 0; k < data.body.drinks.length; k++) {
              this.drinks.allDrinkInfo.push(data.body.drinks[k]);
            }
            this.getIngredients();
          });
      }
    },
    //loopa igenom all info array och spara ingridienser i array
    getIngredients: function() {
      for (var i = 0; i < this.drinks.allDrinkInfo.length; i++) {
        if (
          this.drinks.drinkIngredients.indexOf(
            this.drinks.allDrinkInfo[i].strIngredient1
          ) === -1
        ) {
          this.drinks.drinkIngredients.push(
            this.drinks.allDrinkInfo[i].strIngredient1
          );
        }

        if (
          this.drinks.drinkIngredients.indexOf(
            this.drinks.allDrinkInfo[i].strIngredient2
          ) === -1
        ) {
          this.drinks.drinkIngredients.push(
            this.drinks.allDrinkInfo[i].strIngredient2
          );
        }
      }
    },

    getDrinks: function() {
      this.drinks.drinkFromIngredients = [];

      this.drinks.ingredients.push(this.drinks.selectedIngredient);

      var promises = [];

      for (var i = 0; i < this.drinks.ingredients.length; i++) {
        //loopa igenom ingridienser,
        //console.log("i loop");
        var ingredient = this.drinks.ingredients[i];

        console.log(ingredient);

        promises.push(
          this.$http.get(
            "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
              ingredient
          )
        );
      }

      Promise.all(promises).then(
        function(responses) {
          for (var i = 0; i < responses.length; i++) {
            var data = responses[i];

            //console.log(0, data);
            if (!data.body) {
              //console.log(1);
              //om det inte fanns nån drink enligt ingridienserna
              this.drinks.drinkFromIngredients = [];
            } else if (this.drinks.drinkFromIngredients.length === 0) {
              //om drinkFromIngredient är tom och det finns drinkar så fyll.
              //console.log("drinksFromIngredients var tom, så fyll");
              for (var j = 0; j < data.body.drinks.length; j++) {
                this.drinks.drinkFromIngredients.push(data.body.drinks[j]);
              }

              //om drinkar enligt ny ingridiens matchar drinkar som finns i array så spara i ny array, byt sedan ut gamla array mot nya.
            } else {
              //console.log("jämför array med ny array");
              var drinksThisIngredient = [];
              console.log(i, this.drinks.drinkFromIngredients);
              console.log(i, data.body.drinks);
              for (var k = 0; k < data.body.drinks.length; k++) {
                if (
                  this.drinks.drinkFromIngredients.find(function(drink) {
                    if (drink.strDrink === data.body.drinks[k].strDrink) {
                      return true;
                    } else {
                      return false;
                    }
                  })
                ) {
                  drinksThisIngredient.push(data.body.drinks[k]);
                }
              }
              this.drinks.drinkFromIngredients = drinksThisIngredient;
              console.log(this.drinks.drinkFromIngredients);
            }
          }
        }.bind(this)
      );
    }
  }
};

/*function init() {
  methods.getDrinkIngredients();
}

window.onload = init;*/


</script>

.ingredient {
  display: inline;
}

<style lang="scss">
  $orange: #f2b765;
  $background: #f9f7f7;
  $pink: #ff91b9;
  $blue: #97ecef;
  $green: #a0ef92;
  $dark-blue: #3fb8ba;


  #sbi {
    box-sizing: border-box;

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


} //end #sbi







</style>
