import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface TimeControlProps {
   onResume(): void
}

export default function TimeControl({ onResume }: TimeControlProps) {

   const [startTime, setStartTime] = useState<number | null>(null)
   const [now, setNow] = useState<number | null>(null);
   const intervalRef = useRef<ReturnType<typeof setInterval>>()
   

   useEffect(() => {
      handleStart()
   }, [])

   // const cu useCallback
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
   }

   // date.prototype.get... pentru formatare
   const timePassed = useMemo(() =>{
      if(!now || !startTime){
         return 0;
      }
      return (now-startTime)/1000},[now, startTime])

   const handleResume = useCallback(() => {
      setNow(Date.now());
      
      setStartTime(Date.now() - (timePassed * 1000));

      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
         setNow(Date.now());
      }, 10);
   }, [timePassed] )


   return (
      <div className='timer-control'>
         <button className='play-pause' onClick={handleStop}> Stop </button>
         <button className='play-pause' onClick={handleResume}> Resume </button>
         <p>Time passed: 00:00:00 {timePassed.toFixed(2)}</p>
      </div>
   )
}


// import React, { useState, useEffect } from 'react';

 

// export deafault function TimerControl () {
//   const [time, setTime] = useState<number>(0);
//   const [isRunning, setIsRunning] = useState<boolean>(false);

 

//   useEffect(() => {
//     let timer: NodeJS.Timeout | null = null;

 

//     if (isRunning) {
//       timer = setInterval(() => {
//         setTime((prevTime) => prevTime + 1);
//       }, 1000);
//     } else {
//       clearInterval(timer);
//     }

 

//     return () => {
//       if (timer) {
//         clearInterval(timer);
//       }
//     };
//   }, [isRunning]);

 

//   const handleStartStop = (): void => {
//     setIsRunning(!isRunning);
//   };

 

//   const handleReset = (): void => {
//     setTime(0);
//     setIsRunning(false);
//   };

 

//   return (
// <div>
// <h2>Timer</h2>
// <div>
// <span>{Math.floor(time / 3600).toString().padStart(2, '0')}:</span>
// <span>{Math.floor((time % 3600) / 60).toString().padStart(2, '0')}:</span>
// <span>{(time % 60).toString().padStart(2, '0')}</span>
// </div>
// <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
// <button onClick={handleReset}>Reset</button>
// </div>
//   );
// };