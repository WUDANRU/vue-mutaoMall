<template>
   <!-- <div>
    hot
  </div> -->
  <div class="hot">
    <h4 class="hot-title">热门搜索</h4>
    <div class="loading-container" v-if="!hots.length">
      <me-loading />
    </div>
    <ul class="hot-list" v-else>
      <li
      class="hot-item"
      v-for="(item,index) in hots"
      :key="index"
      @click="$_search_selectItem(item.hotWord)"
      >{{item.hotWord}}</li>
    </ul>
     <!-- 比如这个关键词：香油    点击会跳转相关的页面，然后需要报存在localstorage本地缓存
     然后能在历史搜索中找到它 -->
    <!--  @click="$_search_selectItem(item.hotWord)" 点击保存该项，吧item.hotword传过去才能知道你保存的是什么 -->
    
    
 <!-- 逻辑：我是从接口来的数据，传进该关键字去点击调用，然后吧关键字去保存在缓存里，然后顺序会排正确，然后storage.set这个代码是存了现在的关键字在缓存了里，存了的给搜索历史用，
 写了的这个跳转淘宝页面的代码location.href，搜索历史也可以用，热门推荐也用到了 -->

  </div>
</template>
 
<script>
  import MeLoading from 'base/loading';
  import {getSearchHotKeyword} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';



  export default {
    name: 'SearchHot',
    components: {
      MeLoading
    },
    //mixins这个固定的，写不对会报错: $_search_selectItem is not defined/ not a function
    mixins: [searchMixin],//mixins可以被复用，这里可以写多个mixin, 不止只写这一个
    created(){
      this.getHotKeyword().then(()=>{//调用下面的resolve()是可以执行这里的then

        this.$emit('loaded'); //因为这里用了then(then后面返回了Promise对象，因为this.$emit('loaded')返回Promise对象)，所以下面要return (return getSearchHotKeyword)
     
     })  // 成功之后派发一个事件this.$emit('loaded')，告诉你我已经成功加载完毕了，这样你就可以在外面更新滚动条了，这里还没有更新滚动条

    },
    data(){
      return{
        hots:[]
      }
    },
    methods:{
      getHotKeyword(){
        return getSearchHotKeyword().then(data=>{ //这里的return是因为这个 this.getHotKeyword()后有.then(()
        return new Promise(resolve=>{ 
           if(data){
             this.hots=data;
             resolve();
           }
         })
        })//return new Promise这个是异步对象
      },
      }
  };
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

  .hot {
    padding-left: 10px;
    background-color: #fff;
    border-bottom: 1px solid $border-color;
    margin-bottom: 10px;

    &-title {
      height: 34px;
      line-height: 34px;
      font-size: $font-size-l;
      font-weight: bold;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
    }

    &-item {
      padding: 8px;
      background-color: #f0f2f5;
      border-radius: 4px;
      margin: 0 10px 10px 0;
      color: #686868;
    }
  }

  .loading-container {
    padding: 10px 0;
  }
</style>
