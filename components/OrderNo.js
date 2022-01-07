import { useEffect, useState } from "react";
import useDashboardDetails from "../hooks/useDashboardDetails";
import { useOrderNo } from "../hooks/useOrderNo";

// When an order is completed, an orange bar showing the order number appears across all pages
export default function OrderNumber() {
  const { data } = useDashboardDetails();
  const { orderNo, setOrderNo } = useOrderNo();
  const [found, setFound] = useState(false);

  useEffect(() => {
    // If there is both order number & data, see if you can find the order id
    if (orderNo && data) {
      const queueOrder = data.queue.find((order) => orderNo === order.id);
      const servingOrder = data.serving.find((order) => orderNo === order.id);
      // If the order is in neither the queue or being served, then setFound is false
      if (found) {
        if (!queueOrder && !servingOrder) {
          setFound(false);
          setOrderNo(undefined);
        }
        // If the order is in the queue or being served, then setFound is true
      } else if (queueOrder || servingOrder) {
        setFound(true);
      }
    }
  }, [data, found, orderNo, setOrderNo]);

  // If the order is still in the queue, show the "order number bar"
  if (orderNo) {
    return (
      <div className="order-number">
        <p className="sec-txt">{`Your order number is: ${orderNo}`}</p>
      </div>
    );
    // Otherwise don't show it
  } else return null;
}
