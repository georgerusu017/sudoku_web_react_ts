import React, { useCallback, useEffect, useRef, useState } from 'react';

interface TimeControlProps {
   onResume(): void
}

export default function TimeControl({ onResume }: TimeControlProps) {

   const [startTime, setStartTime] = useState<number | null>(null)
   const [now, setNow] = useState<number | null>(null);
   const [pauseTime, setPauseTime] = useState<number | null>(null);
   const intervalRef = useRef<ReturnType<typeof setInterval>>()
   

   useEffect(() => {
      handleStart()
   }, [])

   function handleStart() {
      setStartTime(Date.now());
      setNow(Date.now());

      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
         setNow(Date.now());
      }, 10);
   }

   function handleStop() {
      clearInterval(intervalRef.current);
      setPauseTime(Date.now())
   }

   let timePassed = 0;
   if (startTime != null && now != null) {
      timePassed = (now - startTime) / 1000;
   }

   const handleResume = useCallback(() => {
      setNow(Date.now());
      console.log("Time passed =", timePassed)
      console.log("pausedTime = ", pauseTime)

      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
         setNow(pauseTime);
      }, 10);
   }, [] )



   return (
      <div className='timer-control'>
         <button className='play-pause' onClick={handleStop}> Stop </button>
         <button className='play-pause' onClick={handleResume}> Resume </button>
         <p>Time passed: {timePassed.toFixed(2)}</p>
      </div>
   )
}
