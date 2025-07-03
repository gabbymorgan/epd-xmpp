import fs from "fs";
import { Page } from "./pages.ts";

export default class Compose extends Page {
  constructor() {
    super();
    this.title = "Compose";
    // this.background = fs.readFileSync("assets/compose-display.bmp");
  }
}
