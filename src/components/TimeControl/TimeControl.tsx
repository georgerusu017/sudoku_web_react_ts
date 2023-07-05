import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../TimeControl/TimeControl.css";
import { Timer } from "../../models/Timer.model";

interface TimeControlProps {
  onTimerToggle(): void;
}

export function TimeControl({ onTimerToggle }: TimeControlProps) {
  const [timer, setTimer] = useState<Timer>({ minutes: 0, seconds: 0 });
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const interval = useRef<ReturnType<typeof setInterval>>();

  const handleTimerToggle = useCallback(() => {
    if (isTimerRunning) {
      clearInterval(interval.current);
      setIsTimerRunning(false);
    } else {
      interval.current = setInterval(() => {
        if (timer.seconds < 59) {
          timer.seconds++;
        } else {
          timer.minutes++;
          timer.seconds = 0;
        }
        setTimer({ minutes: timer.minutes, seconds: timer.seconds });
      }, 1000);

      setIsTimerRunning(true);
    }

    onTimerToggle();
  }, [timer, isTimerRunning, onTimerToggle]);

  useEffect(() => {
    handleTimerToggle();
  }, []);

  const timeString = useMemo(() => {
    let minutes = timer.minutes.toString().padStart(2, "0");
    let seconds = timer.seconds.toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [timer.minutes, timer.seconds]);

  return (
    <div className="time-control">
      {timeString}

      <button className="pause-button" onClick={handleTimerToggle}></button>
    </div>
  );
}
