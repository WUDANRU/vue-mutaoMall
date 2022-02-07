<template>
  <transition name="search">
    <div class="search">
    <header class="g-header-container">
        <search-header @query="getQuery" />  <!-- @query="getQuery"是由search/header.vue传过来的 -->
    </header>
    <div class="g-content-container">
      <me-scroll ref="scroll">
       <search-hot @loaded="loaded" ref="scroll" v-show="!query" />  <!-- 在当前文件中的query是拿data里的，data里的query是拿<search-header>(search/header.vue)的 -->
       <search-history  @remove-item="updateScroll" v-show="!query" @show-confirm="showConfirm" ref="history"  />
       <search-result :query="query" v-show="query"  />  <!-- query指的是输入的内容，如果有内容显示搜索结果页，如果没有内容显示热门推荐页和历史搜索页 -->
      </me-scroll>
    </div>
    <!-- <me-confirm> 就是一个占据全屏的弹出框，占据全屏不能写在里面的div，写在外面 -->
    <me-confirm msg="确定要清空吗" ref="confirm" @confirm="clearAllSearchHistorys" />
  </div>  
  </transition>
  <!-- transition标签 表示作动画效果 -->

  <!-- name="search" name定义过渡类名 例如：name: 'fade' 将自动拓展为.fade-enter，.fade-enter-active等。 -->
  <!--  样式类名:  .search        过渡类名:  .search-enter-active, .search-leave-active -->

<!-- 

v-enter：定义进入过渡的开始状态

v-enter-active：定义进入过渡生效时的状态

v-enter-to: 定义进入过渡的结束状态

v-leave: 定义离开过渡的开始状态

v-leave-active：定义离开过渡生效时的状态

v-leave-to:  定义离开过渡的结束状态

 -->

</template>

<script>
  import MeScroll from 'base/scroll';

  // 因为这个我刚刚自由练习的代码显示不正确
  import MeConfirm from 'base/confirm'; // 吧search全部的代码粘贴过来会报错，粘贴过来因为这个会报错，要先注释掉，会显示未找到此依赖项：*base/confirm in./node_modules/babel loader/lib！。

  import SearchHeader from './header';
  import SearchHot from './hot'; //热门推荐
  import SearchHistory from './history'; //搜索历史
  import SearchResult from './result'; //搜索结果

  export default {
    name: 'Search',
    data(){
      return{
        query:'',
      }
    },
    components: {
      MeScroll,
      MeConfirm,
      SearchHeader,
      SearchHot,
      SearchHistory,
      SearchResult
    },
   
    methods:{ //show()和clear(),update()都是api
      showConfirm(){
        this.$refs.confirm.show();//调用(confirm/index.vue)弹出框的show方法
    console.log('71',this.$refs.confirm)
    },
      clearAllSearchHistorys(){
        this.$refs.history.clear(); // ref="history" 调用一个clear接口，调用之后就吧它删掉了  // 删完之后不可能手动更新，让它自动更新一下
        this.$refs.history.update(); //  删完之后不可能手动更新，自动更新一下  这个是点击确定清空搜索历史的弹出框再去更新搜索历史的，自动更新没有内容是显示不出搜索历史  不是confirm/index.vue的弹出框也不是confirm/index.vue的x
     },
      getQuery(query){
      this.query=query // this.query是data里的query, =后的query是search/header.vue传出来的query
    },
    updateScroll(){
      this.$refs.scroll.update();  // <search-history @remove-item="updateScroll">, 当点击的历史搜索有很多li内容，滚动条如果没有更新，有一些li内容会被隐藏，但是还是没有效果，因为热门搜索也需要更新滚动条，两个区块都在同一个页面
    },                             // 当我点击了搜索历史的x去删除li的时候，它并不能正确更新(滚动条高度超出了)，因为×有动画效果 点击×之后并不是立马就更新动画了，点击之后却立马更新滚动条了
    loaded(){
      this.$refs.scroll.update(); // 热门搜索块的滚动条更新/热门搜索块的高度更新
     } 
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .search {
    // background:pink;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $search-z-index;
    background-color: $bgc-theme;
  }
  .search-enter-active,
  .search-leave-active {    
      transition: all 0.3s;
  }

 //吧它移出去 0表示不变化
  .search-enter,
  .search-leave-to {
     transform: translate3d(100%, 0, 0);
  }
</style>
