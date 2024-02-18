import { AnimalList } from "./AnimalList.jsx";
import { SeasonClock } from "./SeasonClock.jsx";
import { CountDown } from "./CountDown.jsx";
import { WatcherApp } from "./WatcherApp.jsx";
import { MouseMonitor } from "./MouseMonitor.jsx";

const { useState, useEffect } = React;

export function Home({ page }) {
  function onCountDownDone() {
    const audio = new Audio("../assets/audio/bell-sound.mp3");
    audio.play();
  }

  return (
    <React.Fragment>
      <section className="home">
        {page == "animal-list" && <AnimalList />}
        {page == "season-clock" && <SeasonClock />}
        {page == "count-down" && (
          <CountDown toTime={Date.now() + 20 * 1000} onDone={onCountDownDone} />
        )}
        {page == "watcher-app" && <WatcherApp />}
        {/* <MouseMonitor /> */}
      </section>
    </React.Fragment>
  );
}
