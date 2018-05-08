<template lang="html">
  <nav id="startpage">

    <router-link to="/drinkname">
      <div id="first" class="section-grid">
        <div class="left">
          <img src="src/img/drink1.png">
        </div>
        <div class="right">
          <p> Search drink by name</p>
        </div>
      </div>
    </router-link>

    <router-link to="/ingredients">
      <div id="second" class="section-grid">
        <div class="left">
          <img src="src/img/drink2.png">
        </div>
        <div class="right">
          <p>Search by ingredient</p>
        </div>
      </div>
    </router-link>

    <router-link to="/randomdrink">
      <div id="third" class="section-grid">
        <div class="left">
          <img src="src/img/drink4.png">
        </div>
        <div class="right">
          <p>Try a new drink</p>
        </div>

      </div>
    </router-link>

    <router-link to="/favorites">
      <div id="fourth" class="section-grid">
        <div class="left">
          <img src="src/img/drink3.png">
        </div>
        <div class="right">
          <p>Your favorite drinks</p>
        </div>

      </div>
    </router-link>

  </nav>
</template>

<script>
export default {
}
</script>

<style lang="scss">
$orange: #f2b765;
$pink: #ff91b9;
$blue: #97ecef;
$green: #a0ef92;


* {
  box-sizing: border-box;
}
#startpage {
  padding: 0;

  img {
    height: 50px;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  div {
    display: block;
    width: 100%;
    margin: 0;
    height: 70px;
    line-height: 50px;
    font-family: 'Montserrat';
    text-transform: uppercase;

    p {
      display: inline;
      line-height: 70px;
    }
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
    background-color: $green;
  }

  .section-grid {
    display: grid;
    grid-template-columns: 25% 1fr;
    grid-template-areas:
    "left right"
    ;

    .left {
      grid-area: left;
      text-align: right;
      padding: 10px;
    }

    .right {
      grid-area: right;
    }
  }
}

</style>
