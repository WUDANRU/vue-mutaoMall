<template>
  <transition name="mine-confirm">
    <div class="mine-confirm-wrapper" v-show="visible">
      <div class="mine-confirm">
         <div class="mine-confirm-title" v-if="title">{{title}}</div>
        <div class="mine-confirm-msg">{{msg}}</div>
        <div class="mine-confirm-btns">
          <button
            class="mine-confirm-btn mine-confirm-cancel"
            @click="cancel"
          >{{cancelBtnText}}</button>
          <button
            class="mine-confirm-btn mine-confirm-ok"
            @click="confirm"
          >{{confirmBtnText}}</button>
        </div>
      </div>
    </div>
  </transition>
  <!-- v-show 控制它显示或者隐藏 v-show里面是要传布尔值true或false的变量 -->
  <!-- 有动画效果，有个渐变的颜色，弹出框放大倍数会大于1，然后变成1 -->
</template>

<script>
  export default {
    name: 'MeConfirm',
    props: {     //props是从父组件传来的，没有传的话就用默认的，吧默认值赋值给上面的模板  v-if="title",props有title,会显示title，也可以不用写v-if="title"
      title: {
        type: String,
        default: ''
      },
      msg: {
        type: String,
        default: '确定执行此操作吗？'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      },
      confirmBtnText: {
        type: String,
        default: '确定'
      }
    },
    data() {
      return {
        visible: false // v-show的变量visible在data里是时刻渲染的，因为后面是会变化的
      };
    },
    methods: {
      show() { //show和hide方法是api
        this.visible = true;  // 这个会被search/index.vue调用: this.$refs.confirm.show();
      },
      hide() {
        this.visible = false;
      },

      cancel() {
        this.hide(); //先让取消隐藏
        // this.$emit('cancel');
      },
      confirm() {  //先让确认隐藏
        this.hide();
        this.$emit('confirm');
          
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";

  .mine-confirm-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $search-popup-z-index;
    @include flex-center();
    background-color: $modal-bgc;
  }

  .mine-confirm {
    overflow: hidden;
    width: 88%;
    background-color: #fff;
    border-radius: 10px;
    font-size: 16px;

    &-title {
      padding: 20px 15px 0;
      font-size: 18px;
      text-align: center;
      @include ellipsis();

      & + .mine-confirm-msg {
        padding-top: 20px;
        padding-bottom: 20px;
      }
    }

    &-msg {
      padding: 40px 15px;
      text-align: center;
      line-height: 1.5;
    }

    &-btns {
      display: flex;
    }

    &-btn {
      flex: 1;
      height: 44px;
      line-height: 44px;
      background: none;
      border: none;
    }

    &-cancel {
      border-top: 1px solid #e3e5e9;
    }

    &-ok {
      background-color: #f23030;
      color: #fff;
    }
  }

  .mine-confirm {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.3s; //动画的背景(遮罩层)是用transition
    }

    &-enter,
    &-leave-to {
      opacity: 0;//从0开始变化，又变化到0
    }

    &-enter-active {
      .mine-confirm {
        animation: bounce-in 0.3s; 
      }
    }
  }

  // https://cn.vuejs.org/v2/guide/transitions.html#CSS-动画
  @keyframes bounce-in { // keyframes关键帧
    0% {
      transform: scale(0); //0的时候是0
    }
    50% {
      transform: scale(1.1);//50%的时候是1.1
    }
    100% {
      transform: scale(1);//100%的时候是1
    }
  }
</style>
