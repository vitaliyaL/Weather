let town;
const divCity = document.getElementById("city");
const inp = document.getElementById("inputCity");
const send = document.getElementById("sendBut");
const selectTime = document.getElementById("chooseSel");
const cont = document.getElementById("container");
const docTime = document.getElementById("time");
const citata = document.querySelector(".citata");
docTime.innerHTML = getTime();
divCity.classList.add("city");
setInterval(() => {
  docTime.innerHTML = getTime();
}, 1000);
const months = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];
function citaty() {
  const cit = [
    "Клятвы, данные в бурю, забываются в тихую погоду.",
    "Вдохновение можно найти даже в прогнозе погоды.",
    "Неплохо узнать прогноз погоды, прежде чем начинать молиться о дожде.",
    "Гидрометцентр — место, где ошибки погоду не делают.",
  ];
  const i = Math.round(Math.random() * 3);
  citata.innerHTML=(cit[i]);
}

function getTime() {
  const date = new Date();
  const hours = zerroTime(date.getHours());
  const minutes = zerroTime(date.getMinutes());
  const seconds = zerroTime(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
}
function zerroTime(time) {
  if (time < 10) {
    time = `0${time}`;
  }
  return time;
}
const render = (date, day, time, maxT, desc, img, speed) => {
  return `
      <div class="item">
        <div class="date">${date}</div><hr>
        <div class="weekDay">${day}</div><hr>
        <div class="desc">
            <div class="descImg"> 
                <img src="http://openweathermap.org/img/w/${img}.png" alt=""/>
            </div>
            <div class="descTxt">${desc}</div>
        </div> 
        <div class="time">Время: ${time}</div>
        <div class="temp">Температура воздуха: <b>${maxT}</b></div>
        <div class="wind">Скорость ветра: <b>${speed}</b></div>
      </div>`;
};
function getWeekDay(date) {
  const weekDays = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  return weekDays[date.getDay()];
}
async function weather() {
  citaty();
  town = inp.value;
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${town}&APPID=c6d773eb4a3cfad7a84afde6a61f830e`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const weath = data.list
      .filter((i) => i.dt_txt.slice(11, 16) === selectTime.value)
      .map((i) => {
        const mas = i.dt_txt.slice(0, 10).split("-");
        const day = getWeekDay(new Date(+mas[0], +mas[1] - 1, +mas[2]));
        mas.reverse();
        const strDate = `${+mas[0]} ${months[+mas[1] - 1]}`;
        return render(
          strDate,
          day,
          i.dt_txt.slice(11, 16),
          `${(i.main.temp_max - 273.15).toFixed(1)} °C`,
          i.weather[0].description,
          i.weather[0].icon,
          `${i.wind.speed} км/ч`
        );
      })
      .join("");
    console.log(weath);
    cont.innerHTML = weath;
    divCity.innerHTML = `${town.slice(0, 1).toUpperCase()}${town
      .slice(1)
      .toLowerCase()}`;
  } catch {
    cont.innerHTML = "";
    divCity.innerHTML = "Город не найден";
  }
}
send.addEventListener("click", weather);
