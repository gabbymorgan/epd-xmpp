import fs from "fs";
import { Page } from "./pages.ts";

export default class Contacts extends Page {
  constructor() {
    super();
    this.title = "Contacts";
    // this.background = fs.readFileSync("assets/contacts-display.bmp");
  }
}
