// 표준 html attribute는 js property로 변환됨
console.log(document.body.id);
console.log(document.body.something);

// 비표준(사용자 정의, 커스터마이징) html attribute
console.log(document.body.getAttribute("something"));

// 사용자 정의 속성 추가(변경)
// body에 속성과 속성명이 추가됨
document.body.setAttribute("option", "special");
const arr = Array.from(document.body.attributes).map(
  (attr) => `${attr.name} = '${attr.value}'`
);
console.log(arr);

const items = document.querySelectorAll("ul li");
// data-(sno)의 값을 모두 가져오려면 dataset.sno(속성명)으로 for문 돌려서 모두 가져오기
for (let item of items) {
  console.log(item.dataset.sno);

  // html태그에 데이터 속성명, 속성값 추가하기
  setInterval(() => {
    item.dataset.major = "full-stack";
  }, 1000);
}

const widget = document.querySelector("[data-widget-name]");
console.log(widget.textContent);

// const aLinked = document.querySelectorAll("a");
// aLinked.forEach((a) => {
//   a.style.color = "orange";
// });

const selector = 'a[href*="://"]:not([href^="http://internal.com"])';
const links = document.querySelectorAll(selector);
links.forEach((a) => {
  a.style.color = "orange";
});
