// import { useBasket } from "../hooks/useBasket";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";

export default function ThankYou() {
  const { query } = useRouter();
  const data = [];
  return (
    <>
      {!data ? (
        <div>
          <h2 className="center">Your order will be displayed in a few moments</h2>
        </div>
      ) : null}
      {data ? (
        <main>
          <section>
            <div className="sec-bg rounded-corners">
              <div className="progress">
                <p>Step 3 of 3</p>
              </div>
              <h2 className="header center">Thank you for your order!</h2>
              <p className="center margin-bottom">
                Your order number is <span className="txt-strong">{query.id}</span>
              </p>
              <p className="center">You can follow your order on the dashboard</p>
              <div className="btn-container center">
                <Link href="/">
                  <a className="btn">Dashboard</a>
                </Link>
              </div>
            </div>
          </section>
        </main>
      ) : null}
    </>
  );
}
