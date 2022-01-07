import ProductList from "../components/Productlist";
import { useBasket } from "../hooks/useBasket";
import useBeers from "../hooks/useBeers";

function Showproducts() {
  const { addProduct } = useBasket();
  const { data: products } = useBeers();
  if (!products)
    return (
      <div>
        <h2 className="center">Loading...</h2>
      </div>
    );

  return (
    <div className="App">
      <main>
        <ProductList addToBasket={addProduct} products={products} />
      </main>
    </div>
  );
}

export default Showproducts;
