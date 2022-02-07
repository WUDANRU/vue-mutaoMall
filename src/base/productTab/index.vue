<template>
  <div class="product-tab" v-if="sliders.item">
    <!-- <div class="product-tab-icon">  -->
    <a class="product-tab-iconfont" >
      <i class="iconfont icon-dianpu"></i>
      <span>店铺</span>
    </a>
    <a class="product-tab-iconfont" >
      <i class="iconfont icon-kefu"></i>
      <span>客服</span>
    </a>
    <a class="product-tab-iconfont" >
      <i class="iconfont icon-shoucang"></i>
      <span>收藏</span>
    </a>
    <!-- </div> -->
    <!-- <div  class="product-tab-font"> -->
    <a  class="product-tab-cart product-tab-cart-car">加入购物车</a>
    <a  class="product-tab-cart product-tab-cart-go">马上抢</a>
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: "productTab",
  props: {
    sliders: {
      type: [Array, Object],
      default() {
        return [];
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.product-tab {
  border-top: 1px solid #ccc;
  height: 50px;
  display: flex;
  position:fixed;
width:100%;
bottom:0;
left:0;
z-index:1000;
background:#fff;

  &-iconfont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    span {
      padding-top: 3px;
    }
  }
  &-cart {
    display: flex;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 26%;
    font-size: 15px;
    color: #fff;
  }
  .product-tab-iconfont{
    i{
font-size:22px;
    }
  }
  .product-tab-cart-car {
    background: rgb(243, 159, 3);
  }
  .product-tab-cart-go {
    background: rgb(238, 53, 115);
  }
}
</style>