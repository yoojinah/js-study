// 1. 문제 1: 'container' 요소를 선택하고,
//해당 요소의 id 속성값을 콘솔에 출력하세요.
const container = document.querySelector("#container");
console.log(container);

// 2. 문제 2: 'container' 요소 안에 있는
// 모든 <li> 요소들의 텍스트 내용을 콘솔에 출력하세요.
for (let li of container.querySelectorAll("ul li")) {
  let data = li.firstChild.data;
  console.log(data);
}

// 3. 문제 3: 'container' 요소 안에 있는
// <p> 요소의 텍스트 내용을 'Hello, JavaScript!'로 변경하세요.
const change = container.querySelector("p");
const gg = (change.textContent = "Hello, JavaScript!");
console.log(container.querySelector("p"));
console.log(gg);

// 4. 문제 4: 'container' 요소 안에
// 새로운 <div> 요소를 추가하고, 그 안에 임의의 텍스트를 삽입하세요.
const newDiv = document.createElement("div");
newDiv.textContent = "div를 추가했습니다.";
container.appendChild(newDiv);

console.log(newDiv);

// 1. 문제 1: 'list' 요소를 선택하고, 해당 요소의
// 모든 자식 <li> 요소들의 텍스트 내용을 배열로 가져와 콘솔에 출력하세요.
const list = document.querySelector("#list");
// const liTexts = Array.from(list.children).map((li) => li.textContent);
// console.log(liTexts);

// 2. 문제 2: 'list' 요소에 새로운 <li> 요소를 추가하고,
//해당 <li> 요소의 텍스트를 'Orange'로 설정하세요.
const addLi = document.createElement("li");
addLi.textContent = "Orange";
list.appendChild(addLi);
console.log(addLi);

// 3. 문제 3: 'list' 요소에 있는 마지막 <li> 요소를 제거하세요.
const lastChild = list.querySelector("li:last-child");
lastChild.style.backgroundColor = "red";
lastChild.remove();

console.log("---------------------------------");
// 1. 문제 1: 'cont' 요소를 선택하고,
//해당 요소의 모든 자식 노드를 콘솔에 출력하세요.
const cont = document.querySelector("#cont");
console.log(cont.children);

// 2. 문제 2: 'cont' 요소 안에 있는 모든
// <h2> 요소들의 텍스트 내용을 배열로 가져와 콘솔에 출력하세요.
const h2 = cont.querySelectorAll("h2");
const allH2 = Array.from(h2).map((item) => item.textContent);
console.log(allH2);

// 3. 문제 3: 'container' 요소의 마지막 자식 노드를 제거하세요.
const last = cont.lastChild;
cont.removeChild(last);
console.log(cont.children);
