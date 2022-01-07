import React, { useContext } from "react";
import { useCallback } from "react";

// Use createContext to make data about the basket available globally on the site (avoiding having to pass props)
//https://reactjs.org/docs/context.html
export const BasketContext = React.createContext();

export function useBasket() {
  const { basket, setBasket } = useContext(BasketContext);

  let totalPrice = 0;
  let totalItems = 0;
  basket?.forEach((item) => {
    totalItems += item.amount || 0;
    totalPrice += item.amount * item.price;
  });

  const clearBasket = useCallback(() => {
    setBasket([]);
  }, [setBasket]);

  const addProduct = useCallback(
    (product) => {
      //lav en kopi
      let nextState = [...basket];

      //tjek om øl allerede er i basket
      const existing = nextState.find((item) => item.name === product.name);

      if (existing) {
        //fandt den
        existing.amount = existing.amount + 1;
      } else {
        //findes ikke
        product.amount = 1;
        nextState = nextState.concat(product);
      }

      setBasket(nextState);
    },
    [basket, setBasket]
  );

  const removeProduct = useCallback(
    (product) => {
      //lav en kopi
      let nextState = [...basket];

      //tjek om øl er i basket
      const existingIndex = nextState.findIndex((item) => item.name === product.name);

      if (product) {
        //fjern 1 fra basket
        product.amount = product.amount - 1;
      }
      if (product.amount === 0) {
        //der er 0 tilbage, fjern denne øl "helt" fra basket
        nextState.splice(existingIndex, 1);
      }

      setBasket(nextState);
    },
    [basket, setBasket]
  );

  return {
    addProduct,
    removeProduct,
    clearBasket,
    basket,
    setBasket,
    totalPrice,
    totalItems,
  };
}
