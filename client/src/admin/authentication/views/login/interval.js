import React, { useState, useEffect, useRef } from 'react';

export const Interval = (props) => {
    const [minuteLeft, setMinuteLeft] = useState(props.minutes);
    const [timeLeft, setTimeLeft] = useState(props.seconds);
    
    useInterval(() => {
        if (minuteLeft > 0 && timeLeft > 0) {
            setTimeLeft(timeLeft - 1);
        } else {
            if (minuteLeft > 0 && timeLeft === 0) {
                setTimeLeft(59)
                setMinuteLeft(minuteLeft - 1)
            } else if (minuteLeft === 0 && timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                setTimeLeft(0)
                props.timeoutHandler(true)
            }
        }

    }, 1000);

    return (
        <span>
            {
                timeLeft < 10 ? `0${minuteLeft}:0${timeLeft}` : `0${minuteLeft}:${timeLeft}`
            }
        </span>
    )

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }
}