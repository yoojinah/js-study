const alertBox = document.createElement("div");
alertBox.className = "alert";

const strongTxt = document.createElement("strong");
strongTxt.textContent = "안녕하세요!";

let count = 3;
const message = document.createTextNode(
  `중요 메세지${count}를 확인하셨습니다.`
);
// 가장 마지막 자식으로 뒤쪽에 추가
alertBox.append(strongTxt);
alertBox.append(message);
setTimeout(() => {
  // append()로 삽입하면 script뒤로 가기 떄문에
  // 로딩이 길어지거나 실행이 안될 수 있음
  // document.body.append(alertBox);

  // 가장 첫번째 자식에 추가함
  document.body.prepend(alertBox);
}, 1000);

const id = document.querySelector("#elem");
const pElement = document.createElement("p");
id.insertAdjacentElement("beforebegin", pElement);

const rows = document.querySelectorAll("tbody > tr");
// sort()를 쓰려면 배열로 먼저 변환
const sortRows = Array.from(rows).sort((a, b) =>
  a.children[0].textContent.localeCompare(b.children[0].textContent)
);

// document.querySelector("tbody").innerHTML = "";
for (let row of sortRows) {
  document.querySelector("tbody").append(row);
}
