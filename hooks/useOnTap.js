import useDashboardDetails from "./useDashboardDetails";

// Determine if a beer is currently on tap by comparing the taps in use with the beer names
export default function useOnTap(beerName) {
  const { data } = useDashboardDetails();
  let onTap = undefined;
  if (data) {
    onTap = data.taps.find((tap) => {
      return tap.beer === beerName;
    })
      ? true
      : false;
  }

  return onTap;
}
