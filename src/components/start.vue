<template lang="html">
  <nav id="startpage">

    <router-link to="/drinkname">
      <div id="first" class="section-grid">
        <div class="left">
          <img src="src/img/drink1.png">
        </div>
        <div class="right">
          <p> Search by name</p>
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
          <p>Favorite drinks</p>
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


#startpage {
  padding: 0;
  margin: 0;
  box-sizing: border-box;

  img {
    height: 50px;
  }

  a {
    text-decoration: none;
    color: #fff;
  }

  div {
    font-family: 'Montserrat';
    text-transform: uppercase;


    p {
      display: inline;
      font-size: 14px;
      line-height: 60px;
    }
  }

  #first {
    background-color: $orange;
  }

  #second {
    background-color: $pink;
  }

  #third {
    background-color: $blue;
  }

  #fourth {
    background-color: $green;
  }

  .section-grid {
    display: grid;
    grid-template-columns: 18% 1fr;
    grid-template-areas:
    "left right"
    ;
    margin: 15px;
    padding: 10px;
    height: 60px;

    .left {
      grid-area: left;
      text-align: right;
    }

    .right {
      grid-area: right;
      text-align: center;
    }
  }
}

</style>
