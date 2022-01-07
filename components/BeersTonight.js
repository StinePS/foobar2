import Image from "next/image";
import useBeersTonight from "../hooks/useBeersTonight";

export default function BeersTonight() {
  const beersTonight = useBeersTonight();
  if (!beersTonight) return <div>Loading...</div>;

  return (
    // Map over each of the beers currently on tap to create an article
    <div className="grid-2">
      {beersTonight.map((beer) => (
        <article key={beer.name} className="beer-card grid-1-3">
          <div>
            <Image src={`/images/${beer.label}`} alt={`${beer.name} - A lovely beer`} width={150} height={150} />
          </div>
          <div>
            <h3>{beer.name}</h3>
            <p>{beer.category}</p>
            <p>{`${beer.alc}%`}</p>
            <p>Kr. 49,-</p>
          </div>
        </article>
      ))}
    </div>
  );
}
