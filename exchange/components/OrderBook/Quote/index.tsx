import { FunctionComponent } from "react";
import { Tooltip } from "@nextui-org/react";
import * as CurrencyFormat from "react-currency-format";

import { OrderBookData } from "../index";
import { Box } from "./styles";

interface QuoteProp {
  // orderBookData: OrderBookData;
  // quoteType: any;
}

const QuoteC: FunctionComponent<QuoteProp> = ({
}): JSX.Element => {
  return (
    <Box >
      {/* {orderBookData.sellQuote?.map((sellQuote) => (
        <div
          className={
            "container " +
            (orderBookData.diffSellQuote[sellQuote.price].isNewRow
              ? "blink-red"
              : "")
          }
          key={sellQuote.price}
        >
          <Tooltip content="LLLLLLLLLLL" placement="rightStart" color="primary">
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
              value={sellQuote.cumulativeTotal}
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
      ))} */}
    </Box>
  );
};
export default QuoteC;
