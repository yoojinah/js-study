const btn = document.querySelector(".btn");

// 이벤트 수신기(함수) 추가
// 화살표 함수는 this가 window로 인식
btn.addEventListener("click", () => {
  console.log(this);
  alert("click");
});

// 추가로 클릭 이벤트를 추가할 수 있는 방식
btn.addEventListener("click", function () {
  console.log(this);
  alert("click");
});

function sayTanks() {
  alert("감사 ~");
}
btn.addEventListener("click", sayTanks);

const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");
btn.addEventListener("click", () => {
  modal.style.opacity = "1";
});

closeBtn.addEventListener("click", () => {
  modal.style.opacity = "0";
});

// const input = document.querySelector(".name");
// input.addEventListener("keydown", (event) => {
//   if (event.key === "Enter") {
//     alert("엔터를 눌렀어요!");
//   }
// });

const ball = document.querySelector(".ball");
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  ball.style.left = mouseX + "px";
  ball.style.top = mouseY + "px";
});
