<template>
    <div id="sbi">
        <form>
            <div id="selectSpirites">
                <h3>Select ingredients</h3>
                <select class="ingredient" @change="getDrinks" v-model="drinks.selectedIngredient" :disabled="no_more_drinks">
                  <option v-for="ingredient in drinks.drinkIngredients" :value="ingredient">{{ingredient}}</option>
                    <!--för varje ingrideiens som är selected, skapas option och getDrinks function körs>-->
                </select>
            </div>
        </form>


        <div id="yourIngredients">

          <h3 id="ingredientHeading">Your Ingredients</h3>
          <div class="ingredient-list" v-for="ingredient in drinks.ingredients">
            <p>{{ingredient}}</p>
            <img id="x" src="src/img/vittx.png" v-model="drinks.removeThisIngredient" @click="removeIngredient(ingredient)">
          </div>
          
          
          <p>{{drinks.message}}</p>
        </div>

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
      no_more_drinks: false,
      drinks: {
        selectedIngredient: "", //vald ingridiens
        ingredients: [], //array med alla selected ingredients
        drinkFromIngredients: [], //drinks that contain selected ingredients
        removeThisIngredient: "",
        drinkIngredients: [], //alla ingridienser som finns i drinkarna från alcoholic drinks
        drinkId: [], //alcoholic drinks
        allDrinkInfo: [], //allt om drinken
        message: ""
      }
    };
  },
  created() {
    if (sessionStorage.savedIngredients !== undefined) {
      this.drinks.ingredients = JSON.parse(sessionStorage.savedIngredients);

      this.getDrinks();
    }
  },

  //när componenten är mounted(har tillgång till DOM), kör getAlcoholicDrinks function
  mounted: function() {
    console.log("mounted", this);
    this.getAlcoholicDrinks();
  //init();
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
        for (var j = 0; j < 15; j++){
        if (this.drinks.drinkIngredients.indexOf(this.drinks.allDrinkInfo[i].strIngredient1) === -1) {
          this.drinks.drinkIngredients.push(this.drinks.allDrinkInfo[i].strIngredient1);
        }
        }

        if (
          this.drinks.drinkIngredients.indexOf(this.drinks.allDrinkInfo[i].strIngredient2) === -1) {
            this.drinks.drinkIngredients.push(this.drinks.allDrinkInfo[i].strIngredient2);
        }
      }

      this.drinks.drinkIngredients.sort();
      if (sessionStorage.ingredients !== undefined) { //om local storage inte är tom
       //this.drinks.ingredients = sessionStorage.ingredients; //gör innehåll i local storage till objekt och spara i book

      
        var retrievedData = sessionStorage.getItem("ingredients");
        this.drinks.ingredients = JSON.parse(retrievedData);
        this.getDrinks();

}
    },

    getDrinks: function() {
      this.drinks.drinkFromIngredients = []; 


      //selected ingredient är string som läggs in i array ingredients
      if (this.drinks.selectedIngredient && this.drinks.ingredients.indexOf(this.drinks.selectedIngredient) === -1) {
        this.drinks.ingredients.push(this.drinks.selectedIngredient);
      }

      sessionStorage.setItem("ingredients", JSON.stringify(this.drinks.ingredients));

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

        // ********************** TEST
        sessionStorage.savedIngredients = JSON.stringify(this.drinks.ingredients);

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
              console.log("assååå")
              this.no_more_drinks = true;
              this.drinks.message = "There are no drinks with these ingredients";
              sessionStorage.setItem("message", this.drinks.message);
            } else {
              this.drinks.message = "";
            }
          }
        }.bind(this) //så att this fortf är vue componenten (annars function)
      ); 
    },

    removeIngredient: function(ing){
      //ta bort ingredient i drinks.ingredients
      //kör getDrinks
      var valueToRemove = this.drinks.removeThisIngredient;
      console.log("haha", ing);

      this.drinks.ingredients = this.drinks.ingredients.filter(function(item){
        return item !== ing;
      });

      sessionStorage.savedIngredients = JSON.stringify(this.drinks.ingredients);

      this.drinks.selectedIngredient = '';
      this.no_more_drinks = false;
      sessionStorage.removeItem("valueToRemove");
      this.getDrinks();
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
  $background: #fafafa;
  $pink: #ff91b9;
  $blue: #97ecef;
  $green: #a0ef92;
  $dark-blue: #3fb8ba;


  #sbi {
    box-sizing: border-box;
    padding: 10px;
    font-family: 'Montserrat';
    font-weight: 400;

    #selectSpirites {
      text-align: center;

      h3 {
        text-transform: uppercase;
        font-size: 14px;
        padding: 5px;
        color: $dark-blue;
        display: inline-block;
        width: 200px;
        margin-bottom: 5px;
      }

      select {
        background-color: transparent;
        padding: 10px;
        border: 2px solid $blue;
        color: $dark-blue;
      }

      select:focus {
        border: 2px solid $dark-blue;
        outline: none;
      }
    }

    #yourIngredients {
      font-family: 'Montserrat';
      margin-top: 20px;
      text-align: center;

      h3 {
        font-weight: 400;
        text-transform: uppercase;
        font-size: 13px;
        color: $dark-blue;
        margin-bottom: 5px;
      }

      .ingredient-list {
        background-color: $pink;
        padding: 5px;
        border-radius: 15px;
        display: inline-block;
        margin: 3px;

        p {
          font-size: 12px;
          color: white;
          display: inline-block;
          margin: 3px;
          cursor: default;
        }

        #x {
          width: 12px;
          padding: 2px;
          cursor: pointer;
        }
      }


    }

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
