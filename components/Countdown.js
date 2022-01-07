import { useEffect, useState } from "react";

// Make sure there's always 2 digits in each area of the timer
function zeroPadding(value) {
  if (value < 10) return `0${value}`;
  return value.toString();
}

// Counter made with inspiration from https://www.youtube.com/watch?v=VNTom2Gtn8s
export default function Countdown() {
  const [hours, setHours] = useState(-1);
  const [minutes, setMinutes] = useState(-1);
  const [seconds, setSeconds] = useState(-1);

  // Calculate difference between now and 22:00:00 today
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const targetTime = new Date();
      targetTime.setHours(22, 0, 0, 0);
      const difference = targetTime.getTime() - now.getTime();

      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setHours(Math.max(h, 0));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(Math.max(m, 0));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(Math.max(s, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Until time is loaded
  if (hours === -1 && minutes === -1 && seconds === -1) {
    return (
      <div className="center">
        <p className="time" style={{ opacity: 0 }}>
          Loading
        </p>
      </div>
    );
  }

  // If it's later than 22:00:00
  if (hours === 0 && minutes === 0 && seconds === 0) {
    return (
      <div className="center">
        <p className="time">{"Sorry - We're closed for the night"}</p>
      </div>
    );
  }

  return (
    <div className="center">
      <p className="time">{`We close in ${zeroPadding(hours)}:${zeroPadding(minutes)}:${zeroPadding(seconds)}`}</p>
    </div>
  );
}
