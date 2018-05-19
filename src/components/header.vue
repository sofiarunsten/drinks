<template lang="html">
  <div id="header"> <!-- lägg till klickevent till hideMenu -->
    <div id="logo">
      <router-link to="/"><h2>cocktails</h2></router-link>
    </div>

    <nav>
      <ul>
        <router-link to="/drinkname"><li>name</li> <div class="testing"></div></router-link>
        <router-link to="/ingredients"><li>ingredient</li><div class="testing"></div></router-link>
        <router-link to="/randomdrink"><li>random</li><div class="testing"></div></router-link>
        <router-link to="/favorites"><li>favorites</li><div class="testing"></div></router-link>
      </ul>
      <div id="line"></div>
    </nav>

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
$orange: #f2b765;
$background: #f9f7f7;
$pink: #ff91b9;
$blue: #97ecef;
$green: #a0ef92;
$dark-blue: #3fb8ba;


#header {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  text-align: center;


  a {
    text-decoration: none;
  }

  #logo {
    font-family: 'Playfair Display';
    margin-bottom: 10px;

    a {
      color: $pink;
    }
  }

  nav {
    font-family: 'Montserrat';
    margin-bottom: 15px;
    font-size: 12px;
    position: relative;
    display: inline-block;

    a {
      color: $green;
      margin-right: 10px;
    }

    a:last-child {
      margin-right: 0;
    }

    ul {
      list-style-type: none;
      display: inline-block;
      width: 240px;

      li {
        display: inline;
      }

      .router-link-exact-active {
        position: relative;
      }

      .testing {
        display: none;
      }

      .router-link-exact-active .testing {
        height: 1.5px;
        display: inline-block;
        background-color: $dark-blue;
        z-index: 9;
        position: absolute;
        top: 18px;
        left: 0;
        width: 100%;
      }
    }

    #line {
      width: 240px;
      height: 1.5px;
      background-color: $blue;
      display: inline-block;
      position: absolute;
      top: 18px;
      left: 0;
      }
  } //end nav
} //end header


</style>
