<template>
  <!-- <div>
    history
  </div> -->
   <div class="history" v-if="historys.length"> <!-- 有数据才渲染，这里不是异步数据，如果是异步数据，要等有数据才渲染，不然会出错 -->
    <h4 class="history-title">历史搜索</h4>
    <transition-group class="g-list" name="list" tag="ul">
      <li class="g-list-item" 
      v-for="item in historys"
      :key="item"
      @click="$_search_selectItem(item)"
      >     <!--  @click="$_search_selectItem(item)" 点击保存该项，吧item传过去才能知道你保存的是什么 -->
        <span class="g-list-text">{{item}}</span>
        <i
        class="iconfont icon-delete"
        @click.stop="removeItem(item)"
        ></i>  <!-- 点击x的时候动画效果是这个文件的css样式写的代码，可以看最底部的代码    iconfont icon-delete是x图标 -->
       </li>   <!--  如果这个@click.stop="removeItem(item)"上面的li标签没有@click，可以不加.stop -->
    </transition-group>
    <a 
    href="javascript:;" 
    class="history-btn"
    @click="showConfirm"
    >
      <i class="iconfont icon-clear"></i>清空历史搜索</a>
  </div>
<!-- @click="$_search_selectItem(item)"这个搜索历史跟热卖推荐写的一样的名，共用的 -->

<!-- :key="item" key只能放字符串或者数字，item是字符串 key的作用更新当前所在的li标签 -->
<!-- 显示的跟保存的是一样的：<span class="g-list-text">{{item}}</span>   @click="$_search_selectItem(item)"  要吧item放进来，你要保存的就是item -->

<!--@click.stop="removeItem(item)" 吧item传进去，点击×删除该关键字  stop禁止冒泡，不写stop会i 向上冒泡到 li

@click="showConfirm" 不直接删除,直接删除是危险操作

 history.vue的类名 g-list 我们使用的是全局的list，因为
搜索历史跟搜索结果的很相似就使用全局的(样式写了_list.scss)  -->

<!-- 点击之后如何删除单个项目 -->

<!--   要对li加transition动画效果，li 不止一个 不能加transition,ul里面不能是transition，所以吧ul标签改为transition-group 
       tag="ul" 指定标签就会转换成相应的标签    name 可以写过渡类名    


  逻辑: 热门推荐跟历史搜索都分别有自己的模板渲染出来的内容，所以需要用到 mixins: [searchMixin]   @click="$_search_selectItem(item)"
  data(){ return{ historys:[] }} 这个historys的值从这个代码来，但是它现在是空的: getKeyword(){ this.historys=storage.get(SEARCH_HISTORY_KEYWORD_KEY,[]) }

  historys的值是在storage.set这里拿到的，之前都是空的，如果删除关键字，我会拿到现在的值，如果没有删除，我也会拿到现在的值:
  removeItem(item){ this.historys=this.historys.filter(val=>val!==item) storage.set(SEARCH_HISTORY_KEYWORD_KEY,this.historys) }

// 这个mixins[searchMixin] 是从localStorage本地缓存中拿到的值
-->
</template>

<script>
  import storage from 'assets/js/storage'; //从storage获取数据
  import {SEARCH_HISTORY_KEYWORD_KEY} from './config';
  import {searchMixin} from 'assets/js/mixins';
  export default {
    name: 'SearchHistory', 
    mixins: [searchMixin], //是热门推荐的代码要点击热门推荐页面的关键字，是搜索历史的代码要点击搜索历史页面的关键字
    data(){                
      return{
        historys:[]// 数组保存着我们的历史记录  本地缓存的数组值
      }
    },
    created(){
      // console.log(this.historys) //这里是显示不出内容的 不写this,会显示 historys is not defined
      this.getKeyword();
    },
    methods:{
    
      update(){ // 这个是点击确定清空搜索历史的弹出框再去更新搜索历史的，自动更新没有内容显示不出搜索历史
        this.getKeyword() //  删完确定清空的弹出框之后不可能手动更新，让它自动更新一下，就是再读取一遍就可以了 //  update就是这里的getKeyword，直接调用 
      }, //  update一开始是没有拿到这个this.getKeyword()的值，后面才拿到的，在storage.set这里拿到
      getKeyword(){
        // console.log(this.historys) 这里是显示不出内容的

        this.historys=storage.get(SEARCH_HISTORY_KEYWORD_KEY,[])  //通过localstorage拿到的跟搜索历史的key对应的值

        console.log(this.historys) //这里显示搜索历史的内容  如何判断upadate跟谁有比较近的关系，可以去打印谁 
        // 这里的这个代码它是在storage.set(SEARCH_HISTORY_KEYWORD_KEY,this.historys)它写了的时候拿到值的
      },

      removeItem(item){
       this.historys=this.historys.filter(val=>val!==item) //删除该关键字   保留不相等的 当我删除搜索历史的时候，我会保留跟要删除的(item)不相等的
       storage.set(SEARCH_HISTORY_KEYWORD_KEY,this.historys)

       setTimeout(()=>{ 
         this.$emit('remove-item',item) //因为×有动画效果 点击×之后并不是立马就更新动画了，点击之后却立马更新滚动条了
          
       },101) //动画是延时100毫秒(动画效果)，setTimeout也延时100毫秒，100毫秒之后执行删除li(删除动画效果)并且更新滚动条
      
      }, //this.$emit('remove-item',item)  删完一条li需要更新滚动条  //吧item传出去  这个是点击x删除的

      showConfirm(){
        this.$emit('show-confirm');//用在了search/index.vue文件
      },
      clear(){  // clear和update是api 这个clear和js/storage.js的clear不一样的   //search/index.vue的this.$refs.history.clear();  clear挂在this.$refs.history上，说明clear是api
        // console.log('1');
        storage.remove(SEARCH_HISTORY_KEYWORD_KEY);//storage.remove()是storage.js文件的方法
      }
    }
  };
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

  .history {
    padding-bottom: 30px;
    background-color: #fff;

    &-title {
      height: 34px;
      line-height: 34px;
      padding: 0 10px;
      font-size: $font-size-l;
      font-weight: bold;
    }

    &-btn {
      @include flex-center();
      width: 80%;
      height: 40px;
      background: none;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 0 auto;
      color: #686868;

      .iconfont {
        margin-right: 5px;
      }
    }
  }

  .g-list {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    margin-bottom: 20px;
  }

  
.list {// height 0.1s;  height: 0;  高度在100毫秒内(0.1s)吧它变为0

    &-enter-active,
    &-leave-active {
      transition: height 0.1s;//高度在100毫秒内(0.1s)
    }
    

    &-enter,
    &-leave-to {
      height: 0;//吧它变为0
    }
  }

</style>
