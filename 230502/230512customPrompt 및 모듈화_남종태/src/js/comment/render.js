// 전체 댓글목록을 렌더링하는 모듈 입니다.

import { getCreatedAt } from "./libray.js";
import { bindRenderEvents } from "./events.js";
import { data } from "./data.js";

const $commentLists = document.querySelector(".comment-lists");

//만약 로컬스토리지에 댓글 데이터가 있다면 => 기존 댓글 데이터 불러오기
if (data.length > 0) {
  renderComment(data);
}

// 기존 for(const item of data)에서 => 좀 더 보기 쉽도록 for(const data of datas)로 변경하였습니다.
export function renderComment(datas) {
  const frag = new DocumentFragment();

  for (const data of datas) {
    const $commentItem = document.createElement("li");
    const $profileBox = document.createElement("div");
    const $userProfile = document.createElement("div");
    const $profileImg = document.createElement("img");
    const $auth = document.createElement("span");
    const $commentBtns = document.createElement("div");

    const $showBtn = document.createElement("button");
    const $showBtnText = document.createElement("span");

    const $editBtn = document.createElement("button");
    const $editBtnText = document.createElement("span");

    const $delBtn = document.createElement("button");
    const $delBtnText = document.createElement("span");

    const $commentInfo = document.createElement("div");
    const $commentContent = document.createElement("p");
    const $createdAt = document.createElement("time");
    const $editForm = document.createElement("form");
    const $inputEditComment = document.createElement("textarea");
    const $textareaFooter = document.createElement("div");
    const $textCounter = document.createElement("span");
    const $editCommentBtns = document.createElement("div");
    const $cancelBtn = document.createElement("button");
    const $editCommentBtn = document.createElement("button");
    const $editCheckBox = document.createElement("input");
    const $chkBoxLabel = document.createElement("label");

    $commentItem.setAttribute("class", "comment-item");
    $commentItem.setAttribute("id", data.id);

    $profileBox.setAttribute("class", "profile-box");

    $userProfile.setAttribute("class", "user-profile");

    $profileImg.setAttribute("class", "profile-img");
    $profileImg.setAttribute("src", "./src/img/profile.png");
    $profileImg.setAttribute("alt", "유저 프로필 이미지");
    $auth.setAttribute("class", "auth");
    $auth.textContent = data.auth;

    $commentBtns.setAttribute("class", "comment-btns");

    $editBtn.setAttribute("class", "edit-btn");
    $editBtnText.setAttribute("class", "a11y-hidden");
    $editBtnText.textContent = "수정하기";

    $showBtn.setAttribute("class", "show-btn");
    $showBtn.setAttribute("type", "button");

    if (data.type === "secret") {
      $showBtn.classList.add("active");
    }
    $showBtnText.setAttribute("class", "a11y-hidden");
    $showBtnText.textContent = "비밀글 보기";

    $delBtn.setAttribute("class", "del-btn");
    $delBtnText.setAttribute("class", "a11y-hidden");
    $delBtnText.textContent = "삭제하기";

    $commentInfo.setAttribute("class", "comment-info");

    $commentContent.setAttribute("class", "comment-content");
    $commentContent.textContent =
      data.type === "secret" ? "비밀글 입니다." : data.content;

    $createdAt.setAttribute("class", "createdAt");
    $createdAt.setAttribute("datetime", new Date(data.createdAt).toISOString());
    $createdAt.textContent = getCreatedAt(data.createdAt);

    $editForm.setAttribute("class", "edit-form");

    $inputEditComment.setAttribute("class", "input-editComment");
    $inputEditComment.setAttribute(
      "placeholder",
      "개인정보를 공용 및 요청하거나, 명예훼손, 무단 광고, 불법 정보 유포시 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
    );
    $inputEditComment.setAttribute("maxlength", "100");
    $inputEditComment.textContent = data.content;

    $textareaFooter.setAttribute("class", "textarea-footer");

    $textCounter.setAttribute("class", "text-counter");
    $textCounter.textContent = `${data.content.length}/100`;

    $chkBoxLabel.setAttribute("class", "checkbox-label");
    $chkBoxLabel.textContent = "비밀글 등록";

    $editCheckBox.setAttribute("type", "checkbox");

    $editCheckBox.setAttribute("class", "input-editCheckbox");
    if (data.type === "secret") {
      $editCheckBox.checked = true;
      $chkBoxLabel.classList.add("active");
    }

    $editCommentBtns.setAttribute("class", "editComment-btns");

    $cancelBtn.setAttribute("class", "cancel-btn");
    $cancelBtn.setAttribute("type", "button");
    $cancelBtn.textContent = "취소하기";

    $editCommentBtn.setAttribute("class", "editComment-btn");
    $editCommentBtn.setAttribute("type", "button");
    $editCommentBtn.textContent = "수정하기";

    $commentItem.appendChild($profileBox);

    $profileBox.appendChild($userProfile);
    $userProfile.append($profileImg, $auth);

    $profileBox.appendChild($commentBtns);

    $commentBtns.appendChild($showBtn);
    $showBtn.appendChild($showBtnText);

    $commentBtns.append($editBtn, $delBtn);
    $editBtn.appendChild($editBtnText);
    $delBtn.appendChild($delBtnText);

    $commentItem.appendChild($commentInfo);
    $commentInfo.append($commentContent, $createdAt);

    $commentItem.appendChild($editForm);
    $editForm.append($inputEditComment, $textareaFooter);

    $textareaFooter.append($textCounter, $editCommentBtns);

    $editCommentBtns.appendChild($chkBoxLabel);
    $chkBoxLabel.prepend($editCheckBox);
    $editCommentBtns.append($cancelBtn, $editCommentBtn);

    frag.appendChild($commentItem);

    bindRenderEvents($commentItem, data);
  }

  $commentLists.appendChild(frag);
}
