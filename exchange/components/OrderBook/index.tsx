import { FunctionComponent } from "react";
import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

const WSS_URL: string = "wss://ws.btse.com/ws/futures";
const WS_TOPIC = {
  op: "subscribe",
  args: ["orderBookApi:BTCPFC_0"],
};

const OrderBook: FunctionComponent = (): JSX.Element => {
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    WSS_URL,
    {
      onOpen: () => {
        sendMessage(JSON.stringify(WS_TOPIC));
        console.log("WebSocket connection opened.");
      },
      onClose: () => console.log("WebSocket connection closed."),
      shouldReconnect: (closeEvent) => true,
      onMessage: (event: WebSocketEventMap["message"]) =>
        processMessages(event),
    }
  );

  const processMessages = (event: { data: string }) => {
    const response = JSON.parse(event.data);
    console.log(response);
    // if (response.numLevels) {
    //   dispatch(addExistingState(response));
    // } else {
    //   process(response);
    // }
  };

  return (
    <div>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
      <span>order!!Book!!</span>
    </div>
  );
};

export default OrderBook;
