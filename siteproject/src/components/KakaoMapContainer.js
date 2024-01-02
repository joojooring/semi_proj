import React, { useEffect, useState } from 'react';
import "../styles/map.css"
// import "../index.css"
const { kakao } = window;

export default function KakaoMapContainer ({ searchPlace }) {
  const [Places, setPlaces] = useState([]);

  useEffect(() => {
    const initializeMap = () => {
      const container = document.getElementById('myMap');
      const options = {
        center: new kakao.maps.LatLng(37.53369071500842, 126.96329157378412),
        level: 4,
        mapTypeId: kakao.maps.MapTypeId.ROADMAP,
      };
      const map = new kakao.maps.Map(container, options);
    //   const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
      const markerPosition = new kakao.maps.LatLng(37.53369071500842, 126.96329157378412);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      const iwContent = '<div style="padding:5px;">내 위치!</div>';
      const iwPosition = new kakao.maps.LatLng(37.53369071500842, 126.96329157378412);
      const iwRemoveable = true;

      const infowindow = new kakao.maps.InfoWindow({
        map: map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(map, marker);
      const ps = new kakao.maps.services.Places();

      ps.keywordSearch(searchPlace, placesSearchCB);

      function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            displayMarker(data[i]);
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }

          map.setBounds(bounds);
          displayPagination(pagination);
          setPlaces(data);
        }
      }

      function displayPagination(pagination) {
        var paginationEl = document.getElementById('pagination'),
          fragment = document.createDocumentFragment(),
          i;

        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }

        for (i = 1; i <= pagination.last; i++) {
          var el = document.createElement('a');
          el.href = '#';
          el.innerHTML = i;

          if (i === pagination.current) {
            el.className = 'on';
          } else {
            el.onclick = (function (i) {
              return function () {
                pagination.gotoPage(i);
              };
            })(i);
          }

          fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      }

      function displayMarker(place) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x),
        });

        kakao.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          infowindow.open(map, marker);
        });
      }
    };

    initializeMap();

    return () => {
      // 컴포넌트가 언마운트될 때 실행될 클린업 함수
      // 필요한 경우에만 사용하세요.
    };
  }, [searchPlace]);

  return (
    <div>
      <div
        id="myMap"
        style={{
          width: '1100px',
          height: '1400px',
        }}
      ></div>
      <div id="result-list">
        {Places.map((item, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <span>{i + 1}</span>
            <div>
              <h5>{item.place_name}</h5>
              {item.road_address_name ? (
                <div>
                  <span>{item.road_address_name}</span>
                  <span>{item.address_name}</span>
                </div>
              ) : (
                <span>{item.address_name}</span>
              )}
              <span>{item.phone}</span>
            </div>
          </div>
        ))}
        <div id="pagination"></div>
      </div>
    </div>
  );
};
