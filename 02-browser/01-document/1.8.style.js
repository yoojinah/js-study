// console.log(document.body.className); // main page

// // 목록 조회
// console.log(document.body.classList);
// // add/remove/toggle

// // 클래스 추가
// document.body.classList.add("article");
// console.log(document.body.className);

// // 존재 여부 확인
// console.log(document.body.classList.contains("article"));

// document.body.classList.remove("article");
// console.log(document.body.className);

// // 토글
// if (document.body.classList.contains("article")) {
//   document.body.className.remove("article");
// } else {
//   document.body.classList.add("article");
// }

// document.body.classList.toggle("article");
// console.log(document.body.className);

// // 카멜케이스 사용
// // background-color  => elem.style.backgroundColor
// // z-index           => elem.style.zIndex
// // border-left-width => elem.style.borderLeftWidth
// // document.body.style.backgroundColor = prompt(
// //   "배경을 무슨색으로 바꿀까요?",
// //   "green"
// // );

// document.body.style.display = "none"; // hide

// // settimeout은 코드가 멈춘게 아니고
// // 특정 시간 후 실행이 되는 것
// setTimeout(() => (document.body.style.display = ""), 3000);

// document.body.setAttribute("style", "color:red; background-color:yellow");

const notification = document.querySelector(".notification");
notification.style.backgroundColor = "beige";

const flexDiv = document.createElement("div");
flexDiv.classList.add("flexDiv");
flexDiv.style.display = "flex";
flexDiv.style.justifyContent = "space-between";
notification.appendChild(flexDiv);

const p = document.createElement("div");
p.textContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";

const showNotification = document.createElement("div");
showNotification.classList.add("showNotification");
flexDiv.append(p, showNotification);

showNotification.textContent = "hello";

const insideP = document.createElement("p");
insideP.classList.add("add");
insideP.textContent = "0";
insideP.style.margin = "0";
insideP.style.marginTop = ".5rem";
// insideP.style.display = "none";
insideP.style.textAlign = "center";
showNotification.appendChild(insideP);

// showNotification.style.backgroundColor = 'brown';
//   showNotification.style.padding = '1rem 2rem';
//   showNotification.style.borderRadius = '10px';
//   showNotification.style.color = '#fff';
//   showNotification.style.marginRight = '20px';

// showNotification.style = {
//   backgroundColor: "brown",
//   padding: "1rem 2rem",
//   borderRadius: "10px",
//   color: "#fff",
//   marginRight: "20px",
// };

Object.assign(showNotification.style, {
  backgroundColor: "brown",
  padding: "1rem 2rem",
  borderRadius: "10px",
  color: "#fff",
  marginRight: "20px",
});

let counterValue = 1;

function updateCounter() {
  // p 태그의 텍스트 내용을 현재 counterValue로 갱신
  insideP.textContent = counterValue;

  // counterValue 증가
  counterValue++;
}

// 1초마다 updateCounter 함수 호출하여 값 갱신
const intervalId = setInterval(updateCounter, 1000);

// 원하는 시점에 타이머 멈추기 (예: 10초 후)
setTimeout(() => {
  showNotification.classList.add("hidden");
  clearInterval(intervalId); // 타이머 종료
}, 10000);

// show({
//   top: 10,
//   right: 10,
//   html: `<strong>hello</strong> ${count}`,
//   className: "welcome",
// });
// // 함수 구조분해 할당
// function show(top, right, html, className) {}

const exampleElement = document.getElementById("example");

console.log("offsetHeight:", exampleElement.offsetHeight);
console.log("clientHeight:", exampleElement.clientHeight);
