import { utilService } from "../services/util.service.js";
import { watcherService } from "../services/watcher.service.js";

const { useState, useEffect, useRef } = React;

export function WatcherApp() {
  const [watchers, setWatchers] = useState([]);
  const [selectedWatcher, setSelectedWatcher] = useState(null);
  const [addWatcherOpen, setAddWatcherOpen] = useState(false);

  useEffect(() => {
    updateWatchers();
    return () => {};
  }, []);

  async function updateWatchers() {
    const watchersList = await watcherService.query();
    setWatchers(watchersList);
  }

  async function onDelete(watcherId) {
    await watcherService.remove(watcherId);
    if (selectedWatcher && selectedWatcher.id === watcherId) {
      setSelectedWatcher(null);
    }
    updateWatchers();
  }

  function onSelect(watcher) {
    setSelectedWatcher(watcher);
  }

  async function onAdd() {
    const fullname = document.querySelector("#fullname").value;
    await watcherService.save({ fullname, movies: [] });
    updateWatchers();
    setAddWatcherOpen(false);
  }

  async function onRename() {
    const newName = document.querySelector("#new-name").value;
    await watcherService.save({ ...selectedWatcher, fullname: newName });
    setSelectedWatcher(null);
    updateWatchers();
  }

  return (
    <div className="watcher-app">
      <h1>Watcher App</h1>
      <button onClick={() => setAddWatcherOpen(true)}>Add Watcher</button>
      <div className="watchers-wrapper">
        {watchers.map((watcher) => {
          return (
            <div key={watcher.id} className="watcher-card">
              <img
                src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=he${watcher.id}`}
                alt="avatar icon"
              />
              <h2>{watcher.fullname}</h2>
              <hr />
              <button onClick={() => onDelete(watcher.id)}>X</button>
              <button onClick={() => onSelect(watcher)}>Select</button>
            </div>
          );
        })}
      </div>
      {selectedWatcher && (
        <div className="watcher-info-modal modal">
          <form onSubmit={onRename} method="dialog">
            <input
              type="text"
              id="new-name"
              defaultValue={selectedWatcher.fullname}
              required
            />
            <button>Rename</button>
          </form>
          <ul>
            {selectedWatcher.movies.map((movie) => {
              return <li key={movie}>{movie}</li>;
            })}
          </ul>
          <button onClick={() => setSelectedWatcher(null)}>Close</button>
        </div>
      )}
      {addWatcherOpen && (
        <div className="add-watcher-modal modal">
          <h2>Add Watcher</h2>
          <form onSubmit={onAdd} method="dialog">
            <label htmlFor="fullname">Full Name: </label>
            <input id="fullname" type="text" required />
            <button>Add</button>
          </form>
          <button onClick={() => setAddWatcherOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}
