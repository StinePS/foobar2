import React, { useContext } from "react";

// Use createContext to make data about the final order number available globally on the site (avoiding having to pass props)
//https://reactjs.org/docs/context.html
export const OrderContext = React.createContext();

export function useOrderNo() {
  const { orderNo, setOrderNo } = useContext(OrderContext);

  return {
    orderNo,
    setOrderNo,
  };
}
