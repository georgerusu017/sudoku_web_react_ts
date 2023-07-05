import { useCallback, useRef, useState } from "react";
import "../TimeControl/TimeControl.css";
import { Timer } from "../../models/Timer.model";

interface TimeControlProps {
  timerToggle(): void;
}

export function TimeControl({ timerToggle }: TimeControlProps) {
  const [timer, setTimer] = useState<Timer>({ minutes: 0, seconds: 0 });
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
//   const interval = useRef<number>(0)

  const handleTimerToggle = useCallback(() => {
    if (timerRunning) {
    //   clearInterval(interval.current)
      setTimerRunning(!timerRunning);
    } else {
      setInterval(() => {
        if (timer.seconds < 59) {
          timer.seconds++;
        } else {
          timer.minutes++;
          timer.seconds = 0;
        }
        setTimer({ minutes: timer.minutes, seconds: timer.seconds });
      }, 1000);
    }

    timerToggle();
  }, [timer, timerRunning, timerToggle]);

  const timerFormat = useCallback(() => {
    let minutes = "";
    let seconds = "";

    if (timer.minutes < 10) {
      minutes = `0${timer.minutes}`;
    } else {
      minutes = timer.minutes.toString();
    }
    if (timer.seconds < 10) {
      seconds = `0${timer.seconds}`;
    } else {
      seconds = timer.seconds.toString();
    }

    return `${minutes}:${seconds}`;
  }, [timer.minutes, timer.seconds]);

  return (
    <div className="time-control">
      {timerFormat()}

      <button className="pause-button" onClick={handleTimerToggle}></button>
    </div>
  );
}
