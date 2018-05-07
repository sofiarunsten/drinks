<template lang="html">
  <div @click="hideMenu(e)" id="grid"> <!-- lägg till klickevent till hideMenu -->
    <div id="logo">
      <h2>DRINKS</h2>
    </div>

    <div id="menu" >
      <img @click="show = !show" src="../img/hamburger2.png" alt="menu icon" class="hamburger">
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
    hideMenu: function(e) {
      if (e.target.matches('.hamburger')) {
        console.log("Hello")
      }
    }
    //om man klickar någon annanstans än på bilden ska
  }
}
</script>

<style lang="scss">
$nav-bg: #fcfbf9;
$dark: #141414;
$text: #fff;
$orange: #f2b765;

#grid {
  background-color: $orange;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "logo menu"
    "navi navi"
  ;
}

  #logo {
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
    padding: 10px;
    grid-area: menu;
    text-align: right;
    img {
      width: 35px;
    }
  }

  nav {
    background-color: $orange;
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
