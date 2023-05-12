// 이외의 기능을 담당하는 모듈 입니다.

// 유닉스타임(1970년 1월 1일 00:00:00 협정 세계시 부터의 경과 시간을 초로 환산하여 정수로 나타낸 것) 인자로 받아 형식에 맞게 날짜를 반환 해주는 함수입니다.

export function getCreatedAt(unixTime) {
  // new Date(유닉스 타임)을 해주면 현재 표준시를 구할 수 있습니다.
  const date = new Date(parseInt(unixTime));
  // 구한 표준시에서 연도를 구합니다.
  const year = date.getFullYear();
  // 구한 표준시에서 월을 구합니다.
  const month = `0${date.getMonth() + 1}`;
  // 구한 표준시에서 일을 구합니다.
  const day = `0${date.getDate()}`;
  // 구한 표준시에서 시간을 구합니다.
  const hour = `0${date.getHours()}`;
  // 구한 표준시에서 분을 구합니다.
  const minute = `0${date.getMinutes()}`;
  // const second = `0${date.getSeconds()}`; => 초가 까지 구하려면 사용하시면 됩니다.
  // 원하는 형식으로 날짜 형식으로 반환 해줍니다.
  // slice을 해준 이유는 만약 month가 10월이 된다면 010월로 출력되기 때문에
  // 10만 출력되게 하기 위해서 사용합니다.
  // 010.slice(-2) => 10 slice(-2)는 뒤에서 2글자를 잘라냅니다.
  // 1월일 경우는 01월로 표시되고 이걸 slice(-2)해도 결과는 01이 나오기 때문에변화가 없습니다.
  return `${year}.${month.slice(-2)}.${day.slice(-2)} ${hour.slice(
    -2
  )}:${minute.slice(-2)}`;
}