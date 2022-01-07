import { ChevronLeftIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import useBeers from "../../hooks/useBeers";

// Create a page based on the current beer's name with additional info about the beer (aroma, mouthfeel and so on)
function Beer() {
  const { data } = useBeers();
  const { query } = useRouter();
  console.log(query.name);
  if (!data) return <div>Loading...</div>;
  const current = data.find((beer) => beer.name == query.name);
  if (!current) return <div>Not found</div>;

  return (
    <div className="App">
      <main>
        <section className="sec-bg rounded-corners">
          <div className="margin-bottom">
            {" "}
            <Link href={"/showproducts"}>
              <a className="txt-strong hover-me">
                <ChevronLeftIcon className="chevron-size margin-right txt-strong" />
                Back to menu
              </a>
            </Link>
          </div>

          <div className="grid-1-3">
            <div className="description">
              <Image src={`/images/${current.label}`} alt={`${current.name} - A lovely beer`} width={250} height={250} />
              <p className="txt-strong">{current.category}</p>
              <p>{`Alcohol: ${current.alc}%`}</p>
            </div>
            <div className="description">
              <h1 className="header">{current.name}</h1>
              <p className="txt-cursive">&#34;{current.description.overallImpression}&#34;</p>
              <h2>Aroma</h2>
              <p>{current.description.aroma}</p>
              <h2>Apperance</h2>
              <p>{current.description.appearance}</p>
              <h2>Flavor</h2>
              <p>{current.description.flavor}</p>
              <h2>Mouthfeel</h2>
              <p>{current.description.mouthfeel}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Beer;
