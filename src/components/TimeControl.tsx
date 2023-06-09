import React, { useState } from 'react';

export default function TimeControl() {
   return(
      <div className='timer-control'>
        <text>00:0000</text>
        <button className='play-pause'></button>
      </div>
   )
}

export function Timer() {
   const [startTime, setStartTime] = useState(null)
}