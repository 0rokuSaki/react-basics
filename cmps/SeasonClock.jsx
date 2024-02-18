import { utilService } from "../services/util.service.js";

const { useState, useEffect, useRef } = React;

export function SeasonClock() {
  const [date, setDate] = useState(new Date());
  const [isDark, setIsDark] = useState(false);
  const intervalIdRef = useRef();

  const season = utilService.getSeasonName(date.getMonth());
  const month = utilService.getMonthName(date);
  const dayName = utilService.getDayName(date);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const mode = isDark ? "dark" : "light";
  const dynClass = `${season.toLowerCase()}-${mode}`;

  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  function onDarkToggle() {
    setIsDark(!isDark);
  }

  return (
    <div className={`season-clock ${dynClass}`} onClick={onDarkToggle}>
      <h1>{`${month} (${season})`}</h1>
      <img src={`assets/img/${season.toLowerCase()}.png`} alt={`${season} icon`} />
      <h2>{dayName}</h2>
      <p>{`${hours}:${minutes}:${seconds}`}</p>
    </div>
  );
}
