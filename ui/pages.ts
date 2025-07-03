import { requestRender, screenWebSocket } from "../api/epd.ts";
import type { TouchData } from "../api/epd.ts";
import { xmppClient } from "../api/xmpp.ts";

export default class Router {
  pages: Pages;
  currentPage: Page | null;
  prevPage: Page | null;

  constructor(pages: Pages) {
    this.pages = pages;
    this.currentPage = null;
    this.navigateTo("contacts");
    for (let pageIndex in this.pages) {
      xmppClient.on("stanza", this.pages[pageIndex].xmppStanzaHandler);
    }
  }

  navigateTo(key: pageKey) {
    this.prevPage = this.currentPage;
    this.currentPage = this.pages[key];
    this.prevPage?.dismount();
    this.currentPage.mount();

    screenWebSocket.removeAllListeners("message");

    screenWebSocket.on("message", (data) => {
      const touchData = JSON.parse(data);
      this.currentPage.touchHandler(touchData);
    });
  }
}

export class Page {
  title: pageTitle;
  background: string;

  constructor() {}

  mount() {
    requestRender(this.background);
  }

  update() {}

  dismount() {}

  touchHandler(data: TouchData) {
    if (data.did_tap) {
      console.log("touch!");
    } else if (data.did_swipe) {
      console.log("swipe!");
    }
  }

  xmppStanzaHandler(stanza) {}
}

type pageTitle = "Compose" | "Contacts" | "Conversation";

type pageKey = "compose" | "contacts" | "conversation";

interface Pages {
  [key: string]: Page;
};
