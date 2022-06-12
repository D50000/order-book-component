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

    > span {
      width: 33%;
      text-align: end;
    }
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

  &.sell > div.container {
    &.blink-red {
      animation: blink-red-animation 0.2s;
    }

    > span:nth-child(1) {
      color: #ff5b5a;
    }
  }

  &.buy > div.container {
    &.blink-green {
      animation: blink-green-animation 0.2s;
    }

    > span:nth-child(1) {
      color: #00b15d;
    }
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

    > span {
      width: 33%;
      text-align: end;

      &.increase {
        animation: blink-green-animation 0.1s;
      }

      &.decrease {
        animation: blink-red-animation 0.1s;
      }
    }
  }

  @keyframes blink-green-animation {
    to {
      background: rgba(0, 177, 93, 0.5);
    }
  }

  @keyframes blink-red-animation {
    to {
      background: rgba(255, 91, 90, 0.5);
    }
  }
`;

export const LastPrice = styled.div`
  font-size: 16.8px;
  font-weight: 700;
  width: 100%;
  height: 28px;
  padding-left: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  &.increase {
    color: #00b15d;
    background: rgba(16, 186, 104, 0.12);
  }

  &.decrease {
    color: #ff5b5a;
    background: rgba(255, 90, 90, 0.12);
  }

  &.fair {
    color: #ffffff;
    background: rgba(134, 152, 170, 0.12);
  }

  > span {
    height: 21.5px;
  }

  > div {
    width: 15px;
    height: 24px;
    margin-left: 3px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.up {
      transform: rotate(180deg);
    }
  }
`;
