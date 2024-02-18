const { useState, useEffect, useRef } = React;

export function MouseMonitor() {
  const [isOn, setIsOn] = useState(true);
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (isOn) {
      addMouseListener();
    } else {
      removeMouseListener();
    }

    return () => {
      removeMouseListener();
    };
  }, [isOn]);

  function addMouseListener() {
    document.addEventListener("mousemove", updatePos);
  }

  function removeMouseListener() {
    document.removeEventListener("mousemove", updatePos);
  }

  function updatePos(ev) {
    setPos({ x: ev.screenX, y: ev.screenY });
  }

  function onButtonClick() {
    setIsOn(!isOn);
  }

  return (
    <div className="mouse-monitor">
      <h2>Mouse Position</h2>
      {isOn && <p>{`x: ${pos.x}, y: ${pos.y}`}</p>}
      <button onClick={onButtonClick}>{isOn ? "Pause" : "Resume"}</button>
    </div>
  );
}
