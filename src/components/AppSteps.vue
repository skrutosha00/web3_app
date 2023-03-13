<template>
  <div class="steps">
    <a-steps
      :current="current"
      :labelPlacement="windowWidth > 800 ? 'horizontal' : 'vertical'">
      <a-step
        title="Log in"
        description="Through WAX or Anchor."
        class="step" />

      <a-step
        title="Get access to your  balance"
        description="WAX and umix are available"
        class="step" />

      <a-step
        title="Transfer currency"
        description="Additional info needed"
        class="step" />
    </a-steps>
  </div>
</template>

<script>
export default {
  name: "AppSteps",
  data() {
    return {
      windowWidth: window.innerWidth
    };
  },
  props: {
    current: Number
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.windowWidth = window.innerWidth;
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>

<style scoped>
.steps {
  max-width: 800px;
}
</style>
