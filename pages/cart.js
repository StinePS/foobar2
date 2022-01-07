import Basket from "../components/Basket";
import Link from "next/link";

function BasketPage() {
  return (
    <div className="App">
      <main>
        <section className="sec-bg rounded-corners">
          <div className="progress">
            <p>Step 1 of 3</p>
          </div>
          <Basket />
          <div className="btn-container center">
            <Link href="/showproducts">
              <a className="btn">Back to beers</a>
            </Link>
            <Link href="/checkout">
              <a className="btn">Payment details</a>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BasketPage;
