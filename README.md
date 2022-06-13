# order-book-component

Create a trading order book component in react.js

## Instruction

1. Go in side the `exchange` directory.
2. Clone the source code.
3. Run `npm install`.
4. Run `npm run dev`.

## Requirements

- ✅ Framework: React, Vue.js. ⇒ Develop React.js with Next.js
- ✅ Show max 8 quotes for both buy and sell. Quote row should vertical align center. ⇒ CSS flex
- ✅ Format number with commas as thousands separators. ⇒ data pipe line
- ✅ Add hover background color on whole row when mouse hover on the quote. ⇒ CSS hover with accumulative rows
- ✅ Last price is up or down is determine by the data `gain` . ⇒ toggle the up/down icon, **_no 0_**
- _Price percentage change can be omitted._
- ✅ Quote total formula ⇒ simple order book logic
  - Sell quotes: sum up quote size from lowest price quote to the highest
  - Buy quotes: sum up quote size from highest price quote to the lowest
- ✅ Add hover calculation tooltip ⇒ Need to get the dynamic data when hovering
  - AVG Price = [sumproduct](https://support.microsoft.com/en-us/office/sumproduct-function-16753e75-9f68-4874-94ac-4d2145a2fd2e)( price \* size ) / total
  - Total Value = [sumproduct](https://support.microsoft.com/en-us/office/sumproduct-function-16753e75-9f68-4874-94ac-4d2145a2fd2e)( price \* size )
  * [sumproduct reference](https://support.microsoft.com/en-us/office/sumproduct-function-16753e75-9f68-4874-94ac-4d2145a2fd2e) (see Example 1)
- ✅ Use mock data and a data update timer to present the following animations.
  - When new quote appear(price hasn't shown on the order book before), add highlight animation on whole quote row. Red background color for sell quote. Green background color for buy quote. ⇒ Need to handle before data update
  - When quote size change, add highlight animation on size cell. Red background color if size increase. Green background color if size decrease. ⇒ detect the size is update

* Bonus point for using [webpack-dev-server proxy](https://webpack.js.org/configuration/dev-server/#devserverproxy) connect order book API:

[https://api.btse.com/futures/api/v2.1/orderbook/L2](https://api.btse.com/futures/api/v2.1/orderbook/L2)

✅ \*\* Bonus point for connecting to Websocket API:

Endpoint: `wss://ws.btse.com/ws/futures`

Topic: `orderBook:BTCPFC_0`

### Additional:

1. ✅ Write Doc.
2. Add the unit test.
3. Host a server for demo.
4. CI/CD
5. ✅ convert to [txs](https://nextjs.org/docs/basic-features/typescript) file

### note:

nvm: "v16.14.2"
react: "17.0.2"
react-use-websocket: "^3.0.0"
styled-components: "^5.3.5"
react-currency-format: "^1.1.0"
