<template>
  <transition name="mine-backtop">
    <a
      href="javaScript:;"
      class="mine-backtop"
      v-show="visible"
      @click="backToTop" >
      <i class="iconfont icon-backtop"></i>
    </a>
   </transition> 
<!-- v-show就是显示和隐藏 显示还是隐藏这个图标 -->

<!-- @backtop="backToTop" 这个是backtop子组件里的$emit传来的，是一个方法

@switch-tab="getCurrentId" 这个是子组件里的$emit传来的

 @click="switchTab(item.id)" click是固定的，这个可以调用也可以写一个方法,这样的：  @click="happy"

@load="updateScroll" load是固定的 -->

<!-- visible这个是变量，是由父组件传来的值 -->

</template>

<script>
  export default {
    name: 'MeBacktop',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backToTop() {
        this.$emit('backtop');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .mine-backtop {
    overflow: hidden;
    @include flex-center();
    width: 45px;
    height: 45px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    border-radius: 50%;

    .iconfont {
      color: #fff;
      font-size: 38px;
    }
  }

  .mine-backtop {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.4s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
</style>
