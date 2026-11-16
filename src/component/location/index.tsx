import { Map } from "./map"
import CarIcon from "../../icons/car-icon.svg?react"
import BusIcon from "../../icons/bus-icon.svg?react"
import { LazyDiv } from "../lazyDiv"
import { LOCATION, LOCATION_ADDRESS, PRIMARY_PARKING } from "../../const"

export const Location = () => {
  return (
    <>
      <LazyDiv className="card location">
        <h2 className="english">Location</h2>
        <div className="addr">
          {LOCATION}
          <div className="detail">{LOCATION_ADDRESS}</div>
        </div>
        <Map />
      </LazyDiv>
      <LazyDiv className="card location">
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <BusIcon className="transportation-icon" />
          </div>
          <div className="heading">대중교통</div>
          <div />
          <div className="content">
            * 지하철 이용시 (도보 5분)
            <br />
            - 선정릉역 (9호선/수인분당선) 4번 출구
            <br />
            - 언주역 (9호선) 5번 출구
            <br />
          </div>
          <div />
          <div className="content">
            * 버스 이용 시
            <br />
            - 스포월드, 라움아트센터 / 간선(파랑): 141, 242
            <br />
            - 아크로힐스논현 / 지선(초록): 3412, 6411
            <br />
          </div>
        </div>
        <div className="location-info">
          <div className="transportation-icon-wrapper">
            <CarIcon className="transportation-icon" />
          </div>
          <div className="heading">자가용</div>
          <div />
          <div className="content">
            외부 주차장 이용가능 (2시간 무료주차)
            <br />- 제1주차장({PRIMARY_PARKING.name})
            <br />
            &nbsp;&nbsp;{PRIMARY_PARKING.address}
            <br />
            - 제2주차장(국민은행)
            <br />
            &nbsp;&nbsp;서울시 강남구 언주로 603
            <br />
          </div>
          <div />
          <div className="content">
            <b style={{ wordBreak: "keep-all" }}>
              ※ 주차혼잡이 예상되오니 가급적 대중교통 이용 부탁드립니다.
            </b>
          </div>
        </div>
      </LazyDiv>
    </>
  )
}
