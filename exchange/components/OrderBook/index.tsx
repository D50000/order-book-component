import { FunctionComponent, useState } from "react";
import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

import { LastPrice, OrderBookContainer, Quote } from "./styles";
// import {} from "../../assets/"

type Quote = {
  price: string;
  size: string;
  cumulativeTotal?: number;
};

interface OrderBookData {
  buyQuote: Quote[];
  gain: number;
  lastPrice: string;
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
  const [orderBookData, setOrderBookData] = useState({} as OrderBookData);
  const { sendJsonMessage } = useWebSocket(WSS_URL, {
    onOpen: () => console.log("WebSocket connection opened."),
    onClose: () => console.log("WebSocket connection closed."),
    shouldReconnect: (closeEvent) => true,
    onMessage: (event: WebSocketEventMap["message"]) => getMessages(event.data),
  });

  const getMessages = (message: string) => {
    try {
      const messageObject = JSON.parse(message);
      if (messageObject?.data) {
        calculateData(messageObject.data);
      }
      // console.log(currentOrderBook?.lastPrice);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const calculateData = (data: OrderBookData) => {
    const maxQuotes = 8;
    const newSellArray = [];
    let totalSellSize = 0;
    for (
      let i = data.sellQuote.length - 1;
      i >= data.sellQuote.length - maxQuotes;
      i--
    ) {
      totalSellSize += +data.sellQuote[i].size;
      data.sellQuote[i].cumulativeTotal = totalSellSize;
      newSellArray.push(data.sellQuote[i]);
    }
    data.sellQuote = newSellArray;

    const newBuyArray = [];
    let totalBuySize = 0;
    for (let i = 0; i <= maxQuotes - 1; i++) {
      totalBuySize += +data.buyQuote[i].size;
      data.buyQuote[i].cumulativeTotal = totalBuySize;
      newBuyArray.push(data.buyQuote[i]);
    }
    data.buyQuote = newBuyArray;
    setOrderBookData(data);
  };

  // fetch the ws when componentDidMount, componentDidUpdate trigger
  useEffect(() => {
    sendJsonMessage(WS_TOPIC);
  }, [WS_TOPIC]);

  return (
    <OrderBookContainer>
      <div className="title">Order Book</div>
      <div className="quote-table-head">
        <span>Price {"(USD)"}</span>
        <span>Size</span>
        <span>Total</span>
      </div>
      <Quote className="sell">
        {orderBookData.sellQuote?.map((sellQuote) => (
          <div className="container" key={sellQuote.price}>
            <span>{sellQuote.price}</span>
            <span>{sellQuote.size}</span>
            <span>{sellQuote.cumulativeTotal}</span>
          </div>
        ))}
      </Quote>

      <LastPrice>
        <span>{orderBookData?.lastPrice}</span>
        <div> {"<  >"} </div>
      </LastPrice>

      <Quote className="buy">
        {orderBookData.buyQuote?.map((buyQuote) => (
          <div className="container" key={buyQuote.price}>
            <span>{buyQuote.price}</span>
            <span>{buyQuote.size}</span>
            <span>{buyQuote.cumulativeTotal}</span>
          </div>
        ))}
      </Quote>
    </OrderBookContainer>
  );
};

export default OrderBook;
