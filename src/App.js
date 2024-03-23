import { useEffect,useState } from 'react';
import './App.css';
import './Search.css';
import './Weather.css';
import './Button.css';
import Search from './Search';
import Weather from './Weather';
import Button from './Button';

//1.앱이 실행되자마자 현재 위치 기반의 날씨가 보인다
//2.도시, 섭씨, 화씨, 날ㅣ 상태정보가 보인다
//3. 5개의 버튼이있다.(현재위치, 다른 도시)
//4. 도시 버튼을 클릭할 때마다 도시별 날씨가 나온다
//위에 부분은 검색창에 도시이름 입력으로 바꾼다
//5. 현재 위치 버튼을 클릭하면 다시 현재위치 기반으로 나온다.
//6.데이터를 들고오는 동안 로딩 스피너가 돈다
function App() {
  const API_KEY = "4734e87b33792133143f37f0b6ea2d89";
  const [weather, setWeather] = useState(null);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon)
    });
  }
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    const response = await fetch(url);
    const data = await response.json();
    setWeather(data);
    console.log("데이터는", data);
  };
  useEffect(() => {
    getCurrentLocation()
  },[])
  return (
    <div>
      <Search />
      <Weather weather={weather}/>
      <Button />
    </div>
  );
}

export default App;
