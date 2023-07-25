// const alertBox = document.createElement("div");
// alertBox.className = "alert";

// const strongTxt = document.createElement("strong");
// strongTxt.textContent = "안녕하세요!";

// let count = 3;
// const message = document.createTextNode(
//   `중요 메세지${count}를 확인하셨습니다.`
// );
// // 가장 마지막 자식으로 뒤쪽에 추가
// alertBox.append(strongTxt);
// alertBox.append(message);
// setTimeout(() => {
//   // append()로 삽입하면 script뒤로 가기 떄문에
//   // 로딩이 길어지거나 실행이 안될 수 있음
//   // document.body.append(alertBox);

//   // 가장 첫번째 자식에 추가함
//   document.body.prepend(alertBox);
// }, 1000);

// const id = document.querySelector("#elem");
// const pElement = document.createElement("p");
// id.insertAdjacentElement("beforebegin", pElement);

// const rows = document.querySelectorAll("tbody > tr");
// // sort()를 쓰려면 배열로 먼저 변환
// const sortRows = Array.from(rows).sort((a, b) =>
//   a.children[0].textContent.localeCompare(b.children[0].textContent)
// );

// // document.querySelector("tbody").innerHTML = "";
// for (let row of sortRows) {
//   document.querySelector("tbody").append(row);
// }

let container = document.getElementById("container");

let data = {
  Fish: {
    trout: {},
    salmon: {},
  },

  Tree: {
    Huge: {
      sequoia: {},
      oak: {},
    },
    Flowering: {
      "apple tree": {},
      magnolia: {},
    },
  },
};

// container는 트리 (ul > li , li)를 만들어 넣을 요소
// data : 객체 속성목록으로 ul,li,...ul 을 만들 값
// createTree은 객체를 받아 속성 목록을 li로 만드는 역할
function createTree(container, data) {
  // 재귀호출 문제를 해결할 때 중요한 것은
  // 탈출 구문이 꼭 있어야 함

  // 객체의 속성이 있을 떄 처리하고 없으면 재귀호출 그만
  if (Object.keys(data).length > 0) {
    const ul = document.createElement("ul");

    // 속성 갯수에 따라 li들을 만들고
    // ul에 붙이고
    for (let prop in data) {
      const li = document.createElement("li");
      li.textContent = prop; // li컨텐트에 속성명을 넣어줘야함
      ul.append(li);

      // 속성 객체에 대한 createTree를 다시 호출
      createTree(li, data[prop]);
    }
    //ul을 container에 붙인다.
    container.append(ul);
  }
}
createTree(container, data);
