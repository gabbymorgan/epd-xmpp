import fs from "fs";
import { Page } from "./pages.ts";
import { requestRender } from "../api/epd.ts";
import type { TouchData } from "../api/epd.ts";

export default class Contacts extends Page {
  constructor() {
    super();
    this.title = "Contacts";
    this.background = "assets/contacts-display.bmp";
  }

  mount() {
    requestRender(this.background)
  }

  touchHandler(data: TouchData): void {
    if (data.did_tap && data.tap_x)
      if (data.tap_x > 90) {
            if(data.tap_y < 40) {
          console.log("right")
        } else if (data.tap_y > 210) {
          console.log("left")
        } 
      }
     else {
      console.log("select")
    }
  }
}
