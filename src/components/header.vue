<template lang="html">
  <div id="grid">
    <div id="logo">
      <h2>DRINKS</h2>
    </div>

    <div id="menu" >
      <img @click="show = !show" src="../img/hamburger.png" alt="menu icon">
    </div>

    <transition name="fade">
      <nav v-if="show">
        <ul>
          <li><router-link to="/">Home</router-link></li> <!--router-link istället för a för att det inte uppdaterar sidan, vilketa gör-->
          <li><router-link to="/drinkname">Search drink by name</router-link></li>
          <li><router-link to="/ingredient">Search drink by ingredient</router-link></li>
          <li><router-link to="/randomdrink">Get a random drink</router-link></li>
          <li><router-link to="/favorites">Your favorite drinks!</router-link></li>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
$nav-bg: #fcfbf9;
$dark: #fff;
$text: #97ecef;

#grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "logo menu"
    "navi navi"
  ;
}

  #logo {
    background-color: $dark;
    padding-left: 10px;
    grid-area: logo;
    h2 {
      font-family: 'Montserrat';
      font-weight: 300;
      line-height: 50px;
      color: $text;
    }
  }

  #menu {
    background-color: $dark;
    padding-right: 10px;
    grid-area: menu;
    text-align: right;
    img {
      width: 40px;
    }
  }

  nav {
    background-color: $dark;
    padding: 0 10px;
    grid-area: navi;

    ul:first-child {
      margin-top: 10px;
    }
    ul {
      list-style-type: none;
      text-align: right;
      margin: 0 auto;

      li {
        margin-bottom: 15px;
        a {
          color: $text;
          text-decoration: none;
        }
      }
    }
  }


  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
