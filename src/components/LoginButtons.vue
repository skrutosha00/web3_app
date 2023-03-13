<template>
  <div class="card">
    <a-card title="Choose one to login">
      <div class="btn">
        <a-button
          type="primary"
          size="large"
          shape="round"
          block
          @click="anchorClickHandler">
          Log in with Anchor
        </a-button>
      </div>

      <div class="btn">
        <a-button
          type="primary"
          size="large"
          shape="round"
          block
          @click="waxClickHandler">
          Log in with WAX Cloud Wallet
        </a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "LoginButtons",
  methods: {
    anchorClickHandler() {
      this.$emit("anchorClick");
    },
    waxClickHandler() {
      this.$emit("waxClick");
    }
  }
};
</script>

<style scoped>
.card {
  width: 300px;
}
.btn:first-child {
  margin-bottom: 20px;
}
</style>
