<template>
  <h1>
    {{ isLogged ? "Username:" : "Welcome" }} {{ anchorUser ?? waxUser ?? "" }}
  </h1>

  <AppSteps :current="currentStep" class="app_steps" />

  <LoginButtons
    @anchorClick="anchorClickHandler"
    @waxClick="waxClickHandler"
    v-show="!isLogged"
    class="app_login" />

  <BalanceInfo
    @updateBalance="updateBalance"
    :waxAmount="waxAmount"
    :umixAmount="umixAmount"
    v-if="isLogged"
    class="app_balance" />

  <TransferForm
    @formSubmit="formSubmitHandler"
    v-if="isLogged"
    class="app_form" />
</template>

<script>
import { message } from "ant-design-vue";

import {
  anchorLogin,
  anchorTransfer,
  anchorGetBalance
} from "@/utils/anchorScript";
import { waxLogin, waxTransfer, waxGetBalance } from "@/utils/waxScript";
import { sleep } from "@/utils/utils";

import AppSteps from "@/components/AppSteps.vue";
import LoginButtons from "@/components/LoginButtons.vue";
import TransferForm from "@/components/TransferForm.vue";
import BalanceInfo from "@/components/BalanceInfo.vue";

export default {
  data() {
    return {
      anchorUser: null,
      waxUser: null,
      waxAmount: null,
      umixAmount: null
    };
  },
  methods: {
    async anchorClickHandler() {
      this.anchorUser = await anchorLogin();

      if (this.anchorUser) {
        this.anchorSetBalance();
      }
    },
    async waxClickHandler() {
      this.waxUser = await waxLogin();

      if (this.waxUser) {
        this.waxSetBalance();
      }
    },
    async formSubmitHandler(data) {
      if (this.anchorUser) {
        let transaction = await anchorTransfer(data);

        this.handleTransfer(transaction);

        await sleep(1000);

        await this.anchorSetBalance();
      } else if (this.waxUser) {
        let transaction = await waxTransfer(data);

        this.handleTransfer(transaction);

        await sleep(1000);

        await this.waxSetBalance();
      }
    },
    async waxSetBalance() {
      [this.waxAmount, this.umixAmount] = await waxGetBalance();
    },
    async anchorSetBalance() {
      [this.waxAmount, this.umixAmount] = await anchorGetBalance();
    },
    handleTransfer(transaction) {
      if (transaction) {
        message.success("Success");
      } else {
        message.error("Something went wrong with transaction");
      }
    },
    async updateBalance() {
      [this.waxAmount, this.umixAmount] = [null, null];

      if (this.anchorUser) {
        this.anchorSetBalance();
      } else if (this.waxUser) {
        this.waxSetBalance();
      }
    }
  },
  computed: {
    isLogged() {
      return this.waxUser || this.anchorUser;
    },
    currentStep() {
      return this.isLogged ? 2 : 0;
    }
  },
  components: { AppSteps, LoginButtons, TransferForm, BalanceInfo }
};
</script>

<style>
#app {
  padding: 15px;
}

.app_steps {
  margin: 20px auto;
}

.app_login {
  margin: 40px auto 20px;
}

.app_balance {
  margin: 40px auto 20px;
}

.app_form {
  margin: 20px auto;
}

@media screen and (max-width: 330px) {
  #app {
    padding: 10px;
  }
}
</style>
