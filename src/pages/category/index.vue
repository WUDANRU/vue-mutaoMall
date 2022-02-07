<template>
  <div class="category">
    <header class="g-header-container">
      <category-header/>
    </header>
    <div class="g-content-container">
      <div class="sidebar">
        <category-tab @switch-tab="getCurrentId" />
      </div>
      <div class="main">
        <category-content :curId="curId" />
        <!-- 这个curId现在接受的是this.curId=id这个值了 -->
      </div>
    </div>
  </div>
</template>

<script>
  import CategoryHeader from './header';
  import CategoryTab from './tab';
  import CategoryContent from './content';

  export default {
    name: 'Category',
    components: {
      CategoryHeader,
      CategoryTab,
      CategoryContent
    },
    data(){
      return{ 
        curId:'',//当前id  上面的<category-content :curId="curId" />curId是父组件的变量：需要加冒号，需要写在data里，如果curId是字符串，不需要加冒号也不需要写在data里，直接传给子组件
      }
    },
methods:{
  getCurrentId(id){ // getCurrentId(id)  这个id是子组件tab.vue传出来然后这里接收的
this.curId=id //当前的id赋值给接收的id,就是content的id等于tab的id
  }
}


  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .category {
    overflow:hidden;
    width:100%;
    height:100%;
    background-color: $bgc-theme;
  }

  .g-content-container {
    display: flex;
  }
  .sidebar {
    width: 80px;
    height: 100%;
  }
  .main {
    flex: 1;
    height: 100%;
  }
</style>
