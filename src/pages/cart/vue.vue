<template>
    <div class="slider-baozhang" @click="baozhang">   <!-- v-for="(first,bao) in baozhang" -->
<span class=""><span class="baozhang-font">保障</span><span>假一赔四 · 破损包退 · 上门取退 · 极速退款</span></span> <i class="iconfont icon-jinru"></i>
</div> 
</template>
<script>
export default{
    name:'VueVue',
    methods: {
      baozhang() {
        this.$emit('vuevue');
      }
    }
}
</script>
<style lang="scss" scoped>
.slider-baozhang{
  display:flex;
  justify-content: space-between;
  align-items: center;
  height:40px;
  background: #fff;
  margin:10px 0;
  padding:0px 10px;
  font-size:12px;
}
.baozhang-font{
  font-size:14px;
color:rgb(180, 179, 179);
padding-right:10px;
}
</style>