<template>
    <div id="sbi">
        <form>
            <div id="selectSpirites">
                <h3>Select ingredients</h3>

                <!-- @change kör funktionen getDrinks när du väljer ingridiens, attributet disabled är kopplat till no_more_drinks -->
                <!--för varje ingrideiens som är selected, skapas option, attributet :value är kopplat till ingredient -->
                <select class="ingredient" @change="getDrinks" v-model="drinks.selectedIngredient" :disabled="no_more_drinks">
                  <option v-for="ingredient in drinks.drinkIngredients" :value="ingredient">{{ingredient}}</option>
                </select>
            </div>
        </form>


        <div id="yourIngredients">

          <!-- rutor med ingridienserna du valt och en bild på kryss som tar bort ingridiensen om du clickar på den -->

          <h3 id="ingredientHeading">Your Ingredients</h3>
          <div class="ingredient-list" v-for="ingredient in drinks.ingredients">
            <p>{{ingredient}}</p>
            <img id="x" src="src/img/vittx.png" v-model="drinks.removeThisIngredient" @click="removeIngredient(ingredient)">
          </div>
          
          <!-- meddelande när det inte finns några drinkar -->
          <p>{{drinks.message}}</p>

        </div>

        <!-- h3 & bild för varje drink som finns i drinkFromIngredients -->
        <div class="one-drink" v-for="drink in drinks.drinkFromIngredients">
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

export default {
  components: {},
  data() {
    return {
      no_more_drinks: false, //om drinkar inte finns = true
      drinks: {
        selectedIngredient: "", //vald ingridiens steg 1
        ingredients: [], //array med alla valda ingredienser steg 2
        drinkFromIngredients: [], //drinkar som innehåller valda ingridienser
        removeThisIngredient: "", //ingridiensen du väljer att ta bort
        drinkIngredients: [], //alla ingridienser som finns i drinkarna från alcoholic drinks
        drinkId: [], //alcoholic drinks, bara namn och id
        allDrinkInfo: [], //allt om drinken
        message: "" // meddelande om det inte finns drinkar
      }
    };
  },

  //när componenten är mounted(har tillgång till DOM), kör getAlcoholicDrinks function
  //Om du uppdaterar sidan eller hoppar mellan sidor/componenter så finns dina valda ingridienser kvar och listan med tillhörande drinkar.
  //när componenten är skapad så kollas det om det fanns ingridienser i sessionStorage och isf läggs dem in i ingredients och funktionen getDrinks körs
  mounted: function() {
    this.getAlcoholicDrinks();
   
    if (sessionStorage.savedIngredients !== undefined) {
      this.drinks.ingredients = JSON.parse(sessionStorage.savedIngredients);

      this.getDrinks();
    }

},

  methods: {

    //hämta alla drinkar i api adress alkoholic drinks, spara drinkid i array, kör sen getAllDrinkInfo

    getAlcoholicDrinks: function() {
      this.$http
        .get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic")
        .then(function(data) { 
          for (var i = 0; i < data.body.drinks.length; i++) {
            this.drinks.drinkId.push(data.body.drinks[i].idDrink);
          }
          this.getAllDrinkInfo();
        });
    },


    //gå in i ny api-adress och hämta mer info om alla drinkar som fanns i alcoholic drinks api-adress, och spara i array. Kör sen getIngredients
    getAllDrinkInfo: function() {
      for (var j = 0; j < this.drinks.drinkId.length; j++) {

        this.$http
          .get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + this.drinks.drinkId[j]).then(function(data) {
            for (var k = 0; k < data.body.drinks.length; k++) {
              this.drinks.allDrinkInfo.push(data.body.drinks[k]);
            }

            this.getIngredients();
          });
      }
    },


    //loopa igenom allDrinkInfo array och ta ut ingridienser
    //om ingridiensen inte redan finns i drinkIngredients array (indexOf === -1) spara den där
    getIngredients: function() {
      for (var i = 0; i < this.drinks.allDrinkInfo.length; i++) {
        if (this.drinks.drinkIngredients.indexOf(this.drinks.allDrinkInfo[i].strIngredient1) === -1) {
          this.drinks.drinkIngredients.push(this.drinks.allDrinkInfo[i].strIngredient1);
        }

        if (this.drinks.drinkIngredients.indexOf(this.drinks.allDrinkInfo[i].strIngredient2) === -1) {
            this.drinks.drinkIngredients.push(this.drinks.allDrinkInfo[i].strIngredient2);
        }
      }

      //sortera select listan i alfabetisk ordning
      this.drinks.drinkIngredients.sort();

      //om session storage inte är tom, hämta innehåll (med getItem) och sätt in i ingredients array.
      if (sessionStorage.ingredients !== undefined) {
        var retrievedData = sessionStorage.getItem("ingredients");
        this.drinks.ingredients = JSON.parse(retrievedData);
        this.getDrinks();

}
    },


    //hämtar drinkar utifrån dina valda ingridienser
    getDrinks: function() {
      this.drinks.drinkFromIngredients = []; 


      //när du väljer en ingridiens så läggs den in från selectedIngredient till array ingredeients
      if (this.drinks.selectedIngredient && this.drinks.ingredients.indexOf(this.drinks.selectedIngredient) === -1) {
        this.drinks.ingredients.push(this.drinks.selectedIngredient);
      }

      var promises = []; //array med alla anrop

      //för varje vald ingridiens så pushas det specifika promiset(anropet) in i array promises
      for (var i = 0; i < this.drinks.ingredients.length; i++) {
        var ingredient = this.drinks.ingredients[i];
        promises.push(this.$http.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient));
      }

      sessionStorage.savedIngredients = JSON.stringify(this.drinks.ingredients);

      //Promise.all väntar på alla anrop och kör then när alla anrop är färdiga
      //responses är en array med alla svar från anrop
      Promise.all(promises).then(
        function(responses) {
          //för varje respons, om drinklista är tom så fyll
          for (var i = 0; i < responses.length; i++) {
            var data = responses[i];
            if (this.drinks.drinkFromIngredients.length === 0) {
              for (var j = 0; j < data.body.drinks.length; j++) {
                this.drinks.drinkFromIngredients.push(data.body.drinks[j]);
              }

              //om drinklistan inte är tom 
            } else {
              var temporaryDrinkArray = [];

              //för varje drink i data
              //kör find (find retunerar första objektet som matchar i array) 
              //find är funktion som kör en funktion där vi kollar om drinknamnet är samma som drinknamnet i data
              // if find, pusha in drink i temporär array och byt sedan ut drinkByIngredients innehåll mot temporära arrayens innehåll.
              for (var k = 0; k < data.body.drinks.length; k++) {
                if (this.drinks.drinkFromIngredients.find(function(drink) {
                    if (drink.strDrink === data.body.drinks[k].strDrink) {
                      return true;
                    } else {
                      return false;
                    }
                  })
                ) {
                  temporaryDrinkArray.push(data.body.drinks[k]); 
                }
              }
              this.drinks.drinkFromIngredients = temporaryDrinkArray;
            }

            // om inga drinkar fanns så stoppas användaren från att välja fler ingridienser och visa meddelande samt spara meddelande i sessionstorage
            if (this.drinks.drinkFromIngredients.length === 0) {
              console.log("laddar")
              this.no_more_drinks = true; // kopplat till disabled i <select>
              this.drinks.message = "There are no drinks with these ingredients";
              sessionStorage.setItem("message", this.drinks.message);
            } else {
              this.drinks.message = "";
            }
          }
        }.bind(this) //så att this fortf är vue componenten (annars function)
      ); 
    },


    //får argument från <img> i html
    //byter ut ingredients array mot en lista där ingredientToRemove inte finns med
    //updatera savedIngredients i sessionStorage
    removeIngredient: function(ingredientToRemove){

      this.drinks.ingredients = this.drinks.ingredients.filter(function(item){
        return item !== ingredientToRemove;
      });

      sessionStorage.savedIngredients = JSON.stringify(this.drinks.ingredients);

      //nollställ selectedIngredient, selectbox disabled set to false, kör getDrinks så drinklistan uppdateras efter valda ingridienser
      this.drinks.selectedIngredient = '';
      this.no_more_drinks = false;
      this.getDrinks();
    }
  }
};


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
