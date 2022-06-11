import { FunctionComponent } from "react";
import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

import {} from "./styles";

type Quote = {
  price: string;
  size: string;
};

interface WebSocketData {
  buyQuote: Quote[];
  gain: number;
  LastPrice: string;
  sellQuote: Quote[];
  symbol: string;
  timestamp: number;
}

const WSS_URL: string = "wss://ws.btse.com/ws/futures";
const WS_TOPIC = {
  op: "subscribe",
  args: ["orderBookApi:BTCPFC_0"],
};

const OrderBook: FunctionComponent = (): JSX.Element => {
  const { sendJsonMessage } = useWebSocket(WSS_URL, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap["message"]) => parseMessages(event),
  });

  useEffect(() => {
    sendJsonMessage(WS_TOPIC);
  }, [WS_TOPIC]);

  const parseMessages = (event: { data: string }) => {
    const webSocketData: WebSocketData = JSON.parse(event.data).data;
    console.log(webSocketData);
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
