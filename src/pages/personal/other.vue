<template>
  <div class="personal-other">
   <div class="personal-other-div">
   <div class="personal-other-i"><span class="personal-other-i-span"><i class="iconfont icon-kefu1"></i><span class="i">售后服务</span></span><span><i class="iconfont icon-jinru"> </i></span></div>
   <div class="personal-other-i"><span class="personal-other-i-span"><i class="iconfont icon-yijianfankui"></i><span  class="i">意见反馈</span></span><span><i class="iconfont icon-jinru"> </i></span></div>
   <div class="personal-other-i"><span class="personal-other-i-span"><i class="iconfont icon-shouhuodizhi"></i><span  class="i">收货地址</span></span><span><i class="iconfont icon-jinru"> </i></span></div>
   <div class="personal-other-i"><span class="personal-other-i-span"><i class="iconfont icon-tuichudenglu"></i><span  class="i">退出登录</span></span><span><i class="iconfont icon-jinru"> </i></span></div>
   <div class="personal-other-i"><span class="personal-other-i-span"><i class="iconfont icon-lianxidianhua"></i><span  class="i">400-123-8888</span></span><span><i class="iconfont icon-jinru"> </i></span></div>
 </div>
 <div class="personal-other-p">
<p>客服热线400-123-8888(8:00-22:00)</p>
<p>拨打前请记录您的UID</p>
 </div>
  </div>
</template>

<script>
export default {
  name: "PersonalOther"
};
</script>

<style lang="scss" scoped>
.personal-other-i{
    width:100%;
    height:35px;
    background:#fff;
    border-bottom:1px solid #ebebeb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:0 10px;
    font-size:14px;
}
.personal-other-i-span{
.iconfont{
    font-size:20px;
    color:rgb(180, 179, 179);
}
}

.i{
padding-left:8px;
}
.icon-jinru{
font-size:14px;
color:rgb(180, 179, 179);
}
.personal-other-p{
    font-size:14px;
    color:rgb(158, 157, 157);
    padding:18px;
    p{
        padding-bottom:6px;
    }
}
</style>