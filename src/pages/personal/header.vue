<template>
  <me-navbar class="header">
    <!-- <span class="header-mutao" slot="left"></span> -->
<div class="header-mutao" slot="center">
       <span></span>
        <span class="memutao" >我的慕淘</span>
    <span class="header-position">
      <i class="iconfont icon-scan"></i>
      <i class="iconfont icon-msg"></i>
    </span>
   </div>
  
  </me-navbar>
</template>
<script>
import MeNavbar from "base/navbar";

export default {
  name: "PersonalHeader",
  components: {
    MeNavbar
  }
};
</script>
<style lang="scss" scoped>
 
.header {
  &.mine-navbar{ 
      background: rgb(212, 4, 4);
    color:#fff;
}
}
.header-mutao{
  display:flex;
 justify-content: space-between;
 align-items: center;
 font-size:18px;
}
.memutao{
 display:flex;
 padding-left:50px;
justify-content: center;
}
  .iconfont{
margin-left:3px;
font-size:22px;
  }
</style>