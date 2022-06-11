import { FunctionComponent } from "react";
import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

import { LastPrice, OrderBookContainer, Quote } from "./styles";
// import {} from "../../assets/"

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
    // console.log(webSocketData);
  };

  return (
    <OrderBookContainer>
      <div className="title">Order Book</div>
      <div className="quote-table-head">
        <span>Price {"(USD)"}</span>
        <span>Size</span>
        <span>Total</span>
      </div>
      <Quote className="sell">
        <div className="container">
          <span>43210</span>
          <span>200</span>
          <span>5000</span>
        </div>
        <div className="container">
          <span>43210</span>
          <span>200</span>
          <span>5000</span>
        </div>
      </Quote>

      <LastPrice>
        <span>28589</span>
        <div> {"<  >"} </div>
      </LastPrice>

      <Quote className="buy">
        <div className="container">
          <span>43210</span>
          <span>200</span>
          <span>5000</span>
        </div>
        <div className="container">
          <span>43210</span>
          <span>200</span>
          <span>5000</span>
        </div>
      </Quote>
    </OrderBookContainer>
  );
};

export default OrderBook;
