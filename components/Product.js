import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import useOnTap from "../hooks/useOnTap";

export default function Product(props) {
  // Use hook to determine wheather beer is currently on tap
  const onTap = useOnTap(props.name);

  function getInTheBasket() {
    props.addToBasket({
      price: 49,
      name: props.name,
      id: props.id,
    });
  }

  return (
    <article className="product-article">
      <div className="grid-1-3">
        <div>
          <Image src={`/images/${props.label}`} alt={`${props.name} - A lovely beer`} width={100} height={100} />
        </div>

        <div>
          {" "}
          <h2>{props.name}</h2>
          <p>{`${props.alc}%`}</p>
          <p className="price">Kr. {49},- </p>
          <p className="notontap" hidden={onTap === true}>
            This beer is not on tap today
          </p>
        </div>
      </div>
      <div className="product-buttons">
        <button onClick={getInTheBasket} disabled={onTap === false} className="btn">
          Add to cart
        </button>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="btn-info margin-left">
                <span>Info</span>
                <ChevronUpIcon className={`${open ? "" : "chevron-rotate"} chevron-size margin-left`} />
              </Disclosure.Button>
              <Disclosure.Panel>
                <p className="txt-disclosure">{props.description.overallImpression}</p>
                <Link href={`/beer/${props.name}`}>
                  <a className="txt-strong hover-me">More info</a>
                </Link>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </article>
  );
}
