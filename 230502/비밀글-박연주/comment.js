// Dom 요소 가져오기
const $inputAuth = document.querySelector(".input-auth");
const $inputPw = document.querySelector(".input-pw");
const $inputComment = document.querySelector("#input-comment");
const $writeBtn = document.querySelector(".write-btn");
const $commentLists = document.querySelector(".comment-lists");
const $textCounter = document.querySelector(".text-counter");
const $orderBtn = document.querySelector(".order-btn");
const $checkbox = document.querySelector("#hidden-comment");

let data = []; // 댓글 데이터를 저장할 배열
let reverse = false; // 데이터를 반대로 정렬할 지 정하는 변수
//
// 만약에 로컬스토리지에 댓글 데이터가 있다면 => 기존 댓글 데이터 불러오기
if (localStorage.getItem("data")) {
  // 데이터 변수에 로컬스토리지에 저장된 데이터를 넣습니다.
  data = JSON.parse(localStorage.getItem("data"));
  // 댓글 목록 요소 생성
  renderComment(data);
}
// 공백제거를 위해 trim()를 사용하였습니다.
$inputAuth.addEventListener("input", () => {
  $inputAuth.value = $inputAuth.value.trim();
});
// 공백제거를 위해 trim()를 사용하였습니다.
$inputPw.addEventListener("input", () => {
  $inputPw.value = $inputPw.value.trim();
});
// 댓글 입력 textarea에 글자가 입력될때 마다 textCounter의 textContent에 현재 입력된 글자의 길이를 넣습니다.
$inputComment.addEventListener("input", (e) => {
  $textCounter.textContent = `${e.target.value.length}/100`;
});

$writeBtn.addEventListener("click", () => {
  // 유효성 검사(작성자가 입력되지 않았을 경우, 비밀번호가 4자리 미만인 경우, 내용이 없을경우)
  if (!$inputAuth.value) {
    alert("아이디를 입력해주세요!");
    return;
  }
  if ($inputPw.value.length < 4) {
    alert("비밀번호는 최소 4자리 이상입니다!");
    return;
  }
  // 여기서 trim()을 사용한 이유는 내용창에서는 공백이 포함될 수 있기 때문에 공백을 제거 후 내용이 있는지 없는지를 판단
  // 하기 위해서 입니다. => 만약 trim()이 없다면 공백도 글자에 포함되기 때문에 아무것도 안넣은 내용이 들어갈 수 있습니다.
  if (!$inputComment.value.trim()) {
    alert("내용을 입력해주세요!");
    return;
  }
  // addCommentData 함수는 현재 입력된 댓글을 data에 변수에 추가하는 함수 입니다.
  const newCommentData = addCommentData(); // 반환되는 값은 새로 생성된 데이터 입니다,
  // rednerComment 함수는  data를 인자로 받아 요소를 동적을 생성하여 데이터를 화면에 출력해주는 함수입니다.
  // ==추가==
  if ($orderBtn.classList.contains("up")) {
    // 데이터 재정렬을 위해 모든 데이터를 지우고, 반대로 정렬한 데이터를 넣어줍니다.
    $commentLists.innerHTML = "";
    renderComment([...data].reverse());
  } else {
    renderComment(newCommentData);
  }
//비밀글
if ($checkbox.checked) {
  const confirmResult = confirm("비밀글입니다. 설정하시겠습니까?");
  if (confirmResult) {
    newCommentData.type = 'hide';
    //console.log(newCommentData.type);  
  } else {
    $checkbox.checked = false;
    newCommentData.type = 'show';
    //console.log(newCommentData.type); 
  }
}
});

function addCommentData() {
  // 원래 id와 pw는 암호화와 복호화가 필요함 => 지금은 간단한 프로젝트 이므로 생략합니다.
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
    type: $checkbox.checked ? 'hide' : 'show'
    //
  };

  // 데이터 배열에 위에서만든 newCommentData 객체를 넣어줍니다.
  data.push(newCommentData);
  // 로컬스토리지에 data를 저장해줍니다.
  localStorage.setItem("data", JSON.stringify(data));
  // 모든 인풋 값들과 textCount를 초기화 해줍니다.
  $inputAuth.value = "";
  $inputPw.value = "";
  $inputComment.value = "";
  $textCounter.textContent = "0/100";
  // newCommentData를를 반환해줍니다.
  // newCommentData를 반환해주는 이유는 renderComment에서 해당 데이터를 사용하기 위해서 입니다.
  return [newCommentData];
}

// data를 인자로 받아 요소를 동적을 생성하여 데이터를 화면에 출력해주는 함수
function renderComment(data) {
  for (const item of data) {
    // createElement 요소생성
    // 그냥 요소를 생성하고 속성을 넣어주고 부모 요소에 자식요소를 넣어주는 과정입니다.
    // 코드가 길어서 복잡하다고 느낄 수 있습니다.
    // comment.html로 들어가서 코드로 보면 생성할 요소들이 무엇인지 간단하게 볼 수 있습니다.
    // innerHTML를 이용해서 간단하게 만들 수 있지만, innerHTML로 만든 요소들은 새로 추가시 이벤트가 지워지기 때문에
    // 여기서 사용은 적합하지 않습니다. => 삭제와 수정 버튼에 이벤트가 있기 때문입니다.
    // 대신 인라인요소로 이벤트를 넣어주면 이벤트가 지워지지 않습니다.  HTML 요소 자체에 직접적으로 속성 값으로 포함되있기 때문입니다.
    // innerHTML은 브라우저의 파서를 사용하여 HTML 코드를 구문 분석하고 렌더링하는 것이기 때문에, 많은 HTML 코드가 삽입될 때 성능에 좋지 않습니다. => 문자열을 html 코드로 변환하는 과정이 들어갑니다.
    // => innerHTML에서는 생성된 요소에 직접 접근할 수 없습니다.
    // => 이벤트를 줄때 마다 해당 요소를 dom에서 찾아주는 작업이 추가로 필요합니다.
    // 따로 이벤트가 없고 사용자 입력을 받는 것이 아니라면 innerHTML를 사용해도 좋습니다. (오늘 수업내용을 바탕으로 수정)
    // 하지만 innerHTML는 보안 이슈(XSS: Cross Site Scripting)가 있어서 사용에 주의가 필요합니다.
    // => 오늘 수업에서 사용자 입력을 받는 것이 아니라면 사용 가능하다고 합니다.
    // 저번에 써도 될 것 같다고 했는데 제가 잘못말했네요...
    // 이벤트가 안지워지게 사용하는 법을 찾고나서 그냥 쓰면 되겠다라고 생각하고,
    // 순간 사용자 입력을 받지 않는다고 생각했네요.
    // innerHTML로 바꿔서 쓰면 안됩니다. 
    // => 댓글 창에 사용자 입력을 받을 수 있기 때문입니다.
    // comment_innerHTML.js 파일 보시면 제가 innerHTML를 이용하여 코드를 바꿔놓았으니 참고해보시고. 
    // 입력 받는 인풋창 아무대나 넣고 아래 댓글 생성해 보세요.
    // <img src='#' onerror='alert('XSS공격!')'> 
    // <img src='#' onclick='alert('XSS공격!')'> => 댓글 생성후 클릭해보세요
    // <img src="#" onmouseover="alert('XSS공격!')"> => 댓글 생성후 마우스를 올려보세요
     

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

    $showBtn.setAttribute("class", "show-btn");
    $showBtn.setAttribute("type", "button");

    $commentBtns.setAttribute("class", "comment-btns");

    $editBtn.setAttribute("class", "edit-btn");

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
    $commentBtns.appendChild($editBtn);
    $commentBtns.appendChild($delBtn);
    $commentBtns.appendChild($showBtn);

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
    $commentContent.innerHTML = item.content;
    $inputEditComment.innerHTML = item.content;
    $createdAt.textContent = getCreatedAt(item.createdAt);
    $textCounter.textContent = `${item.content.length}/100`;
    
 // 
 if (item.type === 'hide') {
  $commentContent.textContent = '비밀글입니다.';
  $showBtn.style.backgroundImage = "url(img/hide-icon.png)";
} else {
  $commentContent.textContent = item.content;
} 
    // 이벤트 리스너 추가 생성된 요소에 이벤트 리스너를 추가해 줍니다.
    // 삭제 버튼에 클릭 이벤트 추가
   
    $commentContent.addEventListener('click', () => {
      if (item.type === 'hide') {
        $commentContent.textContent = item.content;
        item.type = 'show'; 
      }
    });

    $delBtn.addEventListener("click", () => {
      // 댓글 삭제 함수
      deleteComment(item);
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

// 댓글 수정 폼을 열어주는 함수
function editComment(id) {
  // 수정할 댓글의 id값을 인자로 받습니다.
  // dom에서 해당 아이디에 해당하는 댓글을 찾습니다.
  const $commentItem = document.getElementById(id);
  // id에 해당하는 댓글의 commentInfo를 찾습니다.
  const $commentInfo = $commentItem.querySelector(".comment-info");
  // id에 해당하는 댓글의 수정 폼을 찾습니다.
  const $editForm = $commentItem.querySelector(".edit-form");
  // 댓글 요소를 classList를 이용하여 display: none 처리하여 안보이게 합니다.
  $commentInfo.classList.add("inactive");
  // 댓글 수정 폼을 classList를 이용하여 display: block 처리하여 보이게 합니다.
  $editForm.classList.add("active");
}
///
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
    data.find((el, idx) => {
      if (el.id === id) data[idx].content = $inputEditComment.value;
    });
    $commentContent.innerHTML = $inputEditComment.value;
    // 로컬스토리지에 변경된 데이터를 넣어줍니다.
    localStorage.setItem("data", JSON.stringify(data));
    // 댓글 수정창을 없애고, 댓글을 다시 보여 줍니다.
    $commentInfo.classList.remove("inactive");
    $editForm.classList.remove("active");
  }
}

// 댓글을 삭제하는 함수
function deleteComment(deleteData) {
  // 삭제할 데이터를 인수로 받습니다.
  if (confirm("정말삭제하시겠습니까?")) {
    // prompt로 입력한 값과 deleteData의 password가 같은지 비교합니다.
    if (prompt("비밀번호를 입력해주세요.") === deleteData.password) {
      // 삭제할 데이터 이외의 데이터들을 필터링하여 데이터 객체에 넣습니다.
      data = data.filter((el) => el.id !== deleteData.id);
      // 필터링된 데이터를 로컬스토리지에 넣습니다.
      localStorage.setItem("data", JSON.stringify(data));
      // Dom에서 삭제될 댓글 요소를 가져옵니다.
      const deleteElement = document.getElementById(`${deleteData.id}`);
      // 해당 요소를 삭제합니다.
      deleteElement.remove();
      alert("삭제가 완료되었습니다.");
    } else {
      alert("비밀번호가 일치하지 않습니다!");
    }
  }
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
    $commentLists.innerHTML = "";
    renderComment([...data].reverse());
  } else {
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
