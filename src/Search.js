import React from 'react';

const Search = ({ onSearch, onSearchEnter, setCityName, cityName, isFocused, setIsFocused }) => {
 

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  const handleClick = () => {
    if (cityName.trim() !== '') {
      onSearch(cityName);
    }
  };
  const handleListClick = () => {
    setIsFocused(true);
  };

  // 도시 리스트에서 이름을 가져와서 해당 도시의 날씨 정보 보여주기
  const handleListItemClick = (city, event) => {
    onSearch(city); // onSearch 함수 호출
    setIsFocused(false);
  };
  //검색창 포커스 이벤트
  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div id='search'>
      <div className="search-box">
        <input 
          type='text' 
          placeholder='지역을 입력하세요.' 
          value={cityName} 
          onChange={handleChange} 
          onKeyPress={onSearchEnter}
          onFocus={handleFocus} 
          />
        <button onClick={handleClick}>검색</button>
      </div>
      <ul className={`search-list ${isFocused ? 'show' : ''}` } tabIndex={0} onClick={handleListClick}>
      <li onClick={() => handleListItemClick('Prague')}>Prague</li>
      <li onClick={() => handleListItemClick('New York')}>New York</li>
      <li onClick={() => handleListItemClick('Manila')}>Manila</li>
      <li onClick={() => handleListItemClick('Madagascar')}>Madagascar</li>
      <li onClick={() => handleListItemClick('Wellington')}>Wellington</li>
      <li onClick={() => handleListItemClick('Singapore')}>Singapore</li>
      </ul>
    </div>
  );
}


export default Search