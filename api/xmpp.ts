import { client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";

export const xmppClient = client({
  service: process.env.SERVICE_URI,
  domain: process.env.DOMAIN,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

debug(xmppClient, true);

xmppClient.on("error", (err) => {
  console.error(err);
});

xmppClient.on("offline", () => {
  console.log("offline");
});

xmppClient.on("stanza", onStanza);
async function onStanza(stanza) {
  if (stanza.is("message")) {
    xmppClient.removeListener("stanza", onStanza);
    await xmppClient.send(xml("presence", { type: "unavailable" }));
    await xmppClient.stop();
  }
}

xmppClient.on("online", async (address) => {
  console.log("online as", address.toString());

  // Makes itself available
  await xmppClient.send(xml("presence"));

});


export const sendMessage = async (address:string, message: string) => {
  const messageXML = xml(
    "message",
    { type: "chat", to: address },
    xml("body", {}, message)
  );
  await xmppClient.send(messageXML)
}