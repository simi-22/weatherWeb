import { useEffect, useState } from 'react';
import './App.css';
import './Search.css';
import './Weather.css';
import './Button.css';
import Search from './Search';
import Weather from './Weather';
import Button from './Button';
import ClipLoader from "react-spinners/ClipLoader";

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
  const [cityName, setCityName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  //로딩스피너
  const [loading, setLoading] = useState(false);
  //에러핸들링
  const [error, setError] = useState(null);


  console.log(isFocused);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon)
    });
  }

  //에러핸들링
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather(data);
      setLoading(false);
      setError(null); // Clear any previous errors
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  //서치창검색기능
  const getWeatherByCityName = async (cityName) => {
    setLoading(true);
    try {
      let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('잘못된 검색어입니다. 올바른 도시 이름을 입력해주세요.');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (cityName) => {
    getWeatherByCityName(cityName);
  };

  const handleSearchEnter = (event) => {
    if (event.key === 'Enter') {
      getWeatherByCityName(event.target.value);
    }
  };

  const handleGetCurrentLocation = () => {
    setIsFocused(true); // 버튼 클릭 시 포커스 상태 변경
    getCurrentLocation();
  };
  
  useEffect(() => {
    getCurrentLocation()
  },[])

  return (
    <div>
    {loading ? (
      <div id="container">
        <ClipLoader
          color="#ebebeb"
          loading={loading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    ) : (
      <div>
        <Search
          onSearch={handleSearch}
          onSearchEnter={handleSearchEnter}
          setCityName={setCityName}
          cityName={cityName}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
        <Weather weather={weather}/>
        <Button onGetCurrentLocation={handleGetCurrentLocation}/>
      </div>
    )}
  </div>
  );
}

export default App;
