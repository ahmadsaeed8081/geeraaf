import React, { useState, useEffect } from 'react';

const StakingCounter = (props) => {
  const calculateTimeLeft = () => {
    const difference = Number(props.time) * 1000 - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [props.time]);

  return (
           <div className=" tw-pt-2.5 tw-flex  tw-gap-2  tw-justify-end">
            <div className=" tw-flex tw-flex-wrap tw-gap-1">
              <div className="  tw-gap-1   tw-w-7 tw-justify-center  tw-font-poppins tw-rounded-sm tw-flex tw-items-center tw-bg-[#489F68]">
                <p className=" tw-m-0 tw-text-sm tw-text-black tw-font-poppins tw-font-semibold">{String(timeLeft.days).padStart(2, '0')}</p>
              </div>

              <p className=" tw-m-0 tw-text-sm tw-text-textColor   tw-font-poppins">Days</p>

            </div>
            <div className=" tw-flex tw-flex-wrap tw-justify-center tw-gap-1">
              <div className="  tw-gap-1   tw-w-6  tw-justify-center  tw-rounded-sm tw-flex tw-items-center tw-bg-[#489F68]">
                <p className=" tw-m-0 tw-text-black tw-font-poppins">{String(timeLeft.hours).padStart(2, '0')}</p>
              </div>

              <p className=" tw-m-0 tw-text-sm tw-text-textColor ">Hours</p>

            </div>
            <div className=" tw-flex tw-flex-wrap tw-justify-center tw-gap-1">
              <div className="  tw-gap-1   tw-w-6  tw-justify-center  tw-rounded-sm tw-flex tw-items-center tw-bg-[#489F68]">
                <p className=" text-black tw-font-poppins tw-m-0 ">{String(timeLeft.minutes).padStart(2, '0')}</p>
              </div>

              <p className=" tw-m-0 tw-text-sm tw-text-textColor  tw-font-poppins">Minutes</p>

            </div>
            <div className=" tw-flex tw-flex-wrap tw-justify-center tw-gap-1">
              <div className="  tw-gap-1   tw-w-6  tw-justify-center  tw-rounded-sm tw-flex tw-items-center tw-bg-[#489F68]">
                <p className=" tw-m-0 tw-text-black tw-font-poppins">   {String(timeLeft.seconds).padStart(2, '0')}</p>
              </div>

              <p className=" tw-m-0 tw-text-sm tw-text-textColor  tw-font-poppins">Second</p>

            </div>
           </div> 
  );
};

export default StakingCounter;
