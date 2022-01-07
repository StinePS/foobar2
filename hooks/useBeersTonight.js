import useBeers from "./useBeers";
import useDashboardDetails from "./useDashboardDetails";

export default function useBeersTonight() {
  const { data: beers } = useBeers();
  const { data } = useDashboardDetails();

  if (data && beers) {
    // Make a "Set" of all the beers currently on tap - This ensures there is only one of each beer in the array, even if it is available on multiple taps
    const beersTonight = new Set();
    data.taps.forEach((tap) => {
      const beer = beers.find((value) => value.name === tap.beer);
      beersTonight.add(beer);
    });

    return [...beersTonight];
  }

  return null;
}
