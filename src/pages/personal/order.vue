<template>
  <div class="personal-order">
    <div class="personal-order-icon">
      <span class="personal-order-left">
        <i class="iconfont icon-wodedingdan"></i>
        <span class="me-order">我的订单</span>
      </span>
      <span class="personal-order-right">
        <span class="me-all">查看我的全部订单</span>
        <i class="iconfont icon-jinru"></i>
      </span>
    </div>
     <div class="line"></div>
    <div class="personal-order-line">
     
      <div class="daifukuan"><i class="iconfont icon-daifukuan"></i><span class="">待付款</span></div>   
      <div class="daishouhuo"><i class="iconfont icon-daishouhuo"></i><span class="">待收货</span></div> 
      <div class="daipingjia"><i class="iconfont icon-daipingjia"></i><span class="">待评价</span></div> 
      <div class="tuihuotuikuan"><i class="iconfont icon-tuihuotuikuan"></i><span class="">退货/退款</span></div>  
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalOrder"
};
</script>

<style lang="scss" scoped>
.personal-order {
    font-size:14px;
  background:#fff;
  width: 100%;
  margin: 10px 0;
}
.personal-order-icon{
    display: flex;
    justify-content: space-between;
      align-items: center;
    padding:10px 10px;
}
.personal-order-left{
      display: flex;
      align-items: center;
}
.icon-wodedingdan{
    font-size:26px;
    padding-right:6px;
    color:rgb(184, 184, 184);

}
    .me-order{
 font-size: 16px;
  font-weight: bolder;
    }

 .line{
        width:100%;
        border:.5px solid rgb(235, 235, 235);
    }
.personal-order-line{
    width:100%;
    padding:10px 10px; 
    display: flex;
}
.daifukuan,.daishouhuo,.daipingjia,.tuihuotuikuan{
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
    i{
         margin-bottom:10px;
         font-size:28px;
    }
}
.personal-order-right{
    color:rgb(163, 162, 162);
.icon-jinru{
    font-size:14px;
}
}
</style>