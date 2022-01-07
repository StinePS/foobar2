import { useBasket } from "../hooks/useBasket";

export default function Basket() {
  const { basket, addProduct, removeProduct, totalItems, totalPrice } = useBasket();

  return (
    // For each product in the basket, create an article with the name of the product and a + and - button. Calculate total number of items and price.
    <div>
      <h1 className="header center page-header">Your cart</h1>
      <div className="cart-container">
        {basket.map((product) => (
          <article key={product.name} className="flex-between cart-article">
            <div>
              <h2>{product.name} </h2>
            </div>
            <div>
              <button className="btn-math" onClick={() => removeProduct(product)}>
                {" "}
                -{" "}
              </button>{" "}
              {product.amount}{" "}
              <button className="btn-math" onClick={() => addProduct(product)}>
                {" "}
                +{" "}
              </button>
            </div>
          </article>
        ))}
        <p className="cart-p">Total: {totalItems} items</p>
        <p className="cart-p">Kr. {totalPrice},-</p>
      </div>
    </div>
  );
}
