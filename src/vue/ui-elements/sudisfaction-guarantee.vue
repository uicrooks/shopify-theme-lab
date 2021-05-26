<template>
<div class="sudisfaction-guarantee">
  <div class="sudisfaction-container">
      <img class="foot-icon" src="https://cdn.shopify.com/s/files/1/0275/7784/3817/files/SquatchFoot.svg?v=1615322349" alt="squatch-foot"/>
      <h6>Sudisfaction Guaranteed</h6>
      <p>Rest easy. If this isn't the best natural product you've ever used, it's on us.</p>
  </div>
</div>
</template>

<script>

export default {

}
</script>

<style scoped lang="scss">
.sudisfaction-guarantee:after{
  content: "";
  width: 100%;
  height: 1px;
  position: absolute;
  background: #e5d0bb;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;
  bottom: 0;
  margin: auto;
}
.sudisfaction-guarantee{
  text-align: center;
  padding: 15px;
  position: relative;
  z-index: 0;

  @media(max-width:325px){
    padding: 0;
  }

  .sudisfaction-container{
    width: 320px;
    background: #fff;
    margin: auto;
    z-index: 4;
    text-align: center;

    h6{
      margin-bottom: 8px;
      margin-top: 12px;
      line-height: 1;
    }

    .foot-icon{
      width: 50px;
    }
  }
}
</style>
