import React, { useState } from 'react'
import KakaoMapContainer22 from './KakaoMapContainer22'
import "../styles/searchmap22.css"

function KakaoMapLanding22() {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState("용산역 치과")

  const onChange = (e) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlace(InputText)
    setInputText('')
  }

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input className='searchInput' placeholder="(동네이름 / 근처 지하철역 +) 치과를 입력하세요." onChange={onChange} value={InputText} />

        {/* <button class="btn btn-primary btn-jittery"> */}
        <button className="searchButton" type="submit">
        Click
        </button>
        {/* <button className="searchButton" type="submit">
        <span className="Marquee">Click</span>
        </button> */}
        {/* <button className='searchButton' type="submit">검색</button> */}
      </form>
      {/* <div className='mapContainer'>
      <div className='searchplace' > */}
      <KakaoMapContainer22 searchPlace={Place} />
      {/* </div>
      </div> */}
    </>
  )
}

export default KakaoMapLanding22