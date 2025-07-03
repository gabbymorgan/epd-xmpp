import axios from "axios";
import WebSocket from "ws";

export const screenWebSocket = new WebSocket(
  "ws://192.168.8.245:8000/screen_interaction",
  {
    perMessageDeflate: true,
  }
);

export const requestRender = async (image) => {
  const response = await axios.post("http://192.168.8.245/request_render", {
    image,
  });
  console.log(response);
};

export interface TouchData {
  last_touched: number | undefined;
  is_touching: boolean;
  has_been_touching: boolean;
  touch_start_x: number | undefined;
  touch_start_y: number | undefined;
  touch_end_x: number | undefined;
  touch_end_y: number | undefined;
  did_swipe: boolean;
  swipe_direction: string | undefined;
  did_tap: boolean;
  tap_x: number | undefined;
  tap_y: number | undefined;
}
