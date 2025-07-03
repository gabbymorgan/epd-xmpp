import { client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";

export const xmppClient = client({
  service: process.env.SERVICE_URI,
  domain: process.env.DOMAIN,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
});

export let roster = [];

// debug(xmppClient, true);

xmppClient.on("error", (err) => {
  console.error(err);
});

xmppClient.on("offline", () => {
  console.log("offline");
});

xmppClient.on("stanza", onStanza);
async function onStanza(stanza) {
  if (stanza.attrs.id == "roster_0") {
    roster = stanza.children[0].children;
    console.log(roster[0].attrs)
  }
  if (!stanza.is("message")) return;

  const { to, from } = stanza.attrs;
  stanza.attrs.from = to;
  stanza.attrs.to = from;
  xmppClient.send(stanza);
}

xmppClient.on("online", async (address) => {
  console.log("online as", address.toString());
  // Makes itself available
  await xmppClient.send(xml("presence"));
  await getContacts();
});

export const sendMessage = async (address: string, message: string) => {
  const messageXML = xml(
    "message",
    { type: "chat", to: address },
    xml("body", {}, message)
  );
  await xmppClient.send(messageXML);
};

export const getContacts = async () => {
  const rosterXML = xml(
    "iq",
    { id: "roster_0", type: "get" },
    xml("query", {
      xmlns: "jabber:iq:roster",
    })
  );
  await xmppClient.send(rosterXML);
};
