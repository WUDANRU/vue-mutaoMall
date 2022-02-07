<template>
   <div>
<!-- <me-scroll  ref="scroll" > -->
    <!-- ref="scroll" -->
    <!-- <me-loading  v-if="!sliders.length"/>  注释掉的 -->
     <me-loading  v-if="!sliders.item"/>
    <me-slider 
      :data="sliders"
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-else
     > 
      <swiper-slide v-for="(items,index) in sliders.item.images" :key="index" > 
     <a :href="sliders.item.taobaoDescUrl" class='slider-link'>
     <img :src="items" alt="" class='slider-img'  /> 
     </a>
      </swiper-slide>
      </me-slider>
      <!-- <product-detail :sliders="sliders" v-else /> -->

  <!-- </me-scroll>  -->
  </div>
</template> <!--v-if="data.seller.taoShopUrl" shopUrl -->
<script>
import MeSlider from 'base/slider';
import {swiperSlide} from 'vue-awesome-swiper';
import MeLoading from 'base/loading';
import {sliderOptions} from 'pages/home/config';
// import MeScroll from 'base/scroll';
// import productDetail from './detail'; 

export default {
  name:'ProductSlider',
  components:{
    MeSlider,
    swiperSlide,
    MeLoading,
    // productDetail,
    // MeScroll,
  },
  props:{
   sliders:{
     type: [Array,Object],
     default(){
       return []
     }
   },

  },
  data(){
      return{
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination,
      }
  },
  // watch:{
  //   sliders(){
  //      this.update()
  //   }
  // },
  // methods:{
  //   update(){
  //     // this.$nextTick(()=>{  this.$refs.scroll&&this.$refs.scroll.update()})
  //      this.$refs.scroll&&this.$refs.scroll.update()
  //   }
  // }
 }
</script>
<style lang="scss" scoped>

 @import "~assets/scss/mixins";
.swiper-container-horizontal {
    width: 100%;
 height:375px;
}
   .mine-loading{
   padding-top:50%;
 }
  .slider-img {
    width: 100%;
  height: 375px;
    // overflow: hidden;
  }
  </style>