// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import "../TimeControl/TimeControl.css"

interface TimeControlProps {
   onResume(): void
}

export default function TimeControl({ onResume }: TimeControlProps) {

   // const [startTime, setStartTime] = useState<number | null>(null)
   // const [now, setNow] = useState<number | null>(null);
   // const intervalRef = useRef<ReturnType<typeof setInterval>>()


   // useEffect(() => {
   //    handleStart()
   // }, [])

   // const handleStart = useCallback(() => {
   //    setStartTime(Date.now());
   //    setNow(Date.now());

   //    clearInterval(intervalRef.current);
   //    intervalRef.current = setInterval(() => {
   //       setNow(Date.now());
   //    }, 10);
   // }, [])

   // const handleStop = useCallback(() => {
   //    clearInterval(intervalRef.current);
   // }, [])

   // // date.prototype.get... pentru formatare
   // const timePassed = useMemo(() => {
   //    if (!now || !startTime) {
   //       return 0;
   //    }
   //    return (now - startTime) / 1000
   // }, [now, startTime])

   // const timeFormatted = useMemo(() => {

   //    if (timePassed < 3600) {
   //       if (Math.floor(timePassed / 60) < 10) {
   //          if ((timePassed % 60) < 10) {
   //             return `0${Math.floor(timePassed / 60)}:0${(timePassed % 60).toFixed(0)}`
   //          }
   //          else return `0${Math.floor(timePassed / 60)}:${(timePassed % 60).toFixed(0)}`
   //       }

   //       if (Math.floor(timePassed / 60) < 60){
   //          if ((timePassed % 60) < 10) {
   //             return `${Math.floor(timePassed / 60)}:0${(timePassed % 60).toFixed(0)}`
   //          }
   //          else return `${Math.floor(timePassed / 60)}:${(timePassed % 60).toFixed(0)}`
   //       }
   //    }
   //    else return `Time Out`;
   // }, [timePassed])

   // const handleResume = useCallback(() => {
   //    setNow(Date.now());

   //    setStartTime(Date.now() - (timePassed * 1000));

   //    clearInterval(intervalRef.current);
   //    intervalRef.current = setInterval(() => {
   //       setNow(Date.now());
   //    }, 10);
   // }, [timePassed])



   return (
      <div className='time-control'>
         {/* <button className='play-pause' onClick={handleStop}> Stop </button>
         <button className='play-pause' onClick={handleResume}> Resume </button> */}
         {/* <p>Time passed: {timePassed.toFixed(2)}</p> */}
         {/* <p>Time passed: {timeFormatted}</p> */}
         
         00:00

         <button className="pause-button"></button>
      </div>
   )
}
