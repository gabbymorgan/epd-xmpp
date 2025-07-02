import WebSocket from "ws";

export const screenWebSocket = new WebSocket('ws://192.168.8.245:8000/screen_interaction', {
  perMessageDeflate: true
});


screenWebSocket.on("message", function(data) {
    const screenData = JSON.parse(data)
    if (screenData.did_tap) {
        console.log("tap")
    } else if (screenData.did_swipe) {
      console.log("swipe!")
    }
})
