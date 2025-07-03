import fs from "fs";
import { Page } from "./pages.ts";
import { requestRender } from "../api/epd.ts";

export default class Conversation extends Page {
  constructor() {
    super();
    this.title = "Conversation";
    this.background = "assets/conversation-display.bmp";
  }

  mount() {
    requestRender(this.background);
  }
}
