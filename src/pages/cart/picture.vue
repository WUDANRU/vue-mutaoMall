<template>
    <div class="cart-picture">
<div v-for="(item,index) in picture" :key="index">
<a :href="item.linkUrl"><img class="cart-picture-img"  :src="item.picUrl" alt=""></a>
</div>
    </div>
</template>
<script>
import { pictureItem } from './config';

export default{
name:'CartPicture',
created(){
this.picture=pictureItem;
}
}
</script>
<style lang="scss" scoped>
.cart-picture,.cart-picture-img{
width:100%;
}
</style>