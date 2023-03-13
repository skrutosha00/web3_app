import * as waxjs from "@waxio/waxjs/dist";

import { getAmountString } from "./utils";

const wax = new waxjs.WaxJS({
  rpcEndpoint: "https://wax.greymass.com",
  tryAutoLogin: false
});

async function waxLogin() {
  const userAccount = await wax.login().catch((err) => console.log(err));
  return userAccount;
}

async function waxTransfer(data) {
  const action = {
    account: data.currency == "wax" ? "eosio.token" : "umixroytoken",
    name: "transfer",
    authorization: [
      {
        actor: wax.userAccount,
        permission: "active"
      }
    ],
    data: {
      from: wax.userAccount,
      to: data.to,
      quantity: getAmountString(data.amount, data.currency),
      memo: data.memo
    }
  };

  let transaction = await wax.api
    .transact(
      {
        actions: [action]
      },
      {
        blocksBehind: 3,
        expireSeconds: 1200
      }
    )
    .catch((err) => console.log(err));

  return transaction;
}

async function waxGetBalance() {
  let waxBalance = (
    await wax.rpc.get_currency_balance("eosio.token", wax.userAccount, "WAX")
  )[0];

  if (!waxBalance) {
    waxBalance = "0";
  }

  let umixBalance = (
    await wax.rpc.get_currency_balance("umixroytoken", wax.userAccount, "WAX")
  )[0];

  if (!umixBalance) {
    umixBalance = "0";
  }

  return [waxBalance, umixBalance];
}

export { waxLogin, waxTransfer, waxGetBalance };
