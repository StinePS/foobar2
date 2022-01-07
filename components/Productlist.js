import Link from "next/link";
import Product from "../components/Product";

export default function ProductList(props) {
  return (
    <section className="sec-bg rounded-corners">
      <h1 className="header center page-header">What can we get you?</h1>
      <div className="grid-2">
        {props.products.map((product) => (
          <Product addToBasket={props.addToBasket} key={product.name} {...product} />
        ))}
      </div>
      <div className="btn-container center">
        <Link href="/cart">
          <a className="btn">See your cart</a>
        </Link>
      </div>
    </section>
  );
}
