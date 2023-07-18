const elem = document.getElementById("elem");
console.log(elem);
console.log(elem.innerHTML);
elem.style.backgroundColor = "red";

// querySelectorAll 조건에 맞는 모든 요소 (여러개 선택)
const elemUl = document.querySelectorAll("ul > li:last-child");
console.log(elemUl);

// querySelector 조건에 맞는 처음요소 (하나만 선택)
const div = document.querySelector("#elem");
console.log(div);

// 태그 기준으로 선택 (All --> 모든 태그 선택됨)
// document.getElementsByTagName("li")
document.querySelectorAll("li");

// 클래스 기준으로 선택
// document.getElementsByClassName("item");
document.querySelector(".item");

// name 속성 기준으로 선택
const rdo = document.getElementsByName("rdo");
console.log(rdo);

// css 속성 선택자
// [속성명=값] {...}
const radio = document.querySelectorAll("input[name='rdo']");

console.log(radio);

// div id=elem > span
const span = document.querySelector("#elem > span");
console.log(span);

// #elem을 divElem변수명으로 만든 후
// .찍고 다시span을 선택하는 방식
// 자주 선택하는 부모요소를 js셀렉터로 객체화 해놓으면
// 밑 자식들 선택하기가 코드가 보기좋고 간소화 됨 접근 하기도 좋음
const divElem = document.querySelector("#elem");
const span2 = divElem.querySelector("span");
