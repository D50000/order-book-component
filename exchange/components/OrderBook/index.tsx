import { FunctionComponent, useState } from "react";
import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import Image from "next/image";

import * as CurrencyFormat from "react-currency-format";

import { LastPrice, OrderBookContainer, Quote } from "./styles";
import { default as arrowGreen } from "../../assets/IconArrowGreen.svg";
import { default as arrowRed } from "../../assets/IconArrowRed.svg";

type Quote = {
  price: string;
  size: string;
  cumulativeTotal?: number;
};

interface OrderBookData {
  sellQuote: Quote[];
  lastPrice: string;
  gain: number;
  buyQuote: Quote[];
  symbol: string;
  timestamp: number;
  diffSellQuote: DiffQuoteMap<string>;
  diffBuyQuote: DiffQuoteMap<string>;
}

type DiffQuoteMap<T> = {
  T: {
    price: number;
    size: number;
    cumulativeTotal: number;
    isSizeChange: boolean;
    isNewRow: boolean;
  };
};

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
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const calculateData = (data: OrderBookData) => {
    // Calculate the buy/sell quote for GUI to implement the animation.
    const maxQuotes = 8;
    const newSellArray = [];
    let totalSellSize = 0;
    let diffSellQuote = {} as DiffQuoteMap<string>;
    const reversedSellQuote = data.sellQuote.reverse();
    const newBuyArray = [];
    let totalBuySize = 0;
    let diffBuyQuote = {} as DiffQuoteMap<string>;
    for (let i = 0; i < maxQuotes; i++) {
      // Sell quotes
      // 1. Parse and format the current order book data for GUI.
      totalSellSize += +reversedSellQuote[i].size;
      reversedSellQuote[i].cumulativeTotal = totalSellSize;
      newSellArray.push(reversedSellQuote[i]);
      // 2. Calculate and store the current order book snapshot.
      diffSellQuote[reversedSellQuote[i].price] = {
        price: +reversedSellQuote[i].price,
        size: +reversedSellQuote[i].size,
        cumulativeTotal: reversedSellQuote[i].cumulativeTotal,
        isSizeChange: false,
        isNewRow: false,
      };
      data.diffSellQuote = diffSellQuote;
      // Buy quotes
      // 1. Parse and format the current order book data for GUI.
      totalBuySize += +data.buyQuote[i].size;
      data.buyQuote[i].cumulativeTotal = totalBuySize;
      newBuyArray.push(data.buyQuote[i]);
      // 2. Calculate and store the current order book snapshot.
      diffBuyQuote[data.buyQuote[i].price] = {
        price: +data.buyQuote[i].price,
        size: +data.buyQuote[i].size,
        cumulativeTotal: data.buyQuote[i].cumulativeTotal,
        isSizeChange: false,
        isNewRow: false,
      };
      data.diffBuyQuote = diffBuyQuote;
    }
    // 3. Compare the difference between the current and previous's order book quote snapshot.
    const originalOrderBook = orderBookData;
    const currentOrderBook = data;
    if (originalOrderBook?.diffSellQuote && originalOrderBook?.diffBuyQuote) {
      for (const [key, value] of Object.entries(
        currentOrderBook.diffSellQuote
      )) {
        if (!originalOrderBook.diffSellQuote[key]) {
          currentOrderBook.diffSellQuote[key].isNewRow = true;
        } else {
          if (
            originalOrderBook.diffSellQuote[key].size !==
            currentOrderBook.diffSellQuote[key].size
          ) {
            currentOrderBook.diffSellQuote[key].isSizeChange = true;
          }
        }
      }
      for (const [key, value] of Object.entries(
        currentOrderBook.diffBuyQuote
      )) {
        if (!originalOrderBook.diffBuyQuote[key]) {
          currentOrderBook.diffBuyQuote[key].isNewRow = true;
        } else {
          if (
            originalOrderBook.diffBuyQuote[key].size !==
            currentOrderBook.diffBuyQuote[key].size
          ) {
            currentOrderBook.diffBuyQuote[key].isSizeChange = true;
          }
        }
      }
    }
    data.sellQuote = newSellArray.reverse();
    data.buyQuote = newBuyArray;
    // console.log(orderBookData);
    // console.log(currentOrderBook.gain);
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
            <CurrencyFormat
              value={sellQuote.price}
              displayType={"text"}
              thousandSeparator={true}
            />
            <CurrencyFormat
              value={sellQuote.size}
              displayType={"text"}
              thousandSeparator={true}
            />
            <CurrencyFormat
              value={sellQuote.cumulativeTotal}
              displayType={"text"}
              thousandSeparator={true}
            />
          </div>
        ))}
      </Quote>
      {(() => {
        switch (orderBookData?.gain) {
          case 1:
            return (
              <LastPrice className="increase">
                <CurrencyFormat
                  value={orderBookData?.lastPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                <div className="up">
                  <Image src={arrowGreen} />
                </div>
              </LastPrice>
            );
          case -1:
            return (
              <LastPrice className="decrease">
                <CurrencyFormat
                  value={orderBookData?.lastPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                <div className="down">
                  <Image src={arrowRed} />
                </div>
              </LastPrice>
            );
          default:
            return (
              <LastPrice className="fair">
                <CurrencyFormat
                  value={orderBookData?.lastPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                />
                <div className="none"></div>
              </LastPrice>
            );
        }
      })()}
      <Quote className="buy">
        {orderBookData.buyQuote?.map((buyQuote) => (
          <div className="container" key={buyQuote.price}>
            <CurrencyFormat
              value={buyQuote.price}
              displayType={"text"}
              thousandSeparator={true}
            />
            <CurrencyFormat
              value={buyQuote.size}
              displayType={"text"}
              thousandSeparator={true}
            />
            <CurrencyFormat
              value={buyQuote.cumulativeTotal}
              displayType={"text"}
              thousandSeparator={true}
            />
          </div>
        ))}
      </Quote>
    </OrderBookContainer>
  );
};

export default OrderBook;
