<template>
<me-navbar class="header">
 <i
  class="iconfont icon-back"
  slot="left"
   @click="goBack"
    ></i>
   <span class="icon-detail" slot="center"> 商品详情 </span>
     <i
  class="iconfont icon-cart"
  slot="right"
    ></i>
</me-navbar>  
</template>
<script>
import MeNavbar from 'base/navbar';
export default{
name:'ProductHeader',
components:{
    MeNavbar,
},
methods:{
    goBack(){
       this.$router.back(); 
    }
}

}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

  .header {
    border-bottom: 1px solid $border-color;
      &.mine-navbar { //mine-navbar是子组件<me-navbar />最外层的类  父组件(这里)没有这个类  控制台显示这样的：class="mine-navbar header"
      background-color: $header-bgc-translucent;
    } 
   
  .icon-detail{
      font-size:18px;
      color:#fff;
      @include flex-center();

    // display:block; //用span标签要转为块，用div不需要
    // text-align:center;
  }
  .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>