import { xml } from "@xmpp/client";

export const composeMessage = async (address, message: string) => xml(
    message,
    { type: "chat", to: address },
    xml("body", {}, "bot online")
  );
