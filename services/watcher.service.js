import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";

const WATCHER_KEY = "watcherDB";
_createWatchers();

export const watcherService = {
  query,
  get,
  remove,
  save,
};

async function query() {
  return await storageService.query(WATCHER_KEY);
}

async function get(watcherId) {
  return await storageService.get(WATCHER_KEY, watcherId);
}

function remove(watcherId) {
  return storageService.remove(WATCHER_KEY, watcherId);
}

function save(watcher) {
  // Add random movies (for demo purpose)
  watcher.movies = _createMoviesList(utilService.getRandomIntInclusive(0, 8));
  if (watcher.id) {
    return storageService.put(WATCHER_KEY, watcher);
  } else {
    return storageService.post(WATCHER_KEY, watcher);
  }
}

function _createWatchers() {
  let watchers = utilService.loadFromStorage(WATCHER_KEY);
  if (!watchers || !watchers.length) {
    watchers = [
      _createWatcher("Puki Ba", _createMoviesList(4)),
      _createWatcher("Muki Da", _createMoviesList(3)),
      _createWatcher("Shuki Sa", _createMoviesList(5)),
    ];
    utilService.saveToStorage(WATCHER_KEY, watchers);
  }
}

function _createWatcher(fullname, movies) {
  return { id: utilService.makeId(), fullname, movies };
}

function _createMoviesList(size = 3) {
  const options = [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Angry Men",
    "Fight Club",
    "Spider Man",
    "Iron Man",
    "The Avengers",
    "Inception",
    "The Matrix",
    "Interstellar",
    "The Pianist",
    "Gladiator",
    "WALL-E",
    "Harry Potter",
    "Toy Story",
    "The Shining",
    "Amadeus",
    "Joker",
    "Rambo",
    "Rocky",
    "Forrest Gump",
  ];

  if (size > options.length) {
    return [];
  }

  let result = [];
  let indices = new Set();

    while (indices.size < size) {
        let randomIndex = utilService.getRandomIntInclusive(0, options.length - 1);
        if (!indices.has(randomIndex)) {
            indices.add(randomIndex);
            result.push(options[randomIndex]);
        }
    }

    return result;
}
