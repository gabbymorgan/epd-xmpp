import { client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";
import axios from "axios";

import { sendMessage, xmppClient } from "./api/xmpp.ts";
import { screenWebSocket } from "./api/epd.ts";
import { sleep } from "./helpers.ts";
import Router from "./ui/pages.ts";
import Compose from "./ui/compose.ts";
import Contacts from "./ui/contacts.ts";
import Conversation from "./ui/conversation.ts";


const router = new Router({
  compose: new Compose(),
  contacts: new Contacts(),
  conversation: new Conversation(),
});

await xmppClient.start();
// await sendMessage(
//   `${process.env.USERNAME}@${process.env.DOMAIN}`,
//   "all systems go!"
// );

screenWebSocket.on("open", function() {
  router.navigateTo("contacts")
})

