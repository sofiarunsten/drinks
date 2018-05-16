<template lang="html">
  <div id="favorites">
    <button v-on:click="goBack">Go back</button>
    <div class="one-drink" v-for="drink in this.$favorites">
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
    }
  },
  methods: {
    goBack: function() {
      this.$router.go(-1);
    }
  }
}
</script>

<style lang="scss">
</style>
