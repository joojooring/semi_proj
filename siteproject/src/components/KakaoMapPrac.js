import React, { useEffect } from 'react';
// import { Map, MapMarker } from 'react-kakao-maps-sdk';
// import { styled } from 'styled-components';

// window.kakao 객체를 가져옴
const { kakao } = window;

const MapComponent = () => {
  useEffect(() => {
    // 마커를 담을 배열입니다
    const markers = [];

    const mapContainer = document.getElementById('map'); // 지도를 표시할 div
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    // 키워드로 장소를 검색합니다
    searchPlaces();

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {
      const keyword = document.getElementById('keyword').value;

      if (!keyword.replace(/^\s+|\s+$/g, '')) {
        alert('키워드를 입력해주세요!');
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
        return;
      }
    }

    // 검색 결과 목록과 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      const placesList = document.getElementById('placesList');
      const fragment = document.createDocumentFragment();

      // 검색 결과 목록을 빈 목록으로 초기화합니다
      placesList.innerHTML = '';

      // 마커를 제거합니다
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

        // 마커를 생성하고 지도에 표시합니다
        const marker = addMarker(new kakao.maps.LatLng(place.y, place.x), i);
        const detail = createDetail(place);

        // 마커와 검색결과 항목을 클릭 했을 때
        // 해당 장소에 대한 상세정보를 표출하도록 설정합니다
        kakao.maps.event.addListener(marker, 'click', function () {
          displayInfowindow(marker, detail);
        });

        kakao.maps.event.addListener(item, 'click', function () {
          displayInfowindow(marker, detail);
        });
      }

      // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
      placesList.appendChild(fragment);
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, idx) {
      const marker = new kakao.maps.Marker({
        position: position,
      });

      marker.setMap(map);
      markers.push(marker);

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }

      markers.length = 0;
    }

    // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
    function displayPagination(pagination) {
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
    }

    // 마커에 표시할 인포윈도우를 생성하고 지도에 표시하는 함수입니다
    function displayInfowindow(marker, detail) {
      const content = `<div style="padding:5px;font-size:12px;">${detail}</div>`;

      infowindow.setContent(content);
      infowindow.open(map, marker);
    }

    // 장소 상세정보를 생성하는 함수입니다
    function createDetail(place) {
      const detail = `<div style="padding:5px;font-size:12px;">장소명: ${place.place_name}<br>주소: ${place.address_name}<br>전화번호: ${place.phone}</div>`;
      return detail;
    }

    return () => {
        // cleanup 함수
      };
  }, []);

  return (
    <div className="map_wrap">
      <div id="map" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}></div>

      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <form onSubmit={searchPlaces}>
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

export default MapComponent;
