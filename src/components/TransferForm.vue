<template>
  <div class="form">
    <a-form
      :model="formState"
      :label-col="{ style: { width: '150px' } }"
      :wrapper-col="{ span: 14 }">
      <a-form-item label="Currency">
        <a-radio-group v-model:value="formState.currency">
          <a-radio value="wax">WAX</a-radio>
          <a-radio value="umix">UMIX</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="To">
        <a-input v-model:value="formState.to" />
      </a-form-item>

      <a-form-item stringMode label="Amount">
        <a-input-number id="inputNumber" v-model:value="formState.amount" />
      </a-form-item>

      <a-form-item label="Memo">
        <a-input v-model:value="formState.memo" />
      </a-form-item>

      <div class="form_btns">
        <a-button type="primary" size="large" shape="round" @click="submit"
          >Transfer</a-button
        >
        <a-button type="default" size="large" shape="round" @click="reset"
          >Reset</a-button
        >
      </div>
    </a-form>
  </div>
</template>

<script>
import { message } from "ant-design-vue";

export default {
  name: "TransferForm",
  data() {
    return {
      formState: {
        currency: "",
        to: "",
        amount: "",
        memo: ""
      }
    };
  },
  methods: {
    submit() {
      if (!this.validateForm()) {
        message.error("Fill all the fields");
      } else {
        this.$emit("formSubmit", this.formState);
      }
    },
    reset() {
      this.formState = {
        currency: "",
        to: "",
        amount: "",
        memo: ""
      };
    },
    validateForm() {
      for (let field in this.formState) {
        if (!this.formState[field]) {
          return false;
        }
      }
      return true;
    }
  }
};
</script>

<style scoped>
.form {
  max-width: 500px;
}

.form_btns {
  display: flex;
  justify-content: space-between;
  width: 300px;
  margin: auto;
}
</style>
