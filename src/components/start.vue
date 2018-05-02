<template lang="html">
  <nav id="startpage">
    <router-link to="/drinkname"><div id="first">Search drink by name</div></router-link>
    <router-link to="/ingredients"><div id="second">Search drink by ingredient</div></router-link>
    <router-link to="/randomdrink"><div id="third">Try a new drink</div></router-link>
    <router-link to="/favorites"><div id="fourth">Your favorite drinks</div></router-link>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="scss">

#startpage {
}
nav {
  padding: 0;

  a {
    text-decoration: none;
    color: #fff;
  }

  div {
    display: block;
    width: 100%;
    margin: 0;
    padding: 10px;
    height:50px;
    line-height: 50px;
    text-align: center;
    font-family: 'Montserrat';
    text-transform: uppercase;
  }

  #first {
    background-color: #f2b765;
  }

  #second {
    background-color: #ff91b9;
  }

  #third {
    background-color: #97ecef;
  }

  #fourth {
    background-color: #a0ef92;
  }
}

</style>
