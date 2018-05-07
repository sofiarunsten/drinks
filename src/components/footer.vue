<template lang="html">
  <div id="footer">
    <p>The app is using an API from TheCocktailDB</p>
    <p>thecocktaildb.com</p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
$orange: #f2b765;
$light-orange: #f9cc8e;
$pink: #ff91b9;
$blue: #97ecef;
$green: #a0ef92;
$details: #fff;


#footer {
  width: 100%;
  background-color: $green;
  position: absolute;
  bottom: 0;
  left: 0;
  color: $details;
  padding: 10px;
  font-size: 9px;
  text-align: center;
}
</style>
