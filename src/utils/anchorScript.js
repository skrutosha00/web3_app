import { JsonRpc } from "eosjs";
import AnchorLink from "anchor-link";
import AnchorLinkBrowserTransport from "anchor-link-browser-transport";

import { getAmountString } from "./utils";

let session = null;

const rpc = new JsonRpc("http://api.wax.alohaeos.com/");
const transport = new AnchorLinkBrowserTransport();
const link = new AnchorLink({
  transport,
  chains: [
    {
      chainId:
        "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4",
      nodeUrl: "https://wax.greymass.com"
    }
  ]
});

async function anchorLogin() {
  const identity = await link.login("example").catch((err) => {
    console.log(err);
  });

  if (!identity) {
    return null;
  }

  session = identity.session;
  return session.auth.actor;
}

async function anchorTransfer(data) {
  const action = {
    account: data.currency == "wax" ? "eosio.token" : "umixroytoken",
    name: "transfer",
    authorization: [session.auth],
    data: {
      from: session.auth.actor,
      to: data.to,
      quantity: getAmountString(data.amount, data.currency),
      memo: data.memo
    }
  };

  let transaction = await session.transact({ action }).catch((err) => {
    console.log(err);
  });

  return transaction;
}

async function anchorGetBalance() {
  let waxBalance = (
    await rpc.get_currency_balance("eosio.token", session.auth.actor, "WAX")
  )[0];

  if (!waxBalance) {
    waxBalance = "0";
  }

  let umixBalance = (
    await rpc.get_currency_balance("umixroytoken", session.auth.actor, "UMIX")
  )[0];

  if (!umixBalance) {
    umixBalance = "0";
  }

  return [waxBalance, umixBalance];
}

export { anchorLogin, anchorTransfer, anchorGetBalance };
