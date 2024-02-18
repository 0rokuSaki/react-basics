import { utilService } from "../services/util.service.js";

const { useState, useEffect, useRef } = React;

export function CountDown({
  startFrom,
  toTime = Date.now() + 10 * 1000,
  onDone,
}) {
  const [time, setTime] = useState(startFrom || toTime - Date.now());
  const intervalIdRef = useRef();

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setTime((prevTime) => {
        const diff = startFrom ? 1 : 1000;
        return prevTime - diff <= 0 ? 0 : prevTime - diff;
      });
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (time <= 0) {
      clearInterval(intervalIdRef.current);
      if (onDone) onDone();
    }
  }, [time]);

  let timer;
  if (startFrom) {
    timer = (
      <h2 style={{ color: time < 7 ? "red" : "black" }}>
        {String(time).padStart(2, "0")}
      </h2>
    );
  } else {
    const hms = utilService.millisecToHMS(time);
    timer = (
      <h2>
        {`${hms.hours}:${hms.minutes}:`}
        {
          <span style={{ color: time < 7000 ? "red" : "black" }}>
            {hms.seconds}
          </span>
        }
      </h2>
    );
  }

  return <div className="count-down">{timer}</div>;
}
