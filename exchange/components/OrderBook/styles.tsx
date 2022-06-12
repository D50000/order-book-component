import styled from "styled-components";

export const OrderBookContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1e2c4c;
  color: #ffffff;

  .title {
    height: 33px;
    width: 100%;
    padding-left: 10px;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #1b2338;
  }

  .quote-table-head {
    color: #8698aa;
    width: 100%;
    height: 21px;
    padding: 5px 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Quote = styled.div`
  color: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.sell > div.container > span:nth-child(1) {
    color: #ff5b5a;
  }

  &.buy > div.container > span:nth-child(1) {
    color: #00b15d;
  }

  > div.container {
    width: 100%;
    height: 21px;
    padding: 1px 10px 2px;
    display: flex;
    justify-content: space-between;

    &:hover {
      background: #334573;
      cursor: pointer;
    }
  }
`;

export const LastPrice = styled.div`
  color: #8698aa;
  font-size: 16.8px;
  width: 100%;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    height: 21.5px;
  }
`;
