import axios from "axios";
import WebSocket from "ws";
import FormData from "form-data";

export const screenWebSocket = new WebSocket(
  "ws://192.168.8.245:8000/screen_interaction",
  {
    perMessageDeflate: true,
  }
);

export const requestRender = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image, "image.bmp");
    formData.append("description", "A test image upload");
    const response = await axios.post(
      "http://192.168.8.245:8000/request_render",
      formData,
      {
        headers: { ...formData.getHeaders() },
      }
    );
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
};

export type TouchData = {
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
};

