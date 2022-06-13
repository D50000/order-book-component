import { FunctionComponent, useState } from "react";
import { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import Image from "next/image";
import { Tooltip } from "@nextui-org/react";
import * as CurrencyFormat from "react-currency-format";

import { LastPrice, OrderBookContainer, Quote } from "./styles";
import { default as arrowGreen } from "../../assets/IconArrowGreen.svg";
import { default as arrowRed } from "../../assets/IconArrowRed.svg";
import QuoteInfo from "./QuoteInfo";

type Quote = {
  price: string;
  size: string;
  totalValue?: number;
  cumulativeTotalSize?: number;
  cumulativeTotalValue?: number;
  cumulativeTotalInPercent?: number;
};

export interface OrderBookData {
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
    sizeChange: SizeChange;
    isNewRow: boolean;
  };
};

enum SizeChange {
  "NORMAL" = "normal",
  "INCREASE" = "increase",
  "DECREASE" = "decrease",
}

const WSS_URL: string = "wss://ws.btse.com/ws/futures";
const WS_TOPIC = {
  op: "subscribe",
  args: ["orderBookApi:BTCPFC_0"],
};
const SINGLE_CONTRACT_UNIT = 1000;

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
    let totalSellValue = 0;
    let diffSellQuote = {} as DiffQuoteMap<string>;
    const reversedSellQuote = data.sellQuote.reverse();
    const newBuyArray = [];
    let totalBuySize = 0;
    let totalBuyValue = 0;
    let diffBuyQuote = {} as DiffQuoteMap<string>;
    for (let i = 0; i < maxQuotes; i++) {
      // Sell quotes
      // 1. Parse and format the current order book data for GUI.
      totalSellSize += +reversedSellQuote[i].size;
      reversedSellQuote[i].cumulativeTotalSize = totalSellSize;
      reversedSellQuote[i].totalValue =
        +reversedSellQuote[i].price * +reversedSellQuote[i].size;
      totalSellValue += reversedSellQuote[i].totalValue;
      reversedSellQuote[i].cumulativeTotalValue = totalSellValue;
      newSellArray.push(reversedSellQuote[i]);
      // 2. Calculate and store the current order book snapshot.
      diffSellQuote[reversedSellQuote[i].price] = {
        price: +reversedSellQuote[i].price,
        size: +reversedSellQuote[i].size,
        sizeChange: SizeChange.NORMAL,
        isNewRow: false,
      };
      data.diffSellQuote = diffSellQuote;
      // Buy quotes
      // 1. Parse and format the current order book data for GUI.
      totalBuySize += +data.buyQuote[i].size;
      data.buyQuote[i].cumulativeTotalSize = totalBuySize;
      data.buyQuote[i].totalValue =
        +data.buyQuote[i].price * +data.buyQuote[i].size;
      totalBuyValue += data.buyQuote[i].totalValue;
      data.buyQuote[i].cumulativeTotalValue = totalBuyValue;
      newBuyArray.push(data.buyQuote[i]);
      // 2. Calculate and store the current order book snapshot.
      diffBuyQuote[data.buyQuote[i].price] = {
        price: +data.buyQuote[i].price,
        size: +data.buyQuote[i].size,
        sizeChange: SizeChange.NORMAL,
        isNewRow: false,
      };
      data.diffBuyQuote = diffBuyQuote;
    }
    data.sellQuote = newSellArray.reverse();
    data.buyQuote = newBuyArray;
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
            originalOrderBook.diffSellQuote[key].size >
            currentOrderBook.diffSellQuote[key].size
          ) {
            currentOrderBook.diffSellQuote[key].sizeChange =
              SizeChange.DECREASE;
          } else if (
            originalOrderBook.diffSellQuote[key].size <
            currentOrderBook.diffSellQuote[key].size
          ) {
            currentOrderBook.diffSellQuote[key].sizeChange =
              SizeChange.INCREASE;
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
            originalOrderBook.diffBuyQuote[key].size >
            currentOrderBook.diffBuyQuote[key].size
          ) {
            currentOrderBook.diffBuyQuote[key].sizeChange = SizeChange.DECREASE;
          } else if (
            originalOrderBook.diffBuyQuote[key].size <
            currentOrderBook.diffBuyQuote[key].size
          ) {
            currentOrderBook.diffBuyQuote[key].sizeChange = SizeChange.INCREASE;
          }
        }
      }
    }
    // 4. Calculate the total size bar length.
    const largestSizePercentRatio =
      currentOrderBook.sellQuote[0].cumulativeTotalSize >
      currentOrderBook.buyQuote[maxQuotes - 1].cumulativeTotalSize
        ? 100 / currentOrderBook.sellQuote[0].cumulativeTotalSize
        : 100 / currentOrderBook.buyQuote[maxQuotes - 1].cumulativeTotalSize;
    for (let i = 0; i < currentOrderBook.sellQuote.length; i++) {
      currentOrderBook.sellQuote[i].cumulativeTotalInPercent =
        currentOrderBook.sellQuote[i].cumulativeTotalSize *
        largestSizePercentRatio;
    }
    for (let i = 0; i < currentOrderBook.buyQuote.length; i++) {
      currentOrderBook.buyQuote[i].cumulativeTotalInPercent =
        currentOrderBook.buyQuote[i].cumulativeTotalSize *
        largestSizePercentRatio;
    }
    // console.log(orderBookData);
    // console.log(currentOrderBook.gain);
    setOrderBookData(data);
  };

  const calculateSellQuoteTooltipData = (index: number) => {
    // const reversedSellQuote = orderBookData.sellQuote.reverse();
    // let sumTotalValue = 0;
    // let sumSize = 0;
    // for (let i = 0; i < reversedSellQuote.length - index; i++) {
    //   sumTotalValue += +orderBookData.sellQuote[i].totalValue;
    //   sumSize += +orderBookData.sellQuote[i].size;
    // }
    // const avgPrice = sumTotalValue / sumSize;
    console.log(
      orderBookData.sellQuote[index].cumulativeTotalValue /
        orderBookData.sellQuote[index].cumulativeTotalSize
    );
    console.log(orderBookData.sellQuote[index].cumulativeTotalValue);
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
        {orderBookData.sellQuote?.map((sellQuote, index) => (
          <div
            className={
              "container " +
              (orderBookData.diffSellQuote[sellQuote.price].isNewRow
                ? "blink-red"
                : "")
            }
            key={index}
          >
            <Tooltip
              // onMouseEnter={() => calculateSellQuoteTooltipData(index)}
              placement="rightStart"
              color="invert"
              content={
                <QuoteInfo orderBookData={orderBookData} index={index} />
              }
            >
              <CurrencyFormat
                value={sellQuote.price}
                displayType={"text"}
                thousandSeparator={true}
              />
              <CurrencyFormat
                className={
                  orderBookData.diffSellQuote[sellQuote.price].sizeChange
                }
                value={sellQuote.size}
                displayType={"text"}
                thousandSeparator={true}
              />
              <CurrencyFormat
                value={sellQuote.cumulativeTotalSize}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <div className="total-size-bar">
                    <span className="size">{value}</span>
                    <div
                      className="bar"
                      style={{ width: sellQuote.cumulativeTotalInPercent }}
                    ></div>
                  </div>
                )}
              />
            </Tooltip>
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
        {orderBookData.buyQuote?.map((buyQuote, index) => (
          <div
            className={
              "container " +
              (orderBookData.diffBuyQuote[buyQuote.price].isNewRow
                ? "blink-green"
                : "")
            }
            key={index}
          >
            <Tooltip
              // onMouseEnter={() => calculateSellQuoteTooltipData(index)}
              placement="rightStart"
              color="invert"
              content={
                <QuoteInfo orderBookData={orderBookData} index={index} />
              }
            >
              <CurrencyFormat
                value={buyQuote.price}
                displayType={"text"}
                thousandSeparator={true}
              />
              <CurrencyFormat
                className={
                  orderBookData.diffBuyQuote[buyQuote.price].sizeChange
                }
                value={buyQuote.size}
                displayType={"text"}
                thousandSeparator={true}
              />
              <CurrencyFormat
                value={buyQuote.cumulativeTotalSize}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value) => (
                  <div className="total-size-bar">
                    <span className="size">{value}</span>
                    <div
                      className="bar"
                      style={{ width: buyQuote.cumulativeTotalInPercent }}
                    ></div>
                  </div>
                )}
              />
            </Tooltip>
          </div>
        ))}
      </Quote>
    </OrderBookContainer>
  );
};
export default OrderBook;
