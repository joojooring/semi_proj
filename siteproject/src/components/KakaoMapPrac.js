import React, { useEffect, useState } from 'react';
import { KakaoMap } from 'react-kakao-maps-sdk';


const { kakao } = window;

export default function KakaoMapPrac () {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [infowindow, setInfowindow] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 3,
      };
      const newMap = new kakao.maps.Map(mapContainer, mapOption);
      setMap(newMap);
    };

    initMap();
  }, []);

  useEffect(() => {
    if (map) {
      const ps = new kakao.maps.services.Places();
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      setInfowindow(infowindow);

      const searchPlaces = () => {
        const keyword = document.getElementById('keyword').value;
        if (!keyword.replace(/^\s+|\s+$/g, '')) {
          alert('키워드를 입력해주세요!');
          return false;
        }
        ps.keywordSearch(keyword, placesSearchCB);
      };

      const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          displayPlaces(data);
          displayPagination(pagination);
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
          alert('검색 결과가 존재하지 않습니다.');
          return;
        } else if (status === kakao.maps.services.Status.ERROR) {
          alert('검색 결과 중 오류가 발생했습니다.');
          return;
        }
      };

      const displayPlaces = (places) => {
        const placesList = document.getElementById('placesList');
        const fragment = document.createDocumentFragment();
        placesList.innerHTML = '';
        removeMarker();
        for (let i = 0; i < places.length; i++) {
          const place = places[i];
          const item = document.createElement('li');
          const title = document.createElement('span');
          item.className = 'item';
          title.className = 'title';
          title.innerHTML = place.place_name;
          item.appendChild(title);
          fragment.appendChild(item);
          const marker = addMarker(new kakao.maps.LatLng(place.y, place.x), i);
          const detail = createDetail(place);
          kakao.maps.event.addListener(marker, 'click', function () {
            displayInfowindow(marker, detail);
          });
          kakao.maps.event.addListener(item, 'click', function () {
            displayInfowindow(marker, detail);
          });
        }
        placesList.appendChild(fragment);
      };

      const addMarker = (position, idx) => {
        const marker = new kakao.maps.Marker({
          position: position,
        });
        marker.setMap(map);
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
        return marker;
      };

      const removeMarker = () => {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
        setMarkers([]);
      };

      const displayPagination = (pagination) => {
        const paginationEl = document.getElementById('pagination');
        const fragment = document.createDocumentFragment();
        const startingPage = pagination.current > 3 ? pagination.current - 2 : 1;
        const lastPage = startingPage + 4 <= pagination.last ? startingPage + 4 : pagination.last;
        if (pagination.last < 1) {
          paginationEl.innerHTML = '';
          return;
        }
        for (let i = startingPage; i <= lastPage; i++) {
          const el = document.createElement('a');
          el.href = '#';
          el.innerHTML = i;
          if (i === pagination.current) {
            el.className = 'on';
          } else {
            el.onclick = function () {
              pagination.gotoPage(i);
            };
          }
          fragment.appendChild(el);
        }
        paginationEl.innerHTML = '';
        paginationEl.appendChild(fragment);
      };

      const displayInfowindow = (marker, detail) => {
        const content = `<div style="padding:5px;font-size:12px;">${detail}</div>`;
        infowindow.setContent(content);
        infowindow.open(map, marker);
      };

      const createDetail = (place) => {
        const detail = `<div style="padding:5px;font-size:12px;">장소명: ${place.place_name}<br>주소: ${place.address_name}<br>전화번호: ${place.phone}</div>`;
        return detail;
      };

      searchPlaces();
    }
  }, [map, markers]);

  return (
    <div className="map_wrap">
      <div id="map" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}></div>
      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <form>
              키워드 : <input type="text" defaultValue="이태원 맛집" id="keyword" size="15" />
              <button type="submit">검색하기</button>
            </form>
          </div>
        </div>
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

