<template>
  <div id="app" class="g-container">                         <!-- content页面是切换了会保存在缓存中，可以在缓存中加载，也可以从服务端加载 -->
     <div class="g-view-container">                          <!-- 路由也没有保存在缓存中，不会从缓存中加载，刷新浏览器会重新从服务器加载数据，切换到刚刚切换过的路由会停留在刚刚加载过的位置 -->
     <keep-alive> <router-view></router-view> </keep-alive>  <!-- <keep-alive>的作用是切换路由(首页/分类页)不会重新从服务端加载，当我们刷新浏览器的时候，是从服务端加载/获取数据 -->
    </div>
    <div class="g-footer-container">
      <c-tabbar/>
    </div>

  </div>

<!-- 切换路由的时候，每次都要重新加载，(切换路由就是切换首页/分类页/购物车/个人中心的互相切换)  这个组件，切换的时候是销毁的，切换之后又重新加载(刷新浏览器也是重新加载)

APP.vue文件：
吧路由保持在内存中，加了<keep-alive>
<router-view>路由标签     路由指的是首页/分类页/购物车这些

保持在内存中的时候，点击首页/分类页/购物车切换的时候，可以看到它会停留在刚才加载的位置了，没有重新加载了 -->

</template>
<script>

  import CTabbar from 'components/tabbar';
  export default {
    name: 'App',
    components: {
      CTabbar
    }
  };
  
</script>
