export const utilService = {
  loadFromStorage,
  saveToStorage,
  makeId,
  makeLorem,
  getRandomIntInclusive,
  getDayName,
  getMonthName,
  getSeasonName,
  millisecToHMS,
  animateCSS,
};

function makeId(length = 6) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return txt;
}

function makeLorem(size = 100) {
  const words = [
    "The sky",
    "above",
    "the port",
    "was",
    "the color",
    "of nature",
    "tuned",
    "to",
    "a live channel",
    "All",
    "this happened",
    "more or less",
    "I",
    "had",
    "the story",
    "bit by bit",
    "from various people",
    "and",
    "as generally",
    "happens",
    "in such cases",
    "each time",
    "it",
    "was",
    "a different story",
    "a pleasure",
    "to",
    "burn",
  ];
  var txt = "";
  while (size > 0) {
    size--;
    txt += words[Math.floor(Math.random() * words.length)];
    if (size >= 1) txt += " ";
  }
  return txt;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

function getDayName(date, locale) {
  date = new Date(date);
  return date.toLocaleDateString(locale, { weekday: "long" });
}

function getMonthName(date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[date.getMonth()];
}

function getSeasonName(monthIdx) {
  switch (monthIdx) {
    case 11:
    case 0:
    case 1:
      return "Winter";
    case 2:
    case 3:
    case 4:
      return "Spring";
    case 5:
    case 6:
    case 7:
      return "Summer";
    case 8:
    case 9:
    case 10:
      return "Autumn";
    default:
      return "";
  }
}

function millisecToHMS(millisec) {
  // Convert milliseconds to seconds
  let seconds = Math.floor(millisec / 1000);

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // Return an object with padded hours, minutes, and seconds
  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  };
}

function animateCSS(el, animation = "bounce") {
  const prefix = "animate__";
  return new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    el.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      el.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    el.addEventListener("animationend", handleAnimationEnd, { once: true });
  });
}