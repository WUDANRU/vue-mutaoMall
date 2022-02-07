<template>
  <div class="cart">
    <header class="g-header-container">
      <cart-header />
    </header>
    <div class="g-content-container">
      <me-scroll ref="scroll">
    <cart-picture />
    </me-scroll>
    </div>
  </div>
</template>

<script>
import MeScroll from 'base/scroll';
import CartHeader from "./header";
import CartPicture from "./picture";

export default {
  name: "cart",
  components: {
    CartHeader,
    CartPicture,
    MeScroll
  },
 created(){
   this.$refs.scroll&&this.$refs.scroll.update()
 }
};
</script>

<style lang="scss" scoped>
.cart{
  height:100%;
}
</style>
