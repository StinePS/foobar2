import "../sass/main.scss";
import "react-credit-cards/lib/styles.scss";
import { BasketContext } from "../hooks/useBasket";
import { useState } from "react";
import Head from "next/head";
import Nav from "../components/Nav.js";
import OrderNumber from "../components/OrderNo";
import PageTitle from "../components/PageTitle";
import { OrderContext } from "../hooks/useOrderNo";

function MyApp({ Component, pageProps }) {
  const [basket, setBasket] = useState([]);
  const [orderNo, setOrderNo] = useState(undefined);

  return (
    <BasketContext.Provider value={{ basket, setBasket }}>
      <OrderContext.Provider value={{ orderNo, setOrderNo }}>
        <Head>
          <title>Foobar</title>
          <meta name="description" content="A school project" />
        </Head>
        <Nav />
        <OrderNumber />
        <PageTitle />
        <Component {...pageProps} />
      </OrderContext.Provider>
    </BasketContext.Provider>
  );
}

export default MyApp;
