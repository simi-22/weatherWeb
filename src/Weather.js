import React from 'react'

const Weather = ({ weather }) => {
    console.log(weather);
// 날씨 데이터가 있는지 확인
  if (!weather) return null;
    
  //날씨에 따른 배경
  let backgroundImageUrl;
  switch (weather.weather[0].main) {
    case 'Clear':
      backgroundImageUrl = 'url(https://i.gifer.com/embedded/download/Vp9H.gif)';
      break;
    case 'Clouds':
      backgroundImageUrl = 'url(https://i.pinimg.com/originals/5d/b5/b2/5db5b2ce7ba03746b6b68d210941ddbd.gif)';
      break;
    case 'Rain':
      backgroundImageUrl = 'url(https://thomaskovar.com/wp-content/uploads/2014/03/rain-loop.gif)';
      break;

    case 'Thunderstorm':
        backgroundImageUrl = 'url(https://i.pinimg.com/originals/da/30/27/da30273ba3899b90c91e063afde08242.gif)';
        break;
  
    default:
      backgroundImageUrl = 'url(https://i.gifer.com/embedded/download/Vp9H.gif)';
  }

  const weatherStyle = { 
    backgroundImage: backgroundImageUrl,
  };
  return (
    <div id='weather'  style={weatherStyle}>
        <div>
            <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}.png`} />
            <div>{weather?.name}</div>
            <h2>{weather?.main.temp}°C / {Math.floor((weather?.main.temp*(9/5)+32)*100)/100}℉</h2>
            <h3>{weather?.weather[0].description}</h3>
        </div>
    </div>
  )
}

export default Weather