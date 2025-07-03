import { requestRender, screenWebSocket, TouchData } from "../api/epd.ts";

export default class Router {
  pages: Pages;
  currentPage: Page
  prevPage: Page | null;

  constructor(pages) {
    this.pages = pages;
    this.currentPage = this.pages.contacts;

    screenWebSocket.on("message", (data) => {
      const touchData = JSON.parse(data);
      this.currentPage.touchHandler(touchData);
    });
  }

  navigateTo(key: pageKey) {
    this.prevPage = this.currentPage;
    this.currentPage = this.pages[key];
    this.prevPage.dismount();
    this.currentPage.mount();

    screenWebSocket.removeAllListeners("message")

    screenWebSocket.on("message", (data) => {
      const touchData = JSON.parse(data);
      this.currentPage.touchHandler(touchData);
    });
  }
}

export class Page {
  title: pageTitle;
  background: Buffer<ArrayBuffer>;

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
}

type pageTitle = "Compose" | "Contacts" | "Conversation";

type pageKey = "compose" | "contacts" | "conversation";

interface Pages {
  [key: string]: Page;
}
