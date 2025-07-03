import fs from "fs";
import { Page } from "./pages.ts";

export default class Conversation extends Page {
  constructor() {
    super();
    this.title = "Conversation";
    // this.background = fs.readFileSync("assets/conversation-display.bmp");
  }
}