<template>
  <me-navbar class="header">   
    <!-- <div slot="center">搜索框</div> -->
    <me-search-box 
    placeholder="开学季有礼，好货5折起"
    slot="center"
    fake 
    @click.native="goToSearch"
    />
     <i class="iconfont icon-msg" slot="right"></i> <!-- slot里写left/right/center是对标签起左右，居中的作用，对文字不起作用 -->
  </me-navbar>

  <!-- <me-search-box @click.native="goToSearch"  这个click不能写在自定义的标签上 如果写了要加native，表示原生-->
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchBox from 'base/search-box';

  export default {
    name: 'CategoryHeader',
    components: {
      MeNavbar,
      MeSearchBox
    },
    methods:{
       goToSearch(){
        this.$router.push('/search')
      }
    }
      
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .header {
    &.mine-navbar {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color: $icon-color-default;
      font-size: $icon-font-size;
    }
  }
</style>
