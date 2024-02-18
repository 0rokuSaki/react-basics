const { useState, useEffect } = React;

export function AppHeader({ onNavClick }) {
  return (
    <header className="app-header full main-layout">
      <section className="header-container">
        <h1>React Basics</h1>
      </section>
      <nav className="app-nav">
        <a
          onClick={(ev) => {
            ev.preventDefault();
            onNavClick("animal-list");
          }}
          href=""
        >
          Animal List
        </a>
        <span> | </span>
        <a
          onClick={(ev) => {
            ev.preventDefault();
            onNavClick("season-clock");
          }}
          href=""
        >
          Season Clock
        </a>
        <span> | </span>
        <a
          onClick={(ev) => {
            ev.preventDefault();
            onNavClick("count-down");
          }}
          href=""
        >
          Countdown Timer
        </a>
        <span> | </span>
        <a
          onClick={(ev) => {
            ev.preventDefault();
            onNavClick("watcher-app");
          }}
          href=""
        >
          Watcher App
        </a>
      </nav>
    </header>
  );
}
