import React, { useState }from 'react';
const api = {
  key: "468a4431d2b1b41b3f329b5dd909c94b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === 'Enter') {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      let day = days[d.getDay()]; // returns a number between 1 and 7 or 0 and 6
      let date = d.getDate();
      let month = months[d.getMonth()]; // returns a number between 0 and 11
      let year = d.getFullYear(); // year

      return `${day} ${date} ${month} ${year}`
  }

  return (
    // <div className='container'>
      <div className={
        (typeof weather.main != "undefined") // type of weather.main if thats not equal to undefined
          ?  (weather.main.temp < 5)  ? 'app snow' 
          :  (weather.main.temp < 18)  ? 'app normal'
          :  (weather.main.temp > 19)  ? 'app hot'
          : 'app' : 'app'
       
      }>
        <main> 
          <div className='search-box'>
            <input 
              type="text"
              className='search-bar'
              placeholder='Search...'
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className='location-box'>
                <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className='weather'>{weather.weather[0].main}</div>
          </div>
            </div>
          ) : ('')}
        </main>
      </div>
    // </div>
  );
}

export default App