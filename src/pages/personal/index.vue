<template>
  <div class="personal">
    <header class="g-header-container">
      <personal-header />
    </header>
    <div class="g-content-container">
      <me-scroll ref="scroll">
        <personal-user />
        <personal-order />
        <personal-assets />
        <personal-other />
      </me-scroll>
    </div>
  </div>
</template>

<script>
import PersonalHeader from "./header";
import PersonalUser from "./user";
import PersonalOrder from "./order";
import PersonalAssets from "./assets";
import PersonalOther from "./other";
import MeScroll from "base/scroll";

export default {
  name: "Personal",
  components: {
    PersonalHeader,
    PersonalUser,
    PersonalOrder,
    PersonalAssets,
    PersonalOther,
    MeScroll
  },
  created() {
  this.$refs.scroll && this.$refs.scroll.update();
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/mixins";
.personal{
  height:100%;
}
</style>
