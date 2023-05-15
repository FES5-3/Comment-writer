// Dom 요소 가져오기
const $inputAuth = document.querySelector(".input-auth");
const $inputPw = document.querySelector(".input-pw");
const $inputComment = document.querySelector("#input-comment");
const $writeBtn = document.querySelector(".write-btn");
const $commentLists = document.querySelector(".comment-lists");
const $textCounter = document.querySelector(".text-counter");
const $orderBtn = document.querySelector(".order-btn");
const $checkbox = document.querySelector("#hidden-comment");

// "data"라는 key를 가진 값이 있으면 그 값을 data 변수에 할당하고, 값이 없는 경우 빈 배열을 할당합니다.
let data = JSON.parse(localStorage.getItem("data")) || [];
let reverse = false;  // 데이터를 반대로 정렬할 지 정하는 변수




//만약 로컬스토리지에 댓글 데이터가 있다면 => 기존 댓글 데이터 불러오기
if (data.length > 0) {
  renderComment(data);
}


//공백 제거를 위한 trim() 사용
$inputAuth.addEventListener("input", () => {
  $inputAuth.value = $inputAuth.value.trim();
});

//댓글 입력 textarea에 글자가 입력될떄 마다 textCounter의 textContent에 현제 입려력된 글자의 길이를 넣습니다.
$inputComment.addEventListener("input", (e) => {
  $textCounter.textContent = `${e.target.value.length}/100`;
});

$writeBtn.addEventListener("click", () => {
  //유효성 검사 (작성자나, 비멀번호가 없을 경우)
  if (!$inputAuth.value) {
    alert("아이디를 입력해주세요!");
    return
  }
  if ($inputPw.value.length < 4) {
    alert("비밀번호는 최소 4자리 이상입니다!");
    return;
  }

  if (!$inputComment.value.trim()) {
    alert('댓글을 입력해주세요!');
    return;
  }




  //addCommentData 함수는 현제 입력된 댓글을 data 변수에 추가하는 함수 입니다.
  const newCommentData = addCommentData(); //반환되는 값은 새로 생성된 데이터

  if ($orderBtn.classList.contains("up")) {
    $commentLists.innerHTML = "";
    renderComment([...data].reverse());
  } else {
    renderComment(newCommentData);
  }
});

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
  };
  //양서진1
  if ($checkbox = checked) {
    const result = prompt('비밀글 설정하시겠습니까?')
    if (result) {
      newCommentData.type = 'hide'
      console.log('hide')
    } else {
      return;
    }
  } else {
    newCommentData.type = 'show'
  }
  // 데이터 배열에 위에서만든 newCommentData 객체를 넣어줍니다.
  data.push(newCommentData);

  //로컬스토리지에 data를 저장해줍니다.
  localStorage.setItem("data", JSON.stringify(data));
  //모든 input 값들과 text들을 초기화 한다
  $inputAuth.value = "";
  $inputPw.value = "";
  $inputComment.value = "";
  $textCounter.textContent = "0/100";
  return [newCommentData];
}



function renderComment(data) {
  for (const item of data) {
    const $commentItem = document.createElement("li");
    const $profileBox = document.createElement("div");
    const $userProfile = document.createElement("div");
    const $profileImg = document.createElement("img");
    const $auth = document.createElement("span");
    const $commentBtns = document.createElement("div");
    const $showBtn = document.createElement("button");
    const $editBtn = document.createElement("button");
    const $delBtn = document.createElement("button");
    const $commentInfo = document.createElement("div");
    const $commentContent = document.createElement("p");
    const $createdAt = document.createElement("span");
    const $editForm = document.createElement("form");
    const $inputEditComment = document.createElement("textarea");
    const $textareaFooter = document.createElement("div");
    const $textCounter = document.createElement("span");
    const $editCommentBtns = document.createElement("div");
    const $cancelBtn = document.createElement("button");
    const $editCommentBtn = document.createElement("button");

    // setAttribute 요소에 속성들을 넣습니다.
    $commentItem.setAttribute("class", "comment-item");
    $commentItem.setAttribute("id", item.id);

    $profileBox.setAttribute("class", "profile-box");

    $userProfile.setAttribute("class", "user-profile");

    $profileImg.setAttribute("class", "profile-img");
    $profileImg.setAttribute("src", "./img/profile.png");

    $auth.setAttribute("class", "auth");
    $auth.textContent = item.auth;

    $commentBtns.setAttribute("class", "comment-btns");

    $editBtn.setAttribute("class", "edit-btn");

    $showBtn.setAttribute("class", "show-btn");

    $delBtn.setAttribute("class", "del-btn");

    $commentInfo.setAttribute("class", "comment-info");

    $commentContent.setAttribute("class", "comment-content");
    $commentContent.textContent = "asfasf";

    $createdAt.setAttribute("class", "createdAt");
    $createdAt.textContent = getCreatedAt(item.createdAt);

    $editForm.setAttribute("class", "edit-form");

    $inputEditComment.setAttribute("class", "input-editComment");
    $inputComment.setAttribute(
      "placeholder",
      "개인정보를 공용 및 요청하거나, 명예훼손, 무단 광고, 불법 정보 유포시 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
    );
    $inputComment.setAttribute("maxlength", "100");

    $textareaFooter.setAttribute("class", "textarea-footer");

    $textCounter.setAttribute("class", "text-counter");
    $textCounter.textContent = "0/100";

    $editCommentBtns.setAttribute("class", "editComment-btns");

    $cancelBtn.setAttribute("class", "cancel-btn");
    $cancelBtn.setAttribute("type", "button");
    $cancelBtn.textContent = "취소하기";

    $editCommentBtn.setAttribute("class", "editComment-btn");
    $editCommentBtn.setAttribute("type", "button");
    $editCommentBtn.textContent = "수정하기";

    //appebndChild 요소들이 해당되는 부모객체에 자식으로 넣어줍니다.
    $commentItem.appendChild($profileBox);

    $profileBox.appendChild($userProfile);
    $userProfile.appendChild($profileImg);
    $userProfile.appendChild($auth);

    $profileBox.appendChild($commentBtns);
    $commentBtns.appendChild($showBtn);
    $commentBtns.appendChild($editBtn);
    $commentBtns.appendChild($delBtn);

    $commentItem.appendChild($commentInfo);
    $commentInfo.appendChild($commentContent);
    $commentInfo.appendChild($createdAt);

    $commentItem.appendChild($editForm);
    $editForm.appendChild($inputEditComment);
    $editForm.appendChild($textareaFooter);

    $textareaFooter.appendChild($textCounter);
    $textareaFooter.appendChild($editCommentBtns);

    $editCommentBtns.appendChild($cancelBtn);
    $editCommentBtns.appendChild($editCommentBtn);

    $commentLists.appendChild($commentItem);

    $auth.textContent = item.auth;
    //양서진2
    $commentContent.textContent = item.type === "hide" ? "비밀글 입니다." : item.content;

    $inputEditComment.textContent = item.content;
    $createdAt.textContent = getCreatedAt(item.createdAt);
    $textCounter.textContent = `${item.content.length}/100`;

    // 이벤트 리스너 추가 생성된 요소에 이벤트 리스너를 추가해 줍니다.
    // 삭제 버튼에 클릭 이벤트 추가
    $delBtn.addEventListener("click", () => {
      // 댓글 삭제 함수
      deleteComment(item);
    });

    //비밀댓글 버튼에 클릭 이벤트 추가
    //양서진3
    $showBtn.addEventListener("click", () => {
      if (item.type === "hide") {
        const inputPw = prompt(
          "비밀 댓글입니다. 댓글을 보려면 비밀번호를 입력하세요."
        );
        if (inputPw === null) return;
        if (inputPw === item.password) {
          showComment(item);
        } else {
          alert("비밀번호가 일치하지 않습니다!");
        }
      }
    });

    // 수정 버튼에 클릭 이벤트 추가
    $editBtn.addEventListener("click", () => {
      // 댓글 수정 함수
      // 현재 prompt에 입력한 비밀번호와 현재 데이터의 password 값이 같다면
      if (prompt("비밀번호를 입력하세요.") === item.password) {
        editComment(item.id);
      } else {
        alert("비밀번호가 일치하지 않습니다!");
      }
    });

    // 취소 버튼에 클릭 이벤트 추가
    $cancelBtn.addEventListener("click", () => {
      // classList을 이용하여 댓글 요소를 display: none 처리하여 안보이게함
      $commentInfo.classList.remove("inactive");
      // classList을 이용하여 댓글 수정 폼을 display: block 처리하여 보이게함
      $editForm.classList.remove("active");
    });
    // 위 에서 댓글 입력창에 textCounter를 바꿔준거 처럼 댓글 수정 창에도 input이 변경되면 textCounter를 바꿔줍니다.
    $inputEditComment.addEventListener("input", (e) => {
      $textCounter.textContent = `${e.target.value.length}/100`;
    });
    // 수정완료 버튼 이벤트 추가
    $editCommentBtn.addEventListener("click", () => {
      // 수정 완료 함수 실행
      editComplete(item.id);
    });
  }
}

//양서진4
function showComment(item) {
  // 매개변수로 받은 item의 id 값을 통해 현재의 댓글 요소를 찾습니다.
  const $commentItem = document.getElementById(item.id);
  const $commentContent = $commentItem.querySelector(".comment-content");
  // data중 인자로 받은 id와 일치하는 데이터를 찾습니다.
  data.find((el, idx) => {
    if (el.id === item.id) {
      // 현재 데이터의 값을 show로 바꾸어줍니다.
      // 로컬스토리지에는 따로 저장하지 않습니다.  show 상태가 저장되면 새로고침했을경우 비밀글이 보여지기 때문에입니다.
      item.type = "show";
      $commentContent.textContent = data[idx].content;

    }
  });
}


//댓글 수정 폼을 열어주는 함수
function editComment(id) {
  const $commentItem = document.getElementById(id);
  const $commentInfo = $commentItem.querySelector(".comment-info");
  const $editForm = $commentItem.querySelector(".edit-form");
  $commentInfo.classList.add("inactive");
  $editForm.classList.add("active");
}

// 수정 완료 함수
function editComplete(id) {
  // 현재 수정할 댓글의 id값을 받습니다.
  // dom에서 id에 해당되는 요소를 찾습니다.
  const $commentItem = document.getElementById(id);
  const $inputEditComment = $commentItem.querySelector(".input-editComment");
  // 만약에 수정 댓글창에 내용이 없다면
  if (!$inputEditComment.value.trim()) {
    alert("내용을 입력해주세요!");
    return;
  } // ==수정내용==
  // 수정 전 사용자에게 수정사항을 한번 더 물어보는 과정을 추가
  if (confirm("정말 수정 하시겠습니까?")) {
    // id에 해당하는 댓글의 commentInfo를 찾습니다.
    const $commentInfo = $commentItem.querySelector(".comment-info");
    // id에 해당하는 댓글의 수정 폼을 찾습니다.
    const $editForm = $commentItem.querySelector(".edit-form");
    // id에 해당하는 댓글의 내용을 찾습니다.
    const $commentContent = $commentItem.querySelector(".comment-content");
    // id에 해당하는 댓글의 수정 인풋을 찾습니다.

    // 데이터 수정 로직
    // 수정할 데이터를 알아내기 위해 find 사용(데이터를 찾으면 바로 for문을 빠져 나가기 때문에 효율이 좋음)
    // 수정된 댓글에 해당되는 댓글 데이터의 내용 값을 변경해줍니다.
    // ==수정내용==
    // let editIdx;
    // data.find((el, idx) => {
    //   if (el.id === id) return editIdx=idx;
    // });
    // data[editIdx].content = $inputEditComment.value
    // 위 코드에서 아래 코드로 수정


    //양서진5
    data.find((el, idx) => {
      if (el.id === id) {data[idx].content = $inputEditComment.value;}
      $editCheckBox.checked
      ? (data[idx].type = "secret")
      : (data[idx].type = "normal");
      // 만약 show 상태에서 비밀글로 전환한다면 secretState = "hide"로 바꿔야 하기 때문
      $editCheckBox.checked 
      ? (data[idx].type = "hide")
      : null;
    });
    $commentContent.innerHTML = $inputEditComment.value;
    // 로컬스토리지에 변경된 데이터를 넣어줍니다.
    localStorage.setItem("data", JSON.stringify(data));
    // 댓글 수정창을 없애고, 댓글을 다시 보여 줍니다.
    $commentInfo.classList.remove("inactive");
    $editForm.classList.remove("active");
  }
}


// <------------- 제가 수정한 부분 ------------->
function deleteComment(deleteData) {
  const confirmDelete = confirm("정말 삭제하시겠습니까?");
  if (!confirmDelete) {
    //! confirmDelete = 취소버튼 누른경우
    return;
  }
  const inputPassword = prompt("비밀번호를 입력해주세요.");
  if (inputPassword !== deleteData.password) {
    alert("비밀번호가 일치하지 않습니다!");
    return;
  }
  // 삭제할 데이터 이외의 데이터들을 필터링하여 데이터 객체에 넣습니다.
  data = data.filter((el) => el.id !== deleteData.id);
  // 필터링된 데이터를 로컬스토리지에 넣습니다.
  localStorage.setItem("data", JSON.stringify(data));
  // Dom에서 삭제될 댓글 요소를 가져옵니다.
  const deleteElement = document.getElementById(`${deleteData.id}`);
  // 해당 요소를 삭제합니다.
  deleteElement.remove();
  alert("삭제가 완료되었습니다.");
}



// 데이터 정렬 변경 함수
// reverse, sort=> 날짜 순으로 내림차순으로
// 정렬 시 필요한 사항
// 삭제와 수정은 상관이 없습니다. => 삭제와 수정에 의해서는 정렬의 순서가 바뀌지 않습니다.
// 데이터 추가는 정렬의 순서에 따라 달라져야 합니다.
// 그러므로, 만약 데이터의 정렬이 내림차순이라면, 데이터를 추가 할 때 재정렬 해줘야합니다.
$orderBtn.addEventListener("click", () => {
  $orderBtn.classList.toggle("up");
  if ($orderBtn.classList.contains("up")) {
    reverse = true;
    $commentLists.innerHTML = "";
    renderComment([...data].reverse());
  } else {
    reverse = false;
    $commentLists.innerHTML = "";
    renderComment(data);
  }
});

// 유닉스타임(1970년 1월 1일 00:00:00 협정 세계시 부터의 경과 시간을 초로 환산하여 정수로 나타낸 것) 인자로 받아 형식에 맞게 날짜를 반환 해주는 함수입니다.
function getCreatedAt(unixTime) {
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




//비밀글로 등록하기를 체크한 댓글만 렌더링시 show-img를 추가하고  show-img 클릭시 비밀번호를 입력받아야만 ****에서 -> 본래 작성했던 사용자 이름과 ,텍스트가 보이게 바꿔야 함

//추가로 비밀글 등록시 텍스트가 비밀글입니다 로 바뀌기 전에 기존의 값을 저장하고 있어야 함 그래야 나중에 비밀글 보기 버튼을 클릭했을 때 원래 텍스트를 보여줄 수 있음


//로컬스토리지 내에 댓글마다 타입을 추가해서 일반 댓글과 비밀댓글을 구분해서 저장하게 끔 만든다.