import useSWR from "swr";

// Get dashboard data (bartenders, orders...) from Heroku
// https://swr.vercel.app/docs/getting-started
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useDashboardDetails() {
  return useSWR("https://barcode-data.herokuapp.com/", fetcher, {
    // Get data every 5 seconds
    refreshInterval: 5000,
  });
}
