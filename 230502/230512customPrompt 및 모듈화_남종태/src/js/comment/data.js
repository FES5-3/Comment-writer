// 데이터와 관련된 모듈입니다.
// 데이터를 불러오고, 댓글 데이터를 추가하는 기능을 합니다.

// Dom요소 가져오기
// Dom 탐색 최적화를 위해 $commentForm 요소를 추가하였습니다.
const $commentForm = document.querySelector(".comment-form");
const $inputAuth = $commentForm.querySelector("#input-auth");
const $inputPw = $commentForm.querySelector("#input-pw");
const $inputComment = $commentForm.querySelector("#input-comment");
const $textCounter = $commentForm.querySelector(".text-counter");
const $checkbox = $commentForm.querySelector(".input-checkbox");

// "data"라는 key를 가진 값이 있으면 그 값을 data 변수에 할당하고, 값이 없는 경우 빈 배열을 할당합니다.
let data = JSON.parse(localStorage.getItem("data")) || [];

// 데이터를 새로운 데이터로 바꾸고, 로컬스토리지에 새로운 데이터를 저장해주는 함수입니다.
// 여러번 사용되어서 함수로 만들어 처리하였고, 모듈형식이라 다른 js 모듈에서 data를 직접적으로 변경할 수 없기때문에 여기서 새로운 데이터를 매개변수로 받아 데이터를 바꿔 줍니다.
function saveData(newData) {
  data = newData;
  localStorage.setItem("data", JSON.stringify(newData));
}



function addCommentData() {
  const newCommentData = {
    // uuid.v4() => 고유한 id값을 생성해주는 라이브러리입니다. index.html에 body 맨아래 부분에 script로 라이브러리가 추가되어있습니다.
    // <script src="https://cdn.jsdelivr.net/npm/uuid@8.3.2/dist/umd/uuid.min.js"></script> => 이겁니다.
    // 여기서 사용되는 이유는 데이터 저장시 각 댓글마다 고유한 id값을 주기 위해서 입니다.
    // (uuid는 매 초 10억개의 uuidd을 생성하여 중복될 일이 거의 없다고 합니다.)
    // 나중에 id값을 통해 해당 댓글을 조회하거나 수정 삭제할 수 있습니다.
    id: uuid.v4(),
    // 작성자 input에 입력된 값을 넣어줍니다.
    auth: $inputAuth.value,
    // 비밀번호 input에 입력된 값을 넣어줍니다.
    password: $inputPw.value,
    // 내용 textarea에 입력된 값을 넣어줍니다.
    content: $inputComment.value,
    // 댓글이 생성된 시간을 ms단위로 넣어줍니다.
    createdAt: new Date().getTime(),
    // 2023.05.09 회고 비밀글 구현
    // 비밀글 구분을 위해 넣어줍니다.
    type: $checkbox.checked ? "secret" : "normal",
    // 비밀글 상태 구분을 위해 넣어 줍니다. 초기값으로 hide를 비밀글을 감춥니다. 이후에 비밀번호가 일치하면 show 변경되어 비밀글을 볼 수 있게 처리합니다.
    secretState: "hide",
  };
  // 데이터 배열에 위에서만든 newCommentData 객체를 넣어줍니다.
  data.push(newCommentData);

  //로컬스토리지에 data를 저장해줍니다.
  localStorage.setItem("data", JSON.stringify(data));
  //모든 input 값들과 text들을 초기화 한다
  $inputAuth.value = "";
  $inputPw.value = "";
  $inputComment.value = "";
  $textCounter.textContent = "0/100";
  $checkbox.checked = false;
  return [newCommentData];
}

export { data, saveData, addCommentData };
