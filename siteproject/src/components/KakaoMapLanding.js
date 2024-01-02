import React, { useState } from 'react'
import KakaoMapContainer from './KakaoMapContainer'
import "../styles/searchmap.css"

function KakaoMapLanding() {
  const [InputText, setInputText] = useState('')
  const [Place, setPlace] = useState('')

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
        <input className='searchInput' placeholder="(동네이름 / 근처 지하철역 +)치과를 입력하세요" onChange={onChange} value={InputText} />
        <button className='searchButton' type="submit">검색</button>
      </form>
      <KakaoMapContainer searchPlace={Place} />
    </>
  )
}

export default KakaoMapLanding