<template>
  <!-- <div>
    content
  </div> -->
  <div class="content-wrapper">
    <div class="loading-container" v-if="isLoading" > <!-- 这里可以写v-if/v-show 这里的isLoading是分几个阶段，有时显示，有时隐藏 -->
      <!-- <me-loading/>  -->
      <div class="loading-wrapper">
        <me-loading />
      </div>
    </div>
    <me-scroll ref="scroll" @scroll-end="scrollEnd" >
      <div class="content">  <!-- 不能在这个div写v-if(如果有值): 返回的数据是对象，里面拿到的数据有点不同   v-if和v-for是不能一起用的，会报错，没有写v-for的就写v-if -->
        <!-- 不加这个v-if="content.banner"会显示不出loading和Cannot read property 'linkUrl' of undefined" 无法读取未定义的“linkUrl”属性 -->
        <div class="pic"  v-if="content.banner" >  <!--  v-if="content.banner" 意思是如果有值，因为数据是对象，因为这里是异步数据得到的，之前是写v-if="data.length",因为数据是数组 -->
          <a :href="content.banner.linkUrl" class="pic-link">
            <img  @load="updateScroll" :src="content.banner.picUrl" alt="" class="pic-img">
          </a>
        </div>
         <div class="section" v-for="(section, index) in content.data" :key="index"  > 
          <h4 class="section-title">{{section.name}}</h4>
          <ul class="section-list">
            <li
              class="section-item" v-for="(item, i) in section.itemList" :key="i" >
              <a href="" class="section-link">
                 <p class="section-pic" v-if="item.picUrl"> <!-- v-if(如果有值)  没有写v-for的就写v-if v-if和v-for两个只能用一个 -->
                  <img v-lazy="item.picUrl" alt="" class="section-img" />
                </p>
                <p class="section-name">{{item.name}}</p >
              </a>
            </li>
          </ul>
        </div>
      </div>
    </me-scroll>
    <!-- 滚动条跟异步数据有关系，但是内容设置了高度，同步还是异步就没关系了，滚动条在加载前计算了一个高度，设置了内容高度，滚动条就不需要更新，没有设置内容高度，滚动条就给撑开了，需要更新滚动条，重新计算滚动条高度 -->
    <!-- 加 @load="updateScroll"更新滚动条的原因 -->
    <!-- 首页的高度设为183了，内容加载完scroll能得到它的高度 -->
    <!-- class="section-img"有设置高度 class="pic-link"这个没有设置高度 图片加载完scroll不能正确获取到它的高度，所以需要更新滚动条 -->


<!-- <me-scroll ref="scroll" @scroll-end="scrollEnd" >  scroll-end是me-scroll这个组件传过来的  -->
<!--  @load="updateScroll" load是固定的写法 -->

    <div class="g-backtop-container">
      <me-backtop @backtop="backToTop" :visible="isBacktopVisible"/>
    </div>
  </div>
</template>  

<script>
  import MeLoading from 'base/loading';
  import MeScroll from 'base/scroll';
  import MeBacktop from 'base/backtop';
  import {getCategoryContent} from 'api/category';
  import storage from 'assets/js/storage';
  import {CATEGORY_CONTENT_KEY, CATEGORY_CONTENT_UPDATE_TIME_INTERVAL} from './config';

  export default {
    name: 'CategoryContent',
    components: {
      MeLoading,
      MeScroll,
      MeBacktop
    },
    props:{//curId这个是从父组件传来的变量所以写在props里，如果是自己的变量写在data里 // 像swiper的api变量名他可以写在自己的data里，但是他不需要时刻渲染，它可以分离出去，写在data反而是浪费
    curId:{                                           //props是父组件传过来的变量，不是自己的变量
     type:String,
     default:'',// 这个默认是空，props是从父组件传来了值 值是tab和content的id相等了，然后监听id,吧监听到的id传给接口，接口返回跟id对应的数据内容
   }            //  curId(id)  this.getContend(id) getCategoryContent(id)  ,id参数是通过监听，一直传，传给接口的，接口拿到这个id参数返回数据内容
    },          //  接口是通过监听id得到返回的内容的，所以用watch，之前学的其他内容都是用created
     data() {
      return {
        content:{},
        isBacktopVisible: false,
        isLoading: false,//默认是没有isLoading的
      };
    },
    watch:{
      curId(id){
        this.isLoading=true //当我拿到id显示loading

        //监听id写了这个函数 拿到id,成功后吧...
        this.getContend(id).then(()=>{ //Cannot read property 'then' of undefined"，报错是因为这里写了then  getCategoryContent前要加return。这里如果没有then，getCategoryContent前就不需要多加return
          this.isLoading=false //当拿到数据，隐藏loading

          this.backToTop(0) //调用回到最顶部: 滑到最底部，切换tab，不会回到最顶部，会停在刚才滑到的位置   //有数据之后跟回到最顶部是有关系的：有数据后才需要回到最顶部，有数据后调用回到最顶部
        
        }) //没有this会显示: backToTop is not defined 
           //speed和0没传有滑动的效果，传了是瞬间回到顶部 
      }
    },
    //写完看APP.vue文件: 切换路由的时候，关于加载情况

    methods: {//API:  updateTime 上一次更新的时间/ getContentByLocalStorage 缓存/ getContentByHTTP 服务端/ updateLocalStorage 更新缓存
      getContend(id){ 
        
let contents = storage.get(CATEGORY_CONTENT_KEY);//通过key获取缓存中的内容 (get获取)
let updateTime; //上一次更新的时间
const curTime=new Date().getTime();//当前时间

if(contents&&contents[id]){//有contents还不行，还需要有相应的id
  updateTime=contents[id].updateTime||0;//有这个吗，没有的话返回0
  if(curTime-updateTime<=CATEGORY_CONTENT_UPDATE_TIME_INTERVAL){ // localstorage  小于的话走localStorage  还在缓存期内

  //希望getContend返回Promise对象，数据成功获取到之后操作getContentByLocalStorage 一会要吧它变为Promise对象 所以加了return Promise.resolve();
    return this.getContentByLocalStorage(contents[id]);
}else{ // HTTP   else就走http 

    return this.getContentByHTTP(id).then(()=>{//三、之后你没有获取到，不会走then这一步
      this.updateLocalStorage(contents,id,curTime);//一、不管data有没有值，最后都会成功返回，这里的updateLocalStorage都会更新
    })
}//成功之后需要更新，不能吧更新写在getContentByHTTP里面，吧更新写在成功之后,写在then后面
}else{ // HTTP  如果contents获取不到，走http 成功获取到数据之后更新缓存 成功之后获取到 是Promise对象
     
     return this.getContentByHTTP(id).then(()=>{
      this.updateLocalStorage(contents,id,curTime);
    })
}//if(curTime-updateTime<=CATEGORY_CONTENT_UPDATE_TIME_INTERVAL)和两个 else{ // HTTP: 最后返回的都是Promise对象
 },
      // 这个是之前写的，写在getContend(id)里面                
      // return getCategoryContent(id).then(data=>{
      //    if(data){ //axios数据  data如果有值
      //    this.content=data;
      //    }
      //  })


// 从服务端拿数据保存在缓存里  之后是搜索的key，现在是content的key,缓存里还有别人的key指的是搜索的key
//最开始的时候缓存里都是没有值的，后面是有值了，更新缓存的时候，缓存里有时候有值，有时候没值       
updateLocalStorage(contents,id,curTime){ //更新缓存  调用localStorage提供的api
  contents=contents||{}; //判断contents有没有值，没有值给它一个空对象
  contents[id]={}; //这时候是更新，要找到id对应的内容contents[id]吧它变为空对象
  contents[id].data=this.content;//更新的话从头开始，data是数据   就是我们目前的内容 this.content
  contents[id].updateTime=curTime;//updateTime上一次更新的时间   curTime：目前的时间就是目前更新的
  storage.set(CATEGORY_CONTENT_KEY,contents);//设置内容，覆盖原来的内容 contents是最后得到的
},
getContentByLocalStorage(content){
  //页面没显示出来就是因为缓存中的数据没保存对：不应该是content,content里面包含着update和data,吧content改成content.data
  this.content=content.data; 
  return Promise.resolve();
},
getContentByHTTP(id){//这里对于加不加return new Promise(resolve=>{ resolve() })有什么区别: 一、二、三
  return getCategoryContent(id).then(data=>{
   return new Promise(resolve=>{
      if(data){
      this.content=data;
      resolve();//二、只有你成功获取到了，这里才会执行resolve ,所以外面包了一层 return new Promise
    }
   })
  })//后来写到这里
},

// 没有loading就表示不是从服务器加载的，而是从缓存中
// 快速点击tab，看增加几个id( WQR2006 )，从服务器加载只会增加最后一个，可以减少服务端的压力，
// 如果是从缓存在加载，因为它已经保存在缓存了，所以乱点tab,id没有增加
     
      backToTop(speed) {
        this.$refs.scroll && this.$refs.scroll.scrollToTop(speed);
      },
     
      // backToTop(speed,time) {
      //   this.$refs.scroll && this.$refs.scroll.scrollToTop(speed,'0.1s');

      // },//0.1s滑动的时候很快就可以显示图标了
      updateScroll(){//更新滚动条就这样写，如果没有这个，滑到最底部有一部分是会被挡住的
        this.$refs.scroll && this.$refs.scroll.update();
      },
      scrollEnd(translate,swiper){
        if (translate > 0) {
          return
        };
        this.isBacktopVisible = -translate > swiper.height;
      }
    }  
  };
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";

  .content-wrapper {
    position: relative;
    height: 100%;
  }

  .loading-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: $category-popup-z-index;
    @include flex-center();
    width: 100%;
    height: 100%;
    // background-color: $modal-bgc;

    .mine-loading {
      color: #fff;
      font-size: 14px;
    }
  }
  .loading-wrapper {
    width: 50%;
    padding: 30px 0;
    background-color: $modal-bgc;
    border-radius: 4px;
  }

  .content {
    padding: 10px;
  }

  .pic {
    margin-bottom: 12px;

    &-link {
      display: block;
    }

    &-img {
      width: 100%;
    }
  }

  .section {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    &-title {
      height: 28px;
      line-height: 28px;
      color: #080808;
      font-weight: bold;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
      background-color: #fff;
      padding: 10px 10px 0;
    }

    &-item {
      width: (100% / 3);
    }

    &-link {
      display: block;
    }

    &-pic {
      position: relative;
      width: 80%;
      padding-bottom: 80%;
      margin: 0 auto;
    }

    &-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &-name {
      height: 36px;
      line-height: 36px;
      text-align: center;
      @include ellipsis();
    }
  }

  .g-backtop-container {
    bottom: 10px;
  }
  
</style>
