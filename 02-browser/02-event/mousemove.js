const box = document.querySelector(".listBox");
const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const addList = document.createElement("ul");
box.insertAdjacentElement("afterend", addList);

function addTask() {
  // 인풋에 할일 목록 값을 입력하면 공백을 제거하는
  // 기능을 하는 taskText 변수 추가
  const taskText = input.value.trim();

  // 만약에 taskText의 내용이 비어있지 않으면
  if (taskText !== "") {
    // 그 리스트를 추가할 li변수명에 li 엘레멘츠를 생성하고
    const li = document.createElement("li");
    // li변수에 내용을 taskText변수에 대입
    li.textContent = taskText;

    // 할일 목록에 내용을 입력해 추가가 됐다면
    // 삭제를 하는 button을 추가 생성
    const delateBtn = document.createElement("button");
    // 추가한 삭제 버튼에 '삭제'라는 text 삽입
    delateBtn.textContent = "삭제";

    // 삭제 버튼 클릭하면 발생하는 이벤트 생성
    delateBtn.addEventListener("click", () => {
      // 삭제 버튼을 누르면 생성한 ul(addList)에서
      //  자식인 li를 지운다(removeChild)
      addList.removeChild(li);
    });

    li.append(delateBtn);
    addList.prepend(li);

    // 추가한 후 인풋 입력창을 사용자가
    // 다시 입력하기 편리하도록 초기화 상태로 만듬
    input.value = "";
  }
}

addBtn.addEventListener("click", addTask);

// const ball = document.querySelector(".ball");
// document.addEventListener("mousemove", (e) => {
//   const mouseX = e.clientX;
//   const mouseY = e.clientY;

//   ball.style.left = mouseX + "px";
//   ball.style.top = mouseY + "px";
// });

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const hoursE = document.querySelector("#hours");
  const minuteE = document.querySelector("#minutes");
  const secondsE = document.querySelector("#seconds");

  hoursE.textContent = hours;
  minuteE.textContent = minute;
  secondsE.textContent = seconds;
}
updateClock();
setInterval(updateClock, 1000);
