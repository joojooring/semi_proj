import React, { useEffect } from 'react';
import axios from 'axios';

const { kakao } = window;

function Dental() {
  useEffect(() => {
    const initializeMap = () => {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(37.53369071500842, 126.96329157378412),
        level: 4,
        mapTypeId: kakao.maps.MapTypeId.ROADMAP,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);

      const markerPosition = new kakao.maps.LatLng(37.53369071500842, 126.96329157378412);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);

      const iwContent = '<div style="padding:5px;">내위치!</div>';
      const iwPosition = new kakao.maps.LatLng(37.53369071500842, 126.96329157378412);
      const iwRemoveable = true;

      const infowindow = new kakao.maps.InfoWindow({
        map: map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      infowindow.open(map, marker);
    };

    initializeMap();
  }, []);

  return (
    <>
      <div id='map' style={{ width: "2300px", height: "1000px" }}></div>
    </>
  );
}

export default Dental;
