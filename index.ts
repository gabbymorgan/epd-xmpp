import { client, xml } from "@xmpp/client";
import debug from "@xmpp/debug";
import axios from "axios"

import { sendMessage, xmppClient } from "./api/xmpp.ts"; 
import { screenWebSocket } from "./api/touchInterface.ts";
import { sleep } from "./helpers.ts";

await xmppClient.start();
await sendMessage(`${process.env.USERNAME}@${process.env.DOMAIN}`, "all systems go!")
