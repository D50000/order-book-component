import styled from "styled-components";

export const box = styled.div`
  color: #ffffff;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  &.sell > div.container {
    &.blink-red {
      animation: blink-red-animation 0.2s;
    }

    > div > span:nth-child(1) {
      color: #ff5b5a;
    }

    .total-size-bar .bar {
      background: rgba(255, 90, 90, 0.12);
    }
  }

  &.buy > div.container {
    &.blink-green {
      animation: blink-green-animation 0.2s;
    }

    > div > span:nth-child(1) {
      color: #00b15d;
    }

    .total-size-bar .bar {
      background: rgba(16, 186, 104, 0.12);
    }
  }

  > div.container > div {
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

    .total-size-bar {
      display: flex;
      width: 33%;
      position: relative;

      > span.size {
        width: 100%;
        text-align: end;
      }

      > div.bar {
        z-index: 2;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 5px;
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
