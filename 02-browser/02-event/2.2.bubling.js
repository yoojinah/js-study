const div = document.querySelector("div");
const p = document.querySelector("p");

div.addEventListener("click", (evnt) => {
  console.log("div입니다");
  // evnt.target은 이벤트 발생시킨 요소(div)
  console.log(evnt.target);
  // evnt.currentTargettarget :
  // 이벤트 핸들러 실행시킨 요소
  console.log(evnt.currentTargettarget);
});

p.addEventListener("click", (e) => {
  // 이벤트를 전파하지 않고 해당 요소 이벤트만 실행
  // 제일 상단에 입력하는게 중요
  e.stopPropagation();

  console.log("p입니다");

  console.log(e.target);
  // evnt.currentTargettarget :
  // 이벤트 핸들러 실행시킨 요소 (div)
  console.log(e.currentTargettarget);
});
