<template>

  <me-navbar class="header" v-show="visible">
    <i class="iconfont icon-scan" slot="left"></i>
    <!-- <div slot="center">搜索框</div> -->
    <me-search-box
    placeholder="开学季有礼，好货5折起"
    slot="center"
    fake
    @query="getQuery"
    @click.native="goToSousuo"

      /> <!-- 有真假两个同类名的搜索框，希望用虚晃的搜索框 -->

    
<!-- @click.native @click不用在自定义的标签上，如果要用需要加native表示原生的点击事件 -->  
<!-- 这里搜索框点击跳转到搜索页没有用router-link标签用了@click -->

    <i class="iconfont icon-msg" slot="right"></i>
  </me-navbar>
 <!-- placeholder="开学季有礼，好货5折起" 这里有文字是文字不能加冒号 -->
</template>

<script>
  import MeNavbar from 'base/navbar';
  import MeSearchBox from 'base/search-box';

  export default {
    name: 'HomeHeader',
    components: {
      MeNavbar,
      MeSearchBox
    },
    data() {
      return {
        visible: true
      };
    },
    methods:{
       // API
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      getQuery(query){
        console.log(query) //每输入一个字母console会显示一次,后面search-box/index.vue写了fake,光标不会显示了
      },
      goToSousuo(){
        this.$router.push('/search') //地址栏会多一个/search
      }
    }
    
// 节流函数
//  短时内触发多次取消上一次触发的，提高性能，取消短时间内每触发一次向服务端发送数据


  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .header {
    &.mine-navbar {
      /*background-color: $header-bgc-translucent; */
      background-color: transparent;
      transition: background-color 0.5s;
    }

    &.header-transition {
      background-color: $header-bgc-translucent;
    }

    .iconfont {
      color:$icon-color-default;
      font-size: $icon-font-size;
    }
  }

</style>
