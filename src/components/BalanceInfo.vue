<template>
  <div class="balance_root">
    <div class="balance">
      <a-statistic
        title="WAX"
        :precision="8"
        :value="waxAmount"
        v-if="waxAmount" />

      <a-statistic
        title="UMIX"
        :precision="4"
        :value="umixAmount"
        v-if="umixAmount" />

      <a-spin class="spin" v-if="!(waxAmount && umixAmount)" />
    </div>

    <div class="update">
      <a-button shape="round" class="update_btn" @click="updateClickHandler"
        >Update balance</a-button
      >
      <div class="update_text">
        Balance updates automatically, but you can still use this
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BalanceInfo",
  props: {
    waxAmount: String,
    umixAmount: String
  },
  methods: {
    updateClickHandler() {
      this.$emit("updateBalance");
    }
  }
};
</script>

<style scoped>
.balance_root {
  width: 500px;
  max-width: 100%;
}
.balance {
  position: relative;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  width: 100%;
  min-height: 65px;
  text-align: center;
}

.spin {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.update {
  width: 100%;
  margin-top: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.update_btn {
  margin-right: 20px;
}

.update_text {
  max-width: 225px;
  text-align: right;
}
</style>
