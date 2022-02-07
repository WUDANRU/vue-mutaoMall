<template>
<div>
  <me-loading  v-if="!sliders.item" /> 

  <div class="slider" v-if="sliders.item" >
    <p class="slider-div">
      <span class="slider-div-span">
      <span class="slider-span"><i class="slider-span-i-i">￥ {{apiStack.price.price.priceText}}</i></span>
        </span>
     
      <span class="slider-span slider-span-color">{{sliders.item.favcount}}件已售</span>
    </p>
    <div class="slider-title" v-if="sliders.item.title">
      <h1 class="slider-title-detail" v-if="sliders">{{sliders.item.title}}</h1>
      <div class="slider-title-div">
        <span>{{apiStack.delivery.postage}} </span>
        <span>{{apiStack.delivery.from}}</span>
        <span>配送至: {{apiStack.delivery.to}}</span>
      </div>
    </div>
     <div class="slider-baozhang" @click="baozhang">
      <span class="">
        <span class="baozhang-font">保障</span>
        <span>假一赔四 · 破损包退 · 上门取退 · 极速退款</span>
      </span>
      <i class="iconfont icon-jinru"></i>
    </div>
    <div class="sliders-commentcount" v-if="sliders.item.commentCount">
      <h1 class="sliders-commentcount-review">商品评价 ({{sliders.item.commentCount}})</h1>
      <ul class="sliders-commentcount-ul">
        <li
          class="sliders-commentcount-li"
          v-for="(itemvalue,idx) in sliders.rate.keywords"
          :key="idx"
        >{{itemvalue.word}} ({{itemvalue.count}})</li>
      </ul>
    </div>
    <div class="sliders-commentcounts" v-for="(value,i) in sliders.rate.rateList" :key="i">
      <div class="sliders-commentcount-div">
        <img class="sliders-commentcount-img" :src="value.headPic" />
        <span class="sliders-commentcount-username">{{value.userName}}</span>
      </div>
      <div class="sliders-commentcount-content">{{value.content}}</div>
      <div class="sliders-commentcount-data">
        <span class="sliders-commentcount-datetime">{{value.dateTime}}</span>
        {{value.skuInfo}}
      </div>
    </div>

    <div class="review">
      <a class="review-one" href="sliders.seller.shopUrl">
        <img :src="sliders.seller.shopIcon" class="review-shopicon" />
      </a>
      <a class="review-two" href="sliders.seller.shopUrl">
        <a class="review-font">{{sliders.seller.shopName}}</a>
        <img :src="sliders.seller.creditLevelIcon" class="review-review" />
      </a>
    </div>
    <span class="review-spans" v-for="val in sliders.seller.evaluates" :key="val.type">  <!--v-for="(val,u) in sliders.seller.evaluates" :key="u" -->
      <span>{{val.title}}</span>
      <span class="review-spans-score">({{val.score}})</span>
    </span>
  </div>
 </div> 
</template>
<script>
import MeLoading from 'base/loading';

export default {
  name: "productDetail",
components:{
 MeLoading,
},
  props: {
    sliders: {
      type: [Array, Object],
      default() {
        return [];
      }
    },
    apiStack: {
      type: [Array, Object],
      default() {
        return {};
      }
    },
  }, 
     methods:{
      baozhang() {
      this.$emit("bao-zhang");
    },
  }
};
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
 
   .mine-loading{
   padding-top:50%;
 }
.slider-div {
  width: 100%;
  height: 50px;
  background: linear-gradient(to right, rgb(250, 61, 124), rgb(231, 27, 180));
  @include flex-between();
  .slider-span {
    font-size: 14px;
    color: #fff;
    margin: 0 10px;
    display:flex;
    &-i-i{
    font-size:17px;
    }
  }
  .slider-span-color {
    background: #e938bd;
    opacity: 0.9;
    padding: 6px 5px;
    border-radius: 5px;
  }
}
.slider-title {
  width: 100%;
  height: auto;
  padding: 8px 6px;
  background: #fff;
  @include multiline-ellipsis;
  h1 {
    font-size: 14px;
    line-height: 18px;
  }
  &-detail {
    font-size: 16px;
    line-height: 17px;
    letter-spacing: 0.8px;
  }
}
.slider-title-div {
  margin-top: 10px;
  @include flex-between();
  justify-content: space-between;
  color: rgb(161, 161, 161);
  span {
    font-size: 12px;
  }
}
.sliders-commentcounts {
  background: #fff;
}
.sliders-commentcount {
  width: 100%;
  height: auto;
  padding: 10px 0px;
  background: #fff;
  h1 {
    font-size: 14px;
    margin-left: 10px;
  }
  &-ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  &-li {
    transform: scale(0.9);
    width: 30%;
    height: 22px;
    @include flex-center();
    display: inline-flex;
    margin-top: 6px;
    border-radius: 5px;
    background: rgb(255, 236, 239);
    color: rgb(150, 150, 150);
    font-size:12px;
  }
  &-content {
    padding: 5px;
    line-height: 18px;
    font-size: 13px;
  }
  &-datetime {
    color: rgb(145, 143, 143);
    padding: 10px;
  }
  &-div {
    padding: 18px 0px 14px;
    height: 30px;
    align-items: center;
    display: flex;
  }
  &-img {
    border-radius: 50%;
    margin-left: 10px;
    width: 22px;
  }
  &-username {
    height: auto;
    margin-left: 5px;
    align-items: center;
  }
}
.sliders-commentcount-data{
  padding:10px;
   color: rgb(145, 143, 143);
   line-height:15px;
}
.review {
  margin-top: 10px;
  padding: 10px 0;
  background: #fff;
}
.review-shopicon {
  width: 50px;
  padding: 10px 0 10px 10px;
}
.review-spans {
  padding-bottom: 10px;
  display: inline-flex;
  justify-content: center;
  width: 33.3%;
  background: #fff;
  &-score {
    padding-left: 5px;
  }
}
.review-font {
  font-size: 15px;
  padding-bottom: 6px;
}
.review-review {
  width: 30px;
}
.review {
  display: flex;
  justify-content: flex-start;
}
.review-two {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.slider-baozhang {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background: #fff;
  margin: 10px 0;
  padding: 0px 10px;
  font-size: 12px;
}
.baozhang-font {
  font-size: 14px;
  color: rgb(180, 179, 179);
  padding-right: 10px;
}
</style>