<template>
  <div class="mine-search-box-wrapper">    <!-- search/header.vue和home/header.vue为什么这两个文件一个点击显示有效果，一个没有效果，是因为: 有加或没加fake的就分别使用v-if="fake"和v-if="!fake"这两个下的class="mine-search-box" --> 
     <i class="iconfont icon-search"></i>   <!-- search/header.vue和home/header.vue都有这个自定义标签: <me-search-box>,两个文件只有一个可以在这个自定义标签上加fake -->
     <div class="mine-search-box" v-if="fake">{{placeholder}}</div>  <!-- placeholder需要这样写 -->
    <!-- <div class="mine-search-box" v-if="fake"></div> 这个搜索框是虚晃，写了fake,光标不会显示了 -->
    <input
      class="mine-search-box"
      type="text"
      title="搜索框" 
      :placeholder="placeholder"
      ref="input"
      v-model="query"
      v-if="!fake"
     > <!-- 这个搜索框是真的，没有用这个，用上面一个搜索框，因为首页的输入框需要一个不能输入内容并且跳转到搜索页的搜索框 -->
    <i
      class="iconfont icon-close"
      v-show="query"
      @click="reset"
    ></i> <!-- 输入内容会显示×，点击×的时候会把输入的内容删除，然后获取焦点 -->
  </div> <!-- v-show="query" 这里的query也跟input是双向数据绑定，因为写了v-model  -->  <!--  v-show="query" 标志位控制× 输入内容显示×，没有输入内容隐藏× -->

   <!-- 有input要想到v-model ( 双向数据绑定 ) 取名query 在data里定义query  -->
   <!--  双向数据绑定: 输入框的值发生变化，query会相应的发生变化，query发生变化，输入框的值会相应的发生变化 <input v-model="query" />    -->
</template>

<script>
import {debounce} from 'assets/js/util.js';
  export default {
    name: 'MeSearchBox',
    props:{
      placeholder:{
        type:String,
        default:'请输入搜索内容'
      },
      fake:{
        type:Boolean,
        default:false
      }
      },
      data(){
        return{
         query: ''
        }
      },
      //只写了一次监听query
      watch:{ //debounce这个节流函数包裹着的是一个函数

      query: debounce(function(){
        // console.log(this.query) 
      this.$emit('query',this.query) //this.query说明是用了data里的query
        // query(){
        //   this.$emit('query',this.query) //query事件，吧this.query传出去，在home/header.vue文件接收 @query="getQuery" ,后面的search/header.vue文件也接收到了 @query="query"
          // query是输入的内容，监听它，向外/向服务端发送输入的内容，获取跟输入内容联动的数据
        }),
      },
      methods:{ 
        focus(){ // 光标是怎么显示的,因为这个代码: this.$refs.input&&this.$refs.input.focus();会显示光标,跟reset(){ this.focus() }的this.focus();没有关系
          this.$refs.input&&this.$refs.input.focus(); //触发时会显示光标  
        },
        clear(){
         this.query = '';//清除就是吧query置为空 //这个query是data的
        },
        reset() { // <i class="iconfont icon-close" v-show="query" @click="reset"></i></i>这个代码的意思是输入query显示的是x图标，没有输入query就不会显示x图标

        this.clear();//要加this
        this.focus();
      }
      }
    
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  $search-box-height: 30px;

  .mine-search-box-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: $search-box-height;
    padding: 0 7px;
    background-color: #fff;
    border-radius: $search-box-height / 2;
  }

  .iconfont {
    color: $icon-color;
    font-size: $icon-font-size-sm;
    font-weight: bold;
  }

  .mine-search-box {
    flex: 1;
    background: none;
    border: none;
    margin: 0 6px;
    color: #666;
    line-height: 1.5;
  }
</style>
