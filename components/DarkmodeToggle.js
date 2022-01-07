import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

// Switch for darkmode modelled on https://headlessui.dev/react/switch
export default function DarkmodeToggle() {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode);
  }, [mode]);

  return (
    <Switch checked={mode} onChange={setMode} className={`switch ${mode ? "switch-darkmode" : "switch-lightmode"}`}>
      <span className={`switch-marker ${mode ? "switch-marker-darkmode" : "switch-marker-lightmode"}`}>{mode ? "🌙" : "☀️"}</span>
    </Switch>
  );
}

// Initial "self-made" toggle
// import { useEffect, useState } from "react";
//
// export default function BtnMode() {
//   const [mode, setMode] = useState(false);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", mode);
//   }, [mode]);

//   return (
//     <button
//       onClick={() => {
//         setMode(!mode);
//       }}
//     >
//       {mode ? "🌙" : "☀️"}
//     </button>
//   );
// }
