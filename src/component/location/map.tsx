import { useEffect, useState, useRef } from "react"
import { useKakao, useNaver } from "../store"
import nmapIcon from "../../icons/nmap-icon.png"
import knaviIcon from "../../icons/knavi-icon.png"
import tmapIcon from "../../icons/tmap-icon.png"
import LockIcon from "../../icons/lock-icon.svg?react"
import UnlockIcon from "../../icons/unlock-icon.svg?react"
import {
  NMAP_PLACE_ID,
  PRIMARY_PARKING,
  WEDDING_HALL_POSITION,
} from "../../const"
import { NAVER_MAP_CLIENT_ID } from "../../env"

export const Map = () => {
  return (
    <>
      {NAVER_MAP_CLIENT_ID && WEDDING_HALL_POSITION ? (
        <NaverMap position={WEDDING_HALL_POSITION} />
      ) : (
        <div className="map-unavailable">
          {NMAP_PLACE_ID
            ? "아래 네이버 지도에서 예식장 위치를 확인해 주세요."
            : "예식장 지도 정보가 아직 등록되지 않았습니다."}
        </div>
      )}
      <Navigation />
    </>
  )
}

const NaverMap = ({ position }: { position: [number, number] }) => {
  const naver = useNaver()
  const ref = useRef<HTMLDivElement>(null)
  const [locked, setLocked] = useState(true)
  const [showLockMessage, setShowLockMessage] = useState(false)
  const lockMessageTimeout = useRef<number | null>(null)

  useEffect(() => {
    if (naver) {
      const map = new naver.maps.Map(ref.current, {
        center: position,
        zoom: 17,
      })

      new naver.maps.Marker({ position, map })

      return () => {
        map.destroy()
      }
    }
  }, [naver, position])

  return (
    <>
      <div className="map-wrapper">
        {locked && (
          <div
            className="lock"
            onTouchStart={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null) {
                clearTimeout(lockMessageTimeout.current)
              }
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
            onMouseDown={() => {
              setShowLockMessage(true)
              if (lockMessageTimeout.current !== null) {
                clearTimeout(lockMessageTimeout.current)
              }
              lockMessageTimeout.current = setTimeout(
                () => setShowLockMessage(false),
                3000,
              )
            }}
          >
            {showLockMessage && (
              <div className="lock-message">
                <LockIcon /> 자물쇠 버튼을 눌러
                <br />
                터치 잠금 해제 후 확대 및 이동해 주세요.
              </div>
            )}
          </div>
        )}
        <button
          className={"lock-button" + (locked ? "" : " unlocked")}
          onClick={() => {
            if (lockMessageTimeout.current !== null) {
              clearTimeout(lockMessageTimeout.current)
            }
            setShowLockMessage(false)
            setLocked((locked) => !locked)
          }}
        >
          {locked ? <LockIcon /> : <UnlockIcon />}
        </button>
        <div className="map-inner" ref={ref}></div>
      </div>
    </>
  )
}

const Navigation = () => {
  const kakao = useKakao()
  const isMobile = /iPhone|iPod|iPad|Android/.test(window.navigator.userAgent)
  const { position: parkingPosition, kakaoPlaceId } = PRIMARY_PARKING

  return (
    <>
      <div className="navigation">
        <div className="navigation-group">
          <div className="navigation-label">예식장 지도</div>
          <div className="navigation-buttons">
            <button
              aria-label="네이버 지도로 예식장 위치 보기"
              disabled={!NMAP_PLACE_ID}
              onClick={() => {
                if (isMobile) {
                  window.open(`nmap://place?id=${NMAP_PLACE_ID}`, "_self")
                } else {
                  window.open(
                    `https://map.naver.com/p/entry/place/${NMAP_PLACE_ID}`,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              }}
            >
              <img src={nmapIcon} alt="naver-map-icon" />
              네이버 지도
            </button>
          </div>
        </div>
        <div className="navigation-group parking-navigation">
          <div className="navigation-label">제1주차장 길안내</div>
          <div className="navigation-buttons">
            <button
              aria-label={`카카오 내비로 ${PRIMARY_PARKING.name} 길안내`}
              disabled={isMobile ? !parkingPosition : !kakaoPlaceId}
              onClick={() => {
                if (isMobile && parkingPosition) {
                  if (kakao) {
                    kakao.Navi.start({
                      name: PRIMARY_PARKING.name,
                      x: parkingPosition[0],
                      y: parkingPosition[1],
                      coordType: "wgs84",
                    })
                  } else {
                    alert(
                      "카카오 내비를 불러오지 못했습니다. 잠시 후 다시 시도하거나 티맵을 이용해 주세요.",
                    )
                  }
                } else {
                  window.open(
                    `https://map.kakao.com/link/map/${kakaoPlaceId}`,
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              }}
            >
              <img src={knaviIcon} alt="kakao-navi-icon" />
              카카오 내비
            </button>
            <button
              aria-label={`티맵으로 ${PRIMARY_PARKING.name} 길안내`}
              disabled={!parkingPosition}
              onClick={() => {
                if (isMobile && parkingPosition) {
                  const params = new URLSearchParams({
                    goalx: parkingPosition[0].toString(),
                    goaly: parkingPosition[1].toString(),
                    goalName: PRIMARY_PARKING.name,
                  })
                  window.open(`tmap://route?${params.toString()}`, "_self")
                } else {
                  alert("모바일에서 확인하실 수 있습니다.")
                }
              }}
            >
              <img src={tmapIcon} alt="t-map-icon" />
              티맵
            </button>
          </div>
        </div>
      </div>
      <div className="navigation-notice">
        {parkingPosition || kakaoPlaceId
          ? `자가용 이용 시 ${PRIMARY_PARKING.name}으로 이동해 주세요.`
          : "주차장 길안내 정보가 아직 등록되지 않았습니다."}
      </div>
    </>
  )
}
