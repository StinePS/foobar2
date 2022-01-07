import Countdown from "../components/Countdown";
import Link from "next/link";

// "Logo" with link to frontpage + countdown to 22:00
export default function PageTitle() {
  return (
    <div className="center">
      {" "}
      <Link href={"/"}>
        <a className="page-title">Foobar</a>
      </Link>
      <Countdown />
    </div>
  );
}
