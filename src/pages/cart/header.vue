<template>
<me-navbar  class="cart-header">
<span class="cart-center" slot="center">购物车</span>
<i class="iconfont icon-msg" slot="right"></i>
</me-navbar>
</template>
<script>
import MeNavbar from 'base/navbar';
export default{
     name: "CartHeader",
     components:{
         MeNavbar,
     }
}
</script>
<style lang="scss" scoped>
 
.cart-header {
  &.mine-navbar{ 
    color:#000;
 width:100%;
 font-size:18px;
  border-bottom:1px solid rgb(233, 233, 233);
 .icon-msg{
    font-size:24px;
    color:rgb(170, 169, 169);
}
}
}
.cart-center{
    display:flex;
    justify-content:center ;
}
</style>