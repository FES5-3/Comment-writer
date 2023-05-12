const $modal = document.querySelector(".modal");
const $modalInputPw = $modal.querySelector(".input-password");
const $confirmBtn = $modal.querySelector(".btn-confirm");
const $cancelBtn = $modal.querySelector(".btn-cancel");
const $dim = $modal.querySelector(".dim");

$modalInputPw.addEventListener("input", (e)=>{
  e.target.value = e.target.value.trim();
});
$modalInputPw.addEventListener("keydown",(e)=>{
  if(e.keyCode===9 && e.shiftKey){
    e.preventDefault();
    $cancelBtn.focus();
  }
});
$cancelBtn.addEventListener("keydown",(e)=>{
  if(e.keyCode===9&&e.shiftKey){
    e.preventDefault();
    $confirmBtn.focus();
  }
  else if(e.keyCode===9) {
    e.preventDefault();
    $modalInputPw.focus();
  }
});

export async function modalPrompt(password) {
  $modal.classList.add("active");
  document.body.style.overflow = "hidden";
  $modalInputPw.value = "";
  $modalInputPw.focus();

  return new Promise((resolve, reject) => {
    const handleConfirm = (e) => {
      e.preventDefault();
      const value = $modalInputPw.value;
      if (!value) {
        alert("비밀번호를 입력해주세요!")
        return;
      }
      if (value !== password) {
        alert("비밀번호가 일치하지 않습니다!");
        $modalInputPw.value = '';
        return;
      }
      $modal.classList.remove("active");
      document.body.style.overflow = "auto";
      $confirmBtn.removeEventListener("click", handleConfirm);
      $cancelBtn.removeEventListener("click", handleCancel);
      resolve(value);
    };

    const handleCancel = () => {
      $modal.classList.remove("active");
      document.body.style.overflow = "auto";
      $confirmBtn.removeEventListener("click", handleConfirm);
      $cancelBtn.removeEventListener("click", handleCancel);
      $dim.removeEventListener("click", handleCancel);
      resolve("");
    };

    $confirmBtn.addEventListener("click", handleConfirm);
    $cancelBtn.addEventListener("click", handleCancel);
    $dim.addEventListener("click", handleCancel);
  });
}

