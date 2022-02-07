<template>
  <!-- <div>
    tab
  </div>-->
  <me-scroll :scrollbar="false">
    <ul class="tab">
      <li
        class="tab-item"
        :class="{'tab-item-active':item.id===curId}"
        v-for="(item, index) in items"
        :key="index"
        @click="switchTab(item.id)"
      >{{item.name}}</li>
    </ul>
    <!-- item，index,curId都属于变量 -->
  </me-scroll>
<!-- 
     <li  class="tab-item" :class="{'tab-item-active':item.id===curId}" 这个可以有两个类 当前点击选中的id是类名为：tab-item-active，并且要等于当前id
      :item.id===curId 或者 curId===:item.id
 -->
</template>

<script>
import MeScroll from "base/scroll";
import { categoryNames } from "./config";
 

export default {
  name: "CategoryTab",
  components: {
    MeScroll  
  },
  data() { //像swiper的一些api都不需要写在这里，一般是需要时刻渲染的，还有是后台接口数据存储在这里
    return {
      curId: "" //当前id,这个是变量    // tab的data里的id表示当前id,它不属于写在标签模板上,像tab的curId也是自己的变量，需要时刻渲染 。但是它的话写在data里(一开始就写在data里，表示当前id的变量)，它可以不需要说标签模板上有它，它后面还会写点击切换的id等于当前id
    };
  },
  created() {
    this.init();//当前文件下的config.js配置文件是本地数据写在这里，不需要写在data里

    //这个写在前面一个之后，前面一个的内容被分离出去也等于写在created里
    this.switchTab(this.items[0].id);//跳转到category页面，需要默认选中的id，写了这个右边才有内容
  },
  methods: {
    init() {
      this.items = categoryNames;
    },
    switchTab(id) { //switchTab(id) 这里的id是  @click="switchTab(item.id)"这里传来的item.id
      if (this.curId === id) { 
        return; //如果当前id等于点击的id不作任何处理
      }

      this.curId = id; //如果当前id不等于点击的id(否则),吧当前id赋值给点击的id
      this.$emit("switch-tab", id);//然后需要一个事件，事件名："switch-tab"  然后吧id传出去 当前的index.vue(即父组件接收，@switch-tab="getCurrentId")
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

$tab-item-height: 46px;
.tab {
  width: 100%;

  &-item {
    height: $tab-item-height;
    background-color: #fff;
    border-right: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    color: #080808;
    font-size: $font-size-l;
    font-weight: bold;
    text-align: center;
    line-height: $tab-item-height;
    @include ellipsis();

    &:last-child {
      border-bottom: none;
    }
  }

  &-item-active {
    background: none;
    border-right: none;
    color: #f23030;
  }
}
</style>

