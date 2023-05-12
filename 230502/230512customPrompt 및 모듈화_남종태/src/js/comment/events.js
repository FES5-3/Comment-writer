// 이벤트를 부여하고 이벤트에 관련된 함수를 정의하는 모듈입니다.

import { addCommentData, saveData } from "./data.js";
import { renderComment } from "./render.js";
import { data } from "./data.js";
import { modalPrompt } from "../Modal/Modal.js";

// Dom 요소 가져오기
// Dom 탐색 최적화를 위해 $main요소, $commentForm 요소를 추가하였습니다.
const $main = document.querySelector("main");
const $commentForm = $main.querySelector(".comment-form");
const $inputAuth = $commentForm.querySelector("#input-auth");
const $inputPw = $commentForm.querySelector("#input-pw");
const $inputComment = $commentForm.querySelector("#input-comment");
const $writeBtn = $commentForm.querySelector(".write-btn");

const $commentLists = $main.querySelector(".comment-lists");
const $textCounter = $commentForm.querySelector(".text-counter");
const $checkbox = $commentForm.querySelector(".input-checkbox");
const $checkboxLabel = $commentForm.querySelector(".checkbox-label");
const $orderBtn = $main.querySelector(".order-btn");

//공백 제거를 위한 trim() 사용
$inputAuth.addEventListener("input", () => {
  $inputAuth.value = $inputAuth.value.trim();
});

//댓글 입력 textarea에 글자가 입력될떄 마다 textCounter의 textContent에 현제 입려력된 글자의 길이를 넣습니다.
$inputComment.addEventListener("input", (e) => {
  $textCounter.textContent = `${e.target.value.length}/100`;
});

$checkbox.addEventListener("change", (e) => {
  if (e.target.checked) {
    $checkboxLabel.classList.add("active");
  } else {
    $checkboxLabel.classList.remove("active");
  }
});

$writeBtn.addEventListener("click", () => {
  //유효성 검사 (작성자나, 비멀번호가 없을 경우)
  if (!$inputAuth.value) {
    alert("아이디를 입력해주세요!");
    return;
  }
  if ($inputPw.value.length < 4) {
    alert("비밀번호는 최소 4자리 이상입니다!");
    return;
  }

  if (!$inputComment.value.trim()) {
    alert("댓글을 입력해주세요!");
    return;
  }

  // 2023.05.09 회고 비밀글 구현
  // 비밀글 작성을 물어보는 로직
  if ($checkbox.checked) {
    const secret = confirm(
      "현재 댓글은 비밀글로 작성됩니다. 작성 하시겠습니까?"
    );
    if (!secret) {
      return;
    }
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

// 2023.05.09 회고 비밀글 구현
// 비밀댓글 이벤트
function showComment(item) {
  const $commentItem = document.getElementById(item.id);
  const $commentContent = $commentItem.querySelector(".comment-content");
  // data중 인자로 받은 id와 일치하는 데이터를 찾습니다.
  // 해당 댓글의 비밀댓글 상태를 show로 변경합니다.
  data.find((el, idx) => {
    if (el.id === item.id) {
      item.secretState = "show";
      $commentContent.textContent = data[idx].content;
    }
  });
}

function editComment(id) {
  const $commentItem = document.getElementById(id);
  const $commentInfo = $commentItem.querySelector(".comment-info");
  const $editForm = $commentItem.querySelector(".edit-form");
  $commentInfo.classList.add("inactive");
  $editForm.classList.add("active");
}

// 수정 완료 함수
function editComplete(item) {
  // 현재 수정할 댓글의 id값을 받습니다.
  // dom에서 id에 해당되는 요소를 찾습니다.
  const $commentItem = document.getElementById(item.id);
  const $editCheckBox = $commentItem.querySelector(".input-editCheckbox");
  const $inputEditComment = $commentItem.querySelector(".input-editComment");
  // 만약에 수정 댓글창에 내용이 없다면
  if (!$inputEditComment.value.trim()) {
    alert("내용을 입력해주세요!");
    return;
  }
  // 2023.05.09 비밀글 구현
  // 수정내용이 없는지 확인하는 로직
  // 인풋 내용의 내용이 현재 댓글의 내용과 같고,
  // checkbox가 체크 되어 있으면 현재 비밀글 상태가 secret상태인지
  // cehckbox가 체크 되어 있지 않다면 현재 비밀글 상태가 normal인지
  if (
    ($inputEditComment.value === item.content &&
      $editCheckBox.checked &&
      item.type === "secret") ||
    (!$editCheckBox.checked && item.type === "normal")
  ) {
    alert("수정 사항이 없습니다!");
    return;
  }

  // ==수정내용==
  // 수정 전 사용자에게 수정사항을 한번 더 물어보는 과정을 추가
  if (confirm("정말 수정 하시겠습니까?")) {
    // id에 해당하는 댓글의 commentInfo를 찾습니다.
    const $commentInfo = $commentItem.querySelector(".comment-info");
    // id에 해당하는 댓글의 수정 폼을 찾습니다.
    const $editForm = $commentItem.querySelector(".edit-form");
    // id에 해당하는 댓글의 내용을 찾습니다.
    const $commentContent = $commentItem.querySelector(".comment-content");
    // id에 해당하는 비밀글 보기 버튼을 찾습니다.
    const $showBtn = $commentItem.querySelector(".show-btn");
    data.find((el, idx) => {
      if (el.id === item.id) {
        data[idx].content = $inputEditComment.value;
        $editCheckBox.checked
          ? (data[idx].type = "secret")
          : (data[idx].type = "normal");
        // 2023.05.09 회고 비밀글  구현
        // 만약 secretState = show 상태에서 비밀글로 전환될 수 도 있기 때문에 secretState = "hide"로 초기화
        $editCheckBox.checked ? (data[idx].secretState = "hide") : null;
      }
    });
    // 2023.05.09 회고 비밀글 구현
    // 여기도 innerHTML로 되어있었네요. 수정했습니다.
    // innerHTML은 사용자 입력을 받기 때문에 사용하면 안됩니다. XSS공격의 위험 때문입니다.
    // 현재 타입이 일반글이라면 화면에 출력되는 댓글 수정해줍니다.
    // 일반글이 아니라면 화면에 출력되는 댓글을 수정하지 않습니다. => 비밀글 일 경우 '비밀글 입니다.'라는 내용이 그대로 출력됩니다.
    if (item.type === "normal") {
      $commentContent.textContent = $inputEditComment.value;
      $showBtn.classList.remove("active");
    } else {
      $commentContent.textContent = "비밀글 입니다.";
      $showBtn.classList.add("active");
      $showBtn.style.backgroundImage = "url(./src/img/hide-icon.png)";
    }
    saveData(data);
    // 댓글 수정창을 없애고, 댓글을 다시 보여 줍니다.
    $commentInfo.classList.remove("inactive");
    $editForm.classList.remove("active");
  }
}

// <------------- 제가 수정한 부분 ------------->
async function deleteComment(deleteData) {
  // 삭제할 데이터 이외의 데이터들을 필터링하여 데이터 객체에 넣습니다.
  // 모듈을 사용하면 외부 다른 모듈의 변수의 값에 접근하여 값을 변경할 수 없기 때문에 함수의 인자로 넘겨주어 값을 변경시켜 줍니다.
  const newData = data.filter((el) => el.id !== deleteData.id);
  // 필터링된 데이터를 로컬스토리지에 넣습니다.
  saveData(newData);
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
    $commentLists.innerHTML = "";
    renderComment([...data].reverse());
  } else {
    $commentLists.innerHTML = "";
    renderComment(data);
  }
});

// renderComment함수의 이벤트 적용 함수
// 매개변수로 현재 commentItem과 item값을 받아옵니다.
function bindRenderEvents($commentItem, item) {
  const $delBtn = $commentItem.querySelector(".del-btn");
  const $showBtn = $commentItem.querySelector(".show-btn");
  const $editBtn = $commentItem.querySelector(".edit-btn");
  const $cancelBtn = $commentItem.querySelector(".cancel-btn");
  const $editCommentBtn = $commentItem.querySelector(".editComment-btn");
  const $inputEditComment = $commentItem.querySelector(".input-editComment");
  const $inputEditCheckbox = $commentItem.querySelector(".input-editCheckbox");
  const $editCheckboxLabel = $commentItem.querySelector(".checkbox-label");
  $delBtn.addEventListener("click", async() => {
    const inputPassword = await modalPrompt(item.password);
    if (inputPassword) {
      deleteComment(item);
    } 
  });

  $showBtn.addEventListener("click", async () => {
    if (item.secretState === "hide") {
      const inputPassword = await modalPrompt(item.password);
      if (inputPassword) {
        $showBtn.style.backgroundImage = "url('./src/img/show-icon.png')";
        showComment(item);
      }
    }
  });

  $editBtn.addEventListener("click", async () => {
    const inputPassword = await modalPrompt(item.password);
    if (inputPassword) {
      editComment(item.id);
    } 
  });

  $cancelBtn.addEventListener("click", () => {
    const $commentInfo = $commentItem.querySelector(".comment-info");
    const $editForm = $commentItem.querySelector(".edit-form");
    $commentInfo.classList.remove("inactive");
    $editForm.classList.remove("active");
  });

  $inputEditComment.addEventListener("input", (e) => {
    const $textCounter = $commentItem.querySelector(".text-counter");
    $textCounter.textContent = `${e.target.value.length}/100`;
  });

  $editCommentBtn.addEventListener("click", () => {
    editComplete(item);
  });

  $inputEditCheckbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      $editCheckboxLabel.classList.add("active");
    } else {
      $editCheckboxLabel.classList.remove("active");
    }
  });
}

// 이렇게 아래에서 한번에 필요한 것들을 묶어서 export 가능합니다.
export {
  editComment,
  editComplete,
  showComment,
  deleteComment,
  bindRenderEvents,
};
