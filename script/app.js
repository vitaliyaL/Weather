let town;
const divCity = document.getElementById("city");
const inp = document.getElementById("inputCity");
const send = document.getElementById("sendBut");
const selectTime = document.getElementById("chooseSel");
const cont = document.getElementById("container");
divCity.classList.add("city")
const months=['января','февраля', 'марта', 'апреля','мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const render = (date, time, maxT, desc, img,speed) => {
  return `
      <div class="item">
        <div class="date">${date}</div>
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
async function weather() {
  town = inp.value;
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${town}&APPID=c6d773eb4a3cfad7a84afde6a61f830e`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    const weath = data.list
      .filter((i) => i.dt_txt.slice(11, 16) === selectTime.value)
      .map((i) => {
          const mas=i.dt_txt.slice(0, 10).split('-').reverse();
          const strDate=`${+mas[0]} ${months[+mas[1]-1]}`
        return render(
          strDate,
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
    divCity.innerHTML =`${town.slice(0,1).toUpperCase()}${town.slice(1).toLowerCase()}`;
  } catch {
    cont.innerHTML = "";
    divCity.innerHTML = "Город не найден";
  }
}
send.addEventListener("click", weather);