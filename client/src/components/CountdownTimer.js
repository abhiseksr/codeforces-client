import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ hours, minutes, seconds }) => {
  const [time, setTime] = useState({ hours, minutes, seconds });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime.hours === 0 && prevTime.minutes === 0 && prevTime.seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }
        
        const newHours = prevTime.minutes === 0 && prevTime.seconds === 0 ? prevTime.hours - 1 : prevTime.hours;
        const newMinutes = prevTime.seconds === 0 ? prevTime.minutes - 1 : prevTime.minutes;
        const newSeconds = prevTime.seconds === 0 ? 59 : prevTime.seconds - 1;
        
        return {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  };

  return (
    <div>
      {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
    </div>
  );
};

export default CountdownTimer;
