<template>
    <div>
        <h1>Search drink by ingredient</h1>
        <!--
        @check kopplar ett event till checkboxen, -->
        <form>
            <div id="checkboxes">
                <h2>Spirites</h2>
                <label>Kahlua</label>
                <input type="checkbox" value="Kahlua" v-model="drinks.ingredients" @change="getDrinks"/>
                <label>Vodka</label>
                <input type="checkbox" value="Vodka" v-model="drinks.ingredients" @change="getDrinks"/>
                <label>Gin</label>
                <input type="checkbox" value="Gin" v-model="drinks.ingredients" @change="getDrinks"/>
                <label>Tequila</label>
                <input type="checkbox" value="Tequila" v-model="drinks.ingredients" @change="getDrinks"/>
                <label>Amaretto</label>
                <input type="checkbox" value="Amaretto" v-model="drinks.ingredients" @change="getDrinks"/>
                <h2>Groggvirke & tillbehör</h2>
                <label>Lime</label>
                <input type="checkbox" value="Lime" v-model="drinks.ingredients" @change="getDrinks"/>
                <label>Sprite</label>
                <input type="checkbox" value="Sprite" v-model="drinks.ingredients" @change="getDrinks"/>
                <label>Raspberry</label>
                <input type="checkbox" value="Raspberry" v-model="drinks.ingredients"  @change="getDrinks"/>
                <label>Milk</label>
                <input type="checkbox" value="Milk" v-model="drinks.ingredients" @change="getDrinks"/>
                <label>Lemon</label>
                <input type="checkbox" value="Lemon" v-model="drinks.ingredients" @change="getDrinks"/>
                <label>Strawberry</label>
                <input type="checkbox" value="Strawberry" v-model="drinks.ingredients" @change="getDrinks"/>
            </div>
        </form>
        
        <h2>Your Ingredients</h2>
        <p class="ingredient-list" v-for="ingredient in drinks.ingredients">{{ingredient}}</p>

        <div class="one-drink" v-for="drink in drinks.drinkFromIngredients"> <!-- h3, bild för varje drink som finns -->

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
    components: {
    },
    data () {
        return {
            drinks:{
                ingredients: [],
                drinkFromIngredients: [],
                drinkTitles: []
            }
        }
    },
    methods: {
        getDrinks: function(){
            this.drinks.drinkFromIngredients = [];
            for(var i = 0; i < this.drinks.ingredients.length; i++){
                //sparar properties i drinks i variablar för o slippa skriva allt
                console.log("i loop");
                var drinkFromIngredients = this.drinks.drinkFromIngredients;
                var drinkTitles = this.drinks.drinkTitles;
                var ingredient = this.drinks.ingredients[i];

                this.$http.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + ingredient).then(function(data){
                    if (!data.body){    //om det inte fanns nån drink enligt ingridienserna
                        this.drinks.drinkFromIngredients = [];
                    }
                    else if (drinkFromIngredients.length === 0){ //om drinkFromIngredient är tom och det finns drinkar så fyll.
                        console.log("drinksFromIngredients var tom, så fyll");
                           for(var j = 0; j < data.body.drinks.length; j++){
                               drinkFromIngredients.push(data.body.drinks[j]);

                           }
                           //om drinkar enligt ny ingridiens matchar drinkar som finns i array så spara i ny array, byt sedan ut gamla array mot nya.
                    } else { 
                        console.log("jämför array med ny array");
                        var drinksThisIngredient = [];
                        for(var k = 0; k < data.body.drinks.length; k++){
                            if(drinkFromIngredients.find(function(drink){
                                if(drink.strDrink === data.body.drinks[k].strDrink) {
                                    return true;
                                } else {
                                    return false;
                                }
                            })) {
                             drinksThisIngredient.push(data.body.drinks[k]);
                            }
                        }
                        this.drinks.drinkFromIngredients = drinksThisIngredient;
                        console.log(this.drinks.drinkFromIngredients);
                    }
                });
            }
        }
    }
}
</script>

<style>

</style>