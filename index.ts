import path from "path";
import { registerFont } from "canvas";
import { fileURLToPath } from "url";

import { xmppClient } from "./api/xmpp.ts";
import { screenWebSocket } from "./api/epd.ts";
import { sleep } from "./helpers.ts";
import Router from "./ui/pages.ts";
import Compose from "./ui/compose.ts";
import Contacts from "./ui/contacts.ts";
import Conversation from "./ui/conversation.ts";

export const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
export const __dirname = path.dirname(__filename);

function fontFile (name) {
  return path.join(__dirname, 'assets/fonts/', name)
}

registerFont(fontFile('Font.ttc'), {family: 'Default'})

screenWebSocket.on("open", async function () {
  while (true) {
    screenWebSocket.send(1);
    await sleep(20);
  }
});

await xmppClient.start();

const router = new Router({
  compose: new Compose(),
  contacts: new Contacts(),
  conversation: new Conversation(),
});

// await sendMessage(
//   `${process.env.USERNAME}@${process.env.DOMAIN}`,
//   "all systems go!"
// );
