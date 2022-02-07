<template>
  <!-- <div class="product">
      product
  </div>-->

  <transition name="product">
    <div class="product">
      <header class="g-header-container">
        <!-- 全局的类: g-header-container/g-content-container, product/search/category等一级路由都是共用全局的类 -->
        <product-header />
      </header>
      <div class="g-content-container">
        <!-- 引入基础组件：navbar/幻灯片/滚动条/loading -->
        <me-scroll ref="scroll">
          <product-slider :sliders="sliders" />
          <product-detail :sliders="sliders" :apiStack="apiStack" @bao-zhang="transitionbaozhang" />
         
        </me-scroll>
         <product-tab :sliders="sliders" />
        <product-baozhang  ref="baozhang" />
      </div>
    </div>
  </transition>
</template>

<script>
import ProductHeader from "./header";
import ProductSlider from "./Slider";
import { getProductDetail } from "api/product";
import MeScroll from "base/scroll";
import productDetail from "./detail";
import productTab from "base/productTab";
import ProductBaozhang from "./baozhang";

export default {
  name: "Product",
  components: {
    ProductHeader,
    ProductSlider,
    MeScroll,
    productTab,
    productDetail,
    ProductBaozhang
  },
  data() {
    return {
      sliders: [],
      apiStack: {}
    };
  },
  //    watch:{
  //   data(){
  //      this.update()
  //   }
  // },
  // methods:{
  //   update(){
  //     // this.$nextTick(()=>{  this.$refs.scroll&&this.$refs.scroll.update()})
  //     this.$refs.scroll&&this.$refs.scroll.update()
  //   }
  // },
  created() {
    console.log(this.$route.params.id);
    getProductDetail(this.$route.params.id).then(data => {
      if (data) {
        this.sliders = data;
        console.log(this.sliders);
        this.$nextTick(() => {
          setTimeout(() => {
            {
              this.$refs.scroll && this.$refs.scroll.update();
            }
          }, 300);
        });

        console.log(this.sliders);
        // console.log('a',this.sliders.seller.evaluates)
        this.apiStack = JSON.parse(this.sliders.apiStack[0].value);
        //  console.log(this.apiStack.price.price.priceText)
         console.log(this.apiStack)
        // console.log('81',this.apiStack.price.extraPrices)

        //          const apiStack=JSON.parse(this.sliders.apiStack[0].value);
        //          console.log(apiStack)
        // console.log(apiStack.price.price.priceText)
        //       let res={};
        //       console.log(res)
        //       res.content={};
        //          console.log(res.content)
        //       res.content.priceText=apiStack.price.price.priceText;
        //  console.log(res.content.priceText)

        // console.log(this.$refs.baozhang.show )
      }
    });
  },
  methods: {
    transitionbaozhang() {
      this.$refs.baozhang.show();
      console.log(this.$refs.baozhang);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.product {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: $product-z-index;
  width: 100%;
  height: 100%;
  background-color: $bgc-theme;
}
.g-content-container{
  padding-bottom:50px;
}
.product-enter-active,
.product-leave-active {
  transition: all 0.3s;
}

//吧它移出去 0表示不变化
.product-enter,
.product-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>
