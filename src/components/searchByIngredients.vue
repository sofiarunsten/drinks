<template>
    <div>
        <h1>Search drink by ingredient</h1>
        <form>
            <div id="selectSpirites">
                <h2>Select ingredients</h2>
                <select class="ingredient" @change="getDrinks" v-model="drinks.selectedIngredient" :disabled="no_more_drinks">
                  <option v-for="ingredient in drinks.drinkIngredients" :value="ingredient">{{ingredient}}</option>
                    <!--för varje ingrideiens som är selected, skapas option och getDrinks function körs>-->
                </select>
            </div>
        </form>



        <h2>Your Ingredients</h2>
        <p class="ingredient-list" v-for="ingredient in drinks.ingredients">{{ingredient}}</p>


        <!-- h3, bild för varje drink som finns -->
        <div class="one-drink" v-for="drink in drinks.drinkFromIngredients">
            <h3> {{ drink.strDrink }}</h3>
            
            <div class="drink-img">
                <img v-bind:src="drink.strDrinkThumb">
            </div>
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
      no_more_drinks: false,
      drinks: {
        selectedIngredient: "", //vald ingridiens
        ingredients: [], //array med alla selected ingredients
        drinkFromIngredients: [], //drinks that contain selected ingredients
        drinkTitles: [],
        drinkName: [],
        drinkIngredients: [], //alla ingridienser som finns i drinkarna från alcoholic drinks
        drinkId: [], //alcoholic drinks
        allDrinkInfo: [] //allt om drinken
      }
    };
  },

  //när componenten är mounted(har tillgång till DOM), kör getAlcoholicDrinks function
  mounted: function() {
    console.log("mounted", this);
    this.getAlcoholicDrinks();
  },
  methods: {
    //hämta alla drinkar i api alkoholic drinks
    //spara drinkid i drinkId
    //kör sen loopDrinkId
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
    //loopa igenom drinkId array
    //hämta all drinkinfo från annan api adresss
    //spara i allDrinkInfo array
    //kör getIngredients function
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
    //loopa igenom allDrinkInfo array
    //om ingridiensen inte redan finns i drinkIngredients spara i array
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
      this.drinks.drinkFromIngredients = []; //gör en tillfällig array ist.

      //selected ingredient är string som läggs in i array ingredients
      if (this.drinks.ingredients.indexOf(this.drinks.selectedIngredient) === -1) {
        this.drinks.ingredients.push(this.drinks.selectedIngredient);
      }

      var promises = []; //array med alla anrop

      //loopa igenom array med alla valda ingridienser i
      //lägger in alla promises i array
      //hämtar alla drinkar i anropen

      for (var i = 0; i < this.drinks.ingredients.length; i++) {
        //console.log("i loop");
        var ingredient = this.drinks.ingredients[i];

        promises.push(
          //lägger in alla anrop i array promises
          this.$http.get(
            "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
              ingredient
          )
        );
      }

      Promise.all(promises).then(
        //kör alla anrop och kör then när alla anrop är färdiga
        function(responses) {
          //responses är en array med alla svar från anrop
          for (var i = 0; i < responses.length; i++) {
            var data = responses[i];

            if (this.drinks.drinkFromIngredients.length === 0) {
              //om drinkFromIngredient är tom och det finns drinkar så fyll.
              for (var j = 0; j < data.body.drinks.length; j++) {
                this.drinks.drinkFromIngredients.push(data.body.drinks[j]);
              }

              //annars om drinkar enligt ny ingridiens matchar drinkar som finns i array så spara i ny array, byt sedan ut gamla array mot nya.
            } else {
              //console.log("jämför array med ny array");
              var drinksThisIngredient = [];
              // console.log(i, this.drinks.drinkFromIngredients);
              // console.log(i, data.body.drinks);
              for (var k = 0; k < data.body.drinks.length; k++) {
                if (
                  // find skickar tillbaka första elementet som matchar inte true eller false.
                  // If it finds an array element where the function returns a true value,
                  // find() returns the value of that array element (and does not check the remaining values)
                  // Otherwise it returns undefined

                  this.drinks.drinkFromIngredients.find(function(drink) {
                    //vad är drink??
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
            }

            // if no drinks were found stop user from selcting more ingredients!
            if (this.drinks.drinkFromIngredients.length === 0) {
              this.no_more_drinks = true;
            }
          }
        }.bind(this) //så att this fortf är vue componenten (annars function)
      );
    }
  }
};

/*function init() {
  methods.getDrinkIngredients();
}

window.onload = init;*/
</script>

<style scoped>
.ingredient {
  display: inline;
}
</style>