import useSWR from "swr";

// Get beertypes from Heroku
// https://swr.vercel.app/docs/getting-started
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useBeers() {
  return useSWR("https://barcode-data.herokuapp.com/beertypes", fetcher, {
    // Don't refresh this data (because it never changes)
    // https://swr.vercel.app/docs/options
    revalidateIfStale: false,
    revalidateOnFocus: false,
  });
}
