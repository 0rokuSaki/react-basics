import { AppHeader } from "./cmps/AppHeader.jsx";
import { Home } from "./cmps/Home.jsx";

const { useState } = React;

export function RootCmp() {
  const [page, setPage] = useState("watcher-app");

  function onNavClick(newPage) {
    if (newPage != page) {
      setPage(newPage);
    }
  }

  return (
    <section className="app main-layout">
      <AppHeader onNavClick={onNavClick} />
      <main>
        <main>
          <Home page={page} />
        </main>
      </main>
    </section>
  );
}
