// const divInP = document.querySelectorAll("div > p");
const container = document.querySelector("#container");
const span = container.querySelector("span");
let count = 1;
const id = setInterval(() => {
  /*-------------------------- innerHTML과 관련--------------------------- */
  // 요소 내부 html을 변경
  // span.innerHTML = `<strong>${count}</strong>`;

  // 요소 내부 html을 추가
  // span.innerHTML += `<strong>${count}</strong>`;

  // (위치, 추가할html)
  // 위치 :
  // afterBegin 시작태그 바로 뒤(첫번재 자식)
  // beforeend : 끝태그 바로 앞 (마지막 자식)
  // span.insertAdjacentHTML("afterBegin", `<strong>${count}</strong>`);

  // 요소 내부 html을 뒤에 추가
  // span.innerHTML = `<strong>${count}</strong>` + span.innerHTML;

  count++;
  count > 10 && clearInterval(id);
}, 1000);

/*-------------------------- innerHTML과 관련--------------------------- */
// outerHTML 본인 태그 포함해서 변경이 일어남
console.log(span.outerHTML);
span.outerHTML = `<strong>${count}</strong>`;
console.log(span.outerHTML);

// 태그를 제외한 text노드의 data값만 가져올 수 있음(코드빼고 태그 안에 있는 내용 만)
console.log(container.innerHTML);
console.log(container.textContent);

/*-------------------------- hidden 관련--------------------------- */
// css의 display : none;과 비슷한 속성

// 자바스크립트로 css제어할 때
// container.classList.add('none');  // 추가
// container.classList.remove('none');   // 제거

span.hidden = false;
// html태그 속성에 hidden을 넣어줘야함

/*-------------------------- tagName 관련--------------------------- */
// const div = document.querySelector("div");

// 태그명이 대문자로 변환돼 나옴
// for (let elem of divInP) {
//   console.log(elem.tagName);
//   if (elem.tagName === "P") {
//     elem.style.backgroundColor = "red";
//   }
// }

/*-------------------------- 그외 속성 관련--------------------------- */
// console.log(div.id);

// id나 class로 선택하면 어떤 태그인지 잘 인식하지 못함
// 태그마다 알맞은 속성에 대한 자동완성이 안됨
// 일반적인 모든 html element에 대한 속성만 자동완성
const input = document.querySelector("input");
console.log(input.value);
console.log(input);

const ul = document.querySelector("ul");

// console.log(ul.children.length);

// li 자체를 배열로 가져옴(값도 포함)
// for (let li of ul.children) {
//   let i = Array.from(ul.children).indexOf(li);
//   console.log(ul.children[i]);
// }

// li안에 노드text값만 가져옴
// for (let li of document.querySelectorAll("li")) {
//   let tit = li.firstChild.data;
//   console.log(tit);
// }

const article = document.querySelector("article");
for (let at of article.querySelectorAll("div")) {
  let dat = at.firstChild.data;
  console.log(dat);
}
