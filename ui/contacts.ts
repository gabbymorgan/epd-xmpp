import { Page } from "./pages.ts";
import { requestRender } from "../api/epd.ts";
import type { TouchData } from "../api/epd.ts";
import { createCanvas, loadImage } from "canvas";
import fs from "fs";
import { roster } from "../api/xmpp.ts";
import { sleep } from "../helpers.ts";

export default class Contacts extends Page {
  roster?: object[];
  currentContactIndex: number;

  constructor() {
    super();
    this.title = "Contacts";
    this.background = "assets/contacts-display.bmp";
    this.currentContactIndex = 0;
  }

  async mount() {
    await this.update()
  }

  async update() {
    const background = await loadImage(this.background);
    const canvas = createCanvas(250, 122);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(background, 0, 0);
    ctx.font = "12pt Default";
    ctx.fillStyle = "black";
    ctx.fillText(roster[this.currentContactIndex]?.attrs.jid, 0, 50);
    const canvasBuffer = canvas.toBuffer();
    requestRender(canvasBuffer);
  }

  touchHandler(data: TouchData): void {
    if (data.did_tap && data.tap_x)
      if (data.tap_x > 90) {
        if (data.tap_y < 40) {
          this.currentContactIndex = Math.min(this.currentContactIndex+1, this.roster.length - 1)
          this.update()
        } else if (data.tap_y > 210) {
          this.currentContactIndex = Math.max(this.currentContactIndex-1, 0)
          this.update()
        }
      } else {
        console.log("select");
      }
  }

  xmppStanzaHandler = (stanza) => {
    if (stanza.attrs.id == "roster_0") {
      this.roster = stanza.children[0].children;
      this.mount()
      console.log(roster[0].attrs);
    }
  }
}
