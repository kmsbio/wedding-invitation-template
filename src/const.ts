import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import "dayjs/locale/ko"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale("ko")

export { dayjs }

export const WEDDING_DATE = dayjs.tz("2027-05-15 14:00", "Asia/Seoul")
export const WEDDING_DATE_FORMAT = `YYYY년 MMMM D일 dddd A h시${WEDDING_DATE.minute() === 0 ? "" : " m분"}`
export const HOLIDAYS: number[] = []

export const LOCATION = "예시 웨딩홀"
export const LOCATION_ADDRESS = "예식장 주소를 입력해 주세요."
export const SHARE_ADDRESS = LOCATION_ADDRESS
export const SHARE_ADDRESS_TITLE = LOCATION

// [경도, 위도] 순서로 입력합니다.
export const WEDDING_HALL_POSITION: [number, number] | null = null
export const NMAP_PLACE_ID: number | null = null

export const PRIMARY_PARKING: {
  name: string
  address: string
  position: [number, number] | null
  kakaoPlaceId: number | null
} = {
  name: "예시 주차장",
  address: "주차장 주소를 입력해 주세요.",
  position: null,
  kakaoPlaceId: null,
}

export const BRIDE_FULLNAME = "박다온"
export const BRIDE_FIRSTNAME = "다온"
export const BRIDE_TITLE = "장녀"
export const BRIDE_FATHER = "박○○"
export const BRIDE_MOTHER = "최○○"
export const BRIDE_INFO = [
  {
    relation: "신부",
    name: BRIDE_FULLNAME,
    phone: "",
    account: "예시은행 000-0000-000000 (예시)",
  },
]

export const GROOM_FULLNAME = "이하늘"
export const GROOM_FIRSTNAME = "하늘"
export const GROOM_TITLE = "차남"
export const GROOM_FATHER = "이○○"
export const GROOM_MOTHER = "정○○"
export const GROOM_INFO = [
  {
    relation: "신랑",
    name: GROOM_FULLNAME,
    phone: "",
    account: "예시은행 000-0000-000000 (예시)",
  },
]
