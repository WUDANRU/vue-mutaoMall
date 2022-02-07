<template>
  <div class="personal-head">
    <div class="personal-user">
      <div class="personal-user-icon">
        <i class="iconfont icon-yonghu"></i>
      </div>
      <div class="personal-user-div">
        <span class="personal-user-span">注册</span>
        <span class="personal-user-span user-i">|</span>
        <span class="personal-user-span">用户</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PersonalUser"
}
</script>

<style lang="scss" scoped>
.personal-head {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  background: rgb(212, 4, 4);
}
.personal-user-icon {
  background: #fff;
  margin-bottom: 8px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  .icon-yonghu {
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgb(228, 21, 21);
    font-weight: bolder;
  }
}
.personal-user-div {
  display: flex;
  justify-content: center;
  padding-top: 5px;
  font-size: 14px;
}
.user-i {
  padding: 0px 10px;
}
.personal-user {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-span {
    color: #fff;
  }
}
</style>