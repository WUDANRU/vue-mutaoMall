<template>
  <transition name="baozhang">
    <div class="product-baozhang" v-show="visible">
      <div class="product-baozhang-div">
        <div class="product-baozhang-title">
          <i></i>
          <span>服务说明</span>
        </div>
        <div class="product-baozhang-span">
          <span class="product-baozhang-i">
            <i class="iconfont icon-duigou"></i>
            <h1>假一赔十</h1>
          </span>
          <p class="product-baozhang-p">若收到商品是假冒品牌，可获得十倍现金券赔偿</p>
        </div>
        <div class="product-baozhang-span">
          <span class="product-baozhang-i">
            <i class="iconfont icon-duigou"></i>
            <h1>极速退款</h1>
          </span>
          <p class="product-baozhang-p">拼单成功6个小时内，待发货状态下，提交退款申请将立即退款</p>
        </div>
        <div class="product-baozhang-span">
          <span class="product-baozhang-i">
            <i class="iconfont icon-duigou"></i>
            <h1>闪电退货</h1>
          </span>
          <p class="product-baozhang-p">满足相应条件时，申请退货后可直接按照商家预留地址退货</p>
        </div>
        <div class="product-baozhang-span">
          <span class="product-baozhang-i">
            <i class="iconfont icon-duigou"></i>
            <h1>7天无理由退货</h1>
          </span>
          <p class="product-baozhang-p">满足相应条件时，消费者可申请7天无理由退货</p>
        </div>
        <div class="product-baozhang-span">
          <span class="product-baozhang-i">
            <i class="iconfont icon-duigou"></i>
            <h1>假一赔十</h1>
          </span>
          <p class="product-baozhang-p">若收到商品是假冒品牌，可获得十倍现金券赔偿</p>
        </div>
        <div class="product-baozhang-span">
          <span class="product-baozhang-i">
            <i class="iconfont icon-duigou"></i>
            <h1>极速退款</h1>
          </span>
          <p class="product-baozhang-p">拼单成功6个小时内，待发货状态下，提交退款申请将立即退款</p>
        </div>
        <div class="product-baozhang-footer" @click="wangcheng">
          <span>完成</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "ProductBaozhang",
  data() {
    return {
      visible: false
    };
  },
  methods: {
    show() {
      this.visible = true;
      this.$refs.scroll && this.$refs.scroll.update();
    },
    wangcheng() {
      this.visible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.product-baozhang {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(#000, 0.4);
  z-index: 1300;

  .product-baozhang-div {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    background: #fff;
    padding: 20px 20px 30px 20px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}
.baozhang {
  &-enter-active,
  &-leave-active {
    transition: all 0.2s;
  }
  &-enter,
  &-leave-to {
    transform: translate3d(0, 100%, 0);
  }
  // &-enter-active,
  // &-leave-active {
  //   transition: height 0.2s; //高度在100毫秒内(0.1s)
  // }
  // &-enter,
  // &-leave-to {
  //   height: 0;
  // }
  // &-enter-active {
  //     .product-baozhang {
  //       animation: bounce-in 0.3s;
  //     }
  //   }
}
// @keyframes bounce-in {
//   0% {
//     transform: scale(0);
//   }
//   50% {
//     transform: scale(1.1);
//   }
//   100% {
//     transform: scale(1);
//   }
// }
.product-baozhang-title {
  display: flex;
  justify-content: center;
  font-size: 15px;
  font-weight: bold;
  padding-bottom: 10px;
}
.product-baozhang-span {
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
}
.product-baozhang-i {
  display: flex;
  .iconfont {
    padding-right: 10px;
    color: rgb(163, 161, 161);
    font-size: 14px;
  }
  padding-bottom: 6px;
}
.product-baozhang-p {
  line-height: 18px;
}
.product-baozhang-footer {
  margin-top: 60px;
  border-radius: 40px;
  font-size: 14px;
  width: 100%;
  height: 40px;
  background: rgb(245, 164, 15);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>
