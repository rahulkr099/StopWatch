
// Import necessary React hooks
import { useState, useEffect, useRef } from 'react';

function Stopwatch() {
    // State variables to track stopwatch functionality
    const [isRunning, setIsRunning] = useState(false); // Is the stopwatch running?
    const [elapsedTime, setElapsedTime] = useState(0); // Total elapsed time in milliseconds

    // Ref to store the interval ID for cleanup
    const intervalIdRef = useRef(null);

    // Ref to store the start time for accurate elapsed time calculation
    const startTimeRef = useRef(0);

    // Effect hook to handle timer logic based on isRunning state changes
    useEffect(() => {
        if (isRunning) {
            // Start the timer when isRunning is true
            intervalIdRef.current = setInterval(() => {
                // Update elapsedTime with the difference between current time and start time
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10); // Update every 10 milliseconds
        } else {
            // Clear the interval when isRunning is false to stop the timer
            clearInterval(intervalIdRef.current);
        }

        // Cleanup function to clear the interval on component unmount
        return () => clearInterval(intervalIdRef.current);
    }, [isRunning]); // Only run when isRunning changes

    // Function to start the stopwatch
    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime; // Adjust start time for smooth continuation
    }

    // Function to stop the stopwatch
    function stop() {
        setIsRunning(false);
    }

    // Function to reset the stopwatch to zero
    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }

    // Function to format the elapsed time into MM:SS.MS format
    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60)); // Extract hours
        let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)); // Extract minutes
        let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000); // Extract seconds
        let milliseconds = Math.floor((elapsedTime % 1000) / 10); // Extract milliseconds

        // Pad numbers with leading zeros for consistent formatting
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${hours} : ${minutes} : ${seconds} : ${milliseconds}`; // Return formatted time string
    }
    //Always remember to use {difference of two time} and do mathematics to get hr,min,sec,ms.
    //To get current hours, min, sec, ms. console.log(new Date().getHours(),new Date().getMinutes(),new Date().getSeconds(),new Date().getMilliseconds())
    // JSX to render the stopwatch UI
    return (
        <div className="min-h-64 max-w-[312px] bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl bg-opacity-80 border border-gray-100 mx-auto ">
            <div className="bg-white rounded-md m-2 p-5 text-4xl text-center relative top-12 shadow-xl">{formatTime()}</div>
            <div className="flex justify-center relative top-20">
                <button className="bg-green-500 p-2 rounded-md m-3 text-white text-xl w-20 hover:text-black hover:bg-green-600" onClick={start}>Start</button>
                <button onClick={stop} className="bg-red-500 p-2 rounded-md m-3 text-white text-xl w-20 hover:text-black hover:bg-red-600">Stop</button>
                <button onClick={reset} className="bg-violet-500 p-2 rounded-md m-3 text-white text-xl w-20 hover:text-black hover:bg-violet-600">Reset</button>
            </div>
        </div>
    );
}
export default Stopwatch;