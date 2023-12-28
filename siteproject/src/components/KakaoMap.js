import React, { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { styled } from 'styled-components';

// window.kakao 객체를 가져옴
const { kakao } = window;

const KakaoMap = ({ coords }) => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [keyword, setKeyword] = useState('');

  // * coords 값에 따라 keyword에 넣을 'X시 + Y동 + 칵테일바' 값 set (단, lat, lon이 0이 아닐 때)
  useEffect(() => {
    if (coords.lat !== 0 && coords.lon !== 0) {
      // 주소-좌표 변환 객체를 생성
      const geocoder = new kakao.maps.services.Geocoder();
      // 좌표 값에 해당하는 구 주소와 도로명 주소 정보를 요청
      // - x : x좌표 (longitude) / y : y좌표 (latitude)
      // - callback : 검색 결과를 받을 콜백함수
      geocoder.coord2Address(coords.lon, coords.lat, (address) => {
        const getAddressName = address[0].address;
				// keyword값 예시 : 부천시 중동 칵테일바
        setKeyword(`${getAddressName.region_2depth_name} ${getAddressName.region_3depth_name} 칵테일바`);
      });
    }
  }, [coords]);

  // * keyword값에 따라 지도 API 내부 검색, 검색 결과를 지도에 마커로 set
  useEffect(() => {
    // keyword가 초기의 빈값일 경우 API 요청을 수행하지 않음
    if (!keyword || keyword.trim() === '' || !map) return;

    // 장소 검색 서비스 객체 생성
    const ps = new kakao.maps.services.Places();

    // 입력한 키워드로 검색
    // - keyword: 검색할 키워드
    // - callback: 검색 결과를 받을 콜백함수
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해 LatLngBounds 객체에 좌표 추가
        const bounds = new kakao.maps.LatLngBounds();
        const addMarkers = [];

        for (let i = 0; i < data.length; i += 1) {
          addMarkers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // 인수로 주어진 좌표를 포함하도록 영역 정보를 확장
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(addMarkers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
    });
  }, [map, keyword]);

  // JSX로 지도와 마커를 렌더링
  return (
    <>
    {/* <MapSection> */}
      {/* 로드뷰를 표시할 Container */}
      <Map
        // 중심으로 설정할 위치
        center={{
          lat: coords.lat,
          lng: coords.lon,
        }}
        style={{
          width: '100%',
          height: '94%',
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            // 표시 위치
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
          </MapMarker>
        ))}
      </Map>
    {/* </MapSection> */}
    </>
  );
};

export default KakaoMap;

const MapSection = styled.section`
  width: 360px;
  height: 100vh;
  margin-left: -17px;
`;
