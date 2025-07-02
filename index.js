import { client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";
import axios from "axios"
import WebSocket from 'ws';

const screen_ws = new WebSocket('ws://192.168.8.245:8000/screen_interaction', {
  perMessageDeflate: false
});

screen_ws.on("message", function message(data) {
    console.log(JSON.parse(data))
})

const xmpp = client({
  service: process.env.SERVICE_URI,
  domain: process.env.DOMAIN,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});


debug(xmpp, true);

xmpp.on("error", (err) => {
  console.error(err);
});

xmpp.on("offline", () => {
  console.log("offline");
});

xmpp.on("stanza", onStanza);
async function onStanza(stanza) {
  if (stanza.is("message")) {
    xmpp.removeListener("stanza", onStanza);
    await xmpp.send(xml("presence", { type: "unavailable" }));
    await xmpp.stop();
  }
}

xmpp.on("online", async (address) => {
  console.log("online as", address.toString());

  // Makes itself available
  await xmpp.send(xml("presence"));

  // Sends a chat message to itself
  const message = xml(
    "message",
    { type: "chat", to: address },
    xml("body", {}, "hello world")
  );
  await xmpp.send(message);
});

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

await xmpp.start();
while(true) {
    await sleep(20);
    screen_ws.send(1)
}