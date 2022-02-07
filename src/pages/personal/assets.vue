<template>
  <div class="personal-assets">
    <div class="personal-assets-icon">
        <i class="iconfont icon-wodezichan"></i>
        <span class="i-font">我的资产</span>
    </div>
    <div class="line"></div>
    <div class="personal-assets-line">
      <div class="assets">
        <span class>现金券</span>
      </div>
      <div class="assets">
        <span class>红包</span>
      </div>
      <div class="assets">
        <span class>余额</span>
      </div>
      <div class="assets">
        <span class>礼品卡</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalAssets"
};
</script>

<style lang="scss" scoped>
.personal-assets {
 
 font-size: 14px;
  background: #fff;
  padding: 10px 0;
  margin-bottom: 10px;
}
.personal-assets-icon{
   display: flex;
   align-items: center;
   justify-content:flex-start;
   padding-left:10px;
}
.icon-wodezichan {
  color:rgb(184, 184, 184);
font-size: 26px;
  
}
.i-font{
 padding-left:6px;
 font-size: 16px;
  font-weight: bolder;
  }
.personal-assets-line {
  padding-left: 10px;
  display: flex;
  justify-content: space-around;
  .assets {
    flex-direction: column;
  }
}
.line {
  width: 100%;
  border: 0.5px solid rgb(235, 235, 235);
  margin: 10px 0;
}
</style>