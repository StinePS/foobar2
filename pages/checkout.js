import { useRouter } from "next/dist/client/router";
import { useRef, useState } from "react";
import Cards from "react-credit-cards";
import Link from "next/link";
import { useBasket } from "../hooks/useBasket";
import { useOrderNo } from "../hooks/useOrderNo";

// Add format "0000 0000 0000 0000" to credit card number
function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}
export function formatCreditCardNumber(value) {
  if (!value) return "";
  const clearValue = clearNumber(value);
  let nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4, 8)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
  return nextValue.trim();
}

export default function Checkout() {
  // Credit card animation made with a mix of https://www.npmjs.com/package/react-credit-cards and what we learned in class
  const router = useRouter();
  const { basket, clearBasket } = useBasket();
  const { setOrderNo } = useOrderNo();
  const form = useRef(null);

  const [cardNumber, setCardnumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");

  const handleNameChanged = (e) => {
    setName(e.target.value);
  };

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  async function onSubmit(e) {
    e.preventDefault();
    if (form.current.checkValidity()) {
      const data = basket.map((item) => ({
        name: item.name,
        amount: item.amount,
      }));
      const response = await fetch("https://barcode-data.herokuapp.com/order", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      // If submit went well, then push order
      if (response.ok) {
        clearBasket();
        const json = await response.json();
        setOrderNo(json.id);
        router.push(`/thanks?id=${json.id}`);
      } else {
        // If not, show error message
        <div>
          <h2 className="center">{`We're sorry - An error has occured!`}</h2>
        </div>;
      }
    }
  }

  return (
    <main>
      <section>
        <div className="sec-bg rounded-corners">
          <div className="progress">
            <p>Step 2 of 3</p>
          </div>
          <div id="PaymentForm" className="grid-2">
            <div className="column">
              <Cards cvc={cvc} expiry={expiry} focused={focus} name={name} number={cardNumber} />
            </div>
            <div className="column">
              <form ref={form} onSubmit={onSubmit}>
                <fieldset>
                  <label htmlFor="cardnumber">Card number</label>
                  <input
                    className="form-input"
                    id="cardnumber"
                    type="tel"
                    placeholder="1234 5678 1234 5678"
                    required
                    onChange={(e) => {
                      setCardnumber(formatCreditCardNumber(e.target.value));
                      if (e.target.checkValidity()) {
                        document.querySelector("#expiry").focus();
                      }
                    }}
                    name="cardNumber"
                    value={cardNumber}
                    onFocus={handleInputFocus}
                    pattern="[\d| ]{19}"
                    maxLength="19"
                  />
                  <span className="hint">Please enter a valid card number (16 digits)</span>
                </fieldset>

                <fieldset className="grid-2">
                  <div>
                    <label htmlFor="expiry">Expiry</label>
                    <input
                      className="form-input"
                      id="expiry"
                      type="tel"
                      placeholder="09/23"
                      required
                      onChange={(e) => {
                        setExpiry(e.target.value);
                        if (e.target.checkValidity()) {
                          document.querySelector("#cvc").focus();
                        }
                      }}
                      name="expiry"
                      value={expiry}
                      onFocus={handleInputFocus}
                      pattern="[\d]{2}/[\d]{2}"
                      maxLength="5"
                      size="5"
                    />
                    <span className="hint">
                      Please enter expiry date <br />
                      (e.g. 01/24)
                    </span>
                  </div>
                  <div>
                    <label htmlFor="cvc">CVC</label>
                    <input
                      className="form-input"
                      id="cvc"
                      type="tel"
                      placeholder="123"
                      required
                      onChange={(e) => {
                        setCvc(e.target.value);
                        if (e.target.checkValidity()) {
                          document.querySelector("#fullname").focus();
                        }
                      }}
                      name="cvc"
                      value={cvc}
                      onFocus={handleInputFocus}
                      pattern="[\d]{3}"
                      maxLength="3"
                      size="3"
                    />
                    <span className="hint">
                      Please enter CVC number <br />
                      (3 digits, e.g. 274)
                    </span>
                  </div>
                </fieldset>

                <fieldset>
                  <label htmlFor="fullname">Full name</label>
                  <input className="form-input" id="fullname" type="text" placeholder="Aaron Aaronson" required onChange={handleNameChanged} name="name" value={name} onFocus={handleInputFocus} />
                  <span className="hint">Please write your full name</span>
                </fieldset>

                <div className="btn-container center">
                  <Link href="/cart">
                    <a className="btn">Back to cart</a>
                  </Link>
                  <button className="btn" type="submit">
                    Pay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
