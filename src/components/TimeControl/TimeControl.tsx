import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../TimeControl/TimeControl.css";
import { Timer } from "../../models/Timer.model";
import { getPauseButtonClassName } from "../../services/layout.service";

interface TimeControlProps {
  onTimerToggle(): void,
  timer: Timer,
  isTimerRunning: boolean,
}

export function TimeControl({ onTimerToggle, timer, isTimerRunning }: TimeControlProps) {

  const handleTimerToggle = useCallback(() => {
    onTimerToggle();
  }, [onTimerToggle]);

  const timeString = useMemo(() => {
    let minutes = timer.minutes.toString().padStart(2, "0");
    let seconds = timer.seconds.toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [timer.minutes, timer.seconds]);

  return (
    <div className="time-control">
      {timeString}

      <button className={getPauseButtonClassName(isTimerRunning)} onClick={handleTimerToggle}></button>
    </div>
  );
}
