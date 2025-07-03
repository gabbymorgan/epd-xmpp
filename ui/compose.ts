import fs from "fs";
import { Page } from "./pages.ts";
import { requestRender } from "../api/epd.ts";

export default class Compose extends Page {
  constructor() {
    super();
    this.title = "Compose";
    this.background = "assets/compose-display.bmp";
  }

  mount() {
    requestRender(this.background);
  }
  
}
