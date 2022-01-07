import Bartenders from "../components/Bartenders";
import BeersTonight from "../components/BeersTonight";
import Favourites from "../components/Favourites";
import NowPrepping from "../components/NowPrepping";
import NowServing from "../components/NowServing";
import useDashboardDetails from "../hooks/useDashboardDetails";

export default function Dashboard() {
  const { data, error } = useDashboardDetails();

  return (
    <div>
      {!data ? (
        <div>
          <h2 className="center">Loading...</h2>
        </div>
      ) : null}
      {data ? (
        <main>
          <section className="grid-2-mobile">
            <div className="column sec-bg rounded-corners">
              <h2 className="center header">Now serving</h2>
              <div className="flex-wrap">
                <NowServing serving={data.serving} />
              </div>
            </div>

            <div className="column sec-bg rounded-corners">
              <h2 className="center header">Now prepping</h2>
              <div className="flex-wrap">
                <NowPrepping queue={data.queue} />
              </div>
            </div>
          </section>

          <section className="sec-bg rounded-corners">
            <h2 className="center header">Currently on tap</h2>
            <BeersTonight />
          </section>

          <section>
            <div className="grid-2">
              <div className="column sec-bg rounded-corners">
                <h2 className="center header">Our amazing crew</h2>
                <Bartenders bartenders={data.bartenders} />
              </div>
              <div className="column sec-bg rounded-corners">
                <h2 className="center header">Popular right now</h2>
                <Favourites />
              </div>
            </div>
          </section>
        </main>
      ) : null}
    </div>
  );
}
