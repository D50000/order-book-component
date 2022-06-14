import { FunctionComponent } from "react";
import * as CurrencyFormat from "react-currency-format";

import { OrderBookData } from "../index";
import { Container } from "./styles";

interface QuoteInfoProp {
  orderBookData: OrderBookData;
  index: number;
}

const QuoteInfo: FunctionComponent<QuoteInfoProp> = ({
  orderBookData,
  index,
}): JSX.Element => {
  return (
    <Container>
      <span>
        Avg Price:{" "}
        <CurrencyFormat
          value={
            orderBookData.sellQuote[index].cumulativeTotalValue /
            orderBookData.sellQuote[index].cumulativeTotalSize
          }
          displayType={"text"}
          thousandSeparator={true}
          suffix=" USD"
          decimalScale={1}
        />
      </span>
      <span>
        Total Value:{" "}
        <CurrencyFormat
          value={orderBookData.sellQuote[index].cumulativeTotalValue}
          displayType={"text"}
          thousandSeparator={true}
          suffix=" USD"
          decimalScale={1}
        />
      </span>
    </Container>
  );
};
export default QuoteInfo;
