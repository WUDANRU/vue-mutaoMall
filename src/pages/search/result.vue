<template>
  <!-- <div>
    result
   </div> -->            <!-- 热门搜索的接口是热门li的关键字，然后点击跳转的是mixins.js文件下的淘宝接口 -->
   <div class="result">  <!-- 这个文件的接口是输入关键字返回的关键字接口，然后点击这个文件的li跳转的是mixins.js文件下的淘宝接口 -->
    <div class="loading-container" v-show="loading"> <!-- 有loading显示这个 loading默认是false,但是loading会显示有时候不会显示，显示跟不显示分几个阶段，用v-show,   v-if，v-else就比较简单，不需要分几个阶段 -->
      <me-loading />
    </div>
    <ul class="g-list" v-show="!loading&&results.length"> <!-- 没有loading有值显示这个 -->
      <li class="g-list-item" 
      v-for="(item,index) in results" 
      :key="index" 
      @click="$_search_selectItem(item[0])"
      > 
       <!-- 我点击的时候拿到的是服务端的数据然后按一定顺序保存在本地缓存里，然后渲染到了搜索历史块(搜索历史页面)   按一定顺序的代码是两次输入同样的内容时是有作用的-->
       <!-- @click="$_search_selectItem(item[0])" item[0]是输入query然后返回的对应的后端数据 当我点击li标签的时候会保存在本地缓存里 -->

        <span class="g-list-text">{{item[0]}}</span>
      </li>
    </ul>
    <div class="no-result" v-show="!loading&&!results.length" >没有结果</div> <!-- 没有loading没有值显示这个没有结果 -->
  </div>

<!-- 这个搜索结果的页面没有传入query是显示搜索历史和热卖推荐的页面，如果传入query才会显示搜索结果页面   搜索历史和热卖推荐的页面指，一个页面两个区块 -->

<!-- @click="$_selectItem(item)" 这个item并不是字符串，是数组,数组的第0个才是我们所需要的  @click="$_search_selectItem(item[0])"  -->

</template>

<script>
  import MeLoading from 'base/loading';
  import {getSearchResult} from 'api/search';
  import {searchMixin} from 'assets/js/mixins';
  export default {
    name: 'SearchResult',
    components: {
      MeLoading
    },
    props:{
      query:{
       type:String,
       default:'',
      }
    },
    data(){
      return{
       results:[],
       loading:false,
      }
    },
    mixins:[searchMixin],
    // created(){ //原来是这样的，因为props接收了query,需要吧created换成watch
    //   this.getResults(); 
    // },
    watch:{ //每监听一次调用一下
      query(query){
       this.getResults(query)
      }
    },
    methods:{
      getResults(keyword){ //我们这里并不知道query是什么，所以写了search/index.vue文件的<search-result :query="query">由当前文件接收变量query，现在query是keyword了
        if(!keyword){ //query是keyword
          return; //不能翻译为: 如果没有内容就返回,翻译为: 获取不到输入的内容就返回/获取不到传进来的值就返回
        }
      this.loading=true; //keyword有传进来了: getResults(keyword)，获取到输入的内容就显示loading/获取到传进来的值就显示loading
      getSearchResult(keyword).then(data=>{
        if(data){
          this.results=data;
          this.loading=false; //获取到数据的时候，loading就消失
          // console.log(this.results) //这个才有内容 results是数组
          // console.log(this.data) //这个显示undefined  
        }
      })

      }
    }
    
  };
</script>

<style lang="scss" scoped>
</style>
