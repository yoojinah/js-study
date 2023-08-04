let currentPage = 0; // 현재 페이지 번호
const pageSize = 10; // 고정된 페이지 사이즈
let isLastPage = false; //마지막 페이지인지 여부
let currentquery = "";

function createTemplate(result) {
  const postDiv = document.createElement("article");
  postDiv.classList.add("post");
  postDiv.innerHTML = `
      <div class="top_class">
        <small>작성자: ${result.creatorName}</small>
        <h4 data-no="${result.no}">${result.no}</h4>
      </div>
      
      <h2>${result.title}</h2>
      
      <p>${result.content}</p>
      <span>작성시간: ${new Date(result.creatorTime).toLocaleString()}</span>
      <button class="removeBtn">X</button>
      <button class="modifyBtn">수정</button>
    `;

  return postDiv;
}
async function getPageList(page, query) {
  let url = "";
  if (query) {
    url = `http://localhost:8080/posts/paging/search?page=${page}&size=${pageSize}&query=${query}`;
  } else {
    url = `http://localhost:8080/posts/paging?page=${page}&size=${pageSize}`;
  }

  const response = await fetch(url);

  const result = await response.json();
  console.log(result);
  const container = document.querySelector(".container");
  const article = document.querySelector("article");

  //목록 초기화
  article.innerHTML = "";
  for (let item of result.content) {
    container.append(createTemplate(item));
  }

  currentPage = result.number;
  isLastPage = result.last;

  setBtnActive();
}

// 이전/다음 버튼 활성화 여부처리
function setBtnActive() {
  const seection = document.querySelector("section");

  const buttons = seection.querySelectorAll("button");
  console.log(buttons);
  const btnPrev = buttons[2];
  const btnNext = buttons[3];

  if (currentPage === 0) {
    btnPrev.disabled = true;
  } else {
    btnPrev.disabled = false;
  }

  if (isLastPage) {
    btnNext.disabled = true;
  } else {
    btnNext.disabled = false;
  }
}

// 웹페이지 로딩이 완료되면, 페이징으로 데이터 조회 및 목록 생성
(() => {
  window.addEventListener("DOMContentLoaded", () => {
    getPageList(0);
  });
})();

(() => {
  const seection = document.querySelector("section");

  const buttons = seection.querySelectorAll("button");
  const btnPrev = buttons[2];
  const btnNext = buttons[3];

  // 이전 버튼
  btnPrev.addEventListener("click", (e) => {
    e.preventDefault();
    currentPage > 0 && getPageList(currentPage - 1, currentquery);
  });
  // 다음 버튼
  btnNext.addEventListener("click", (e) => {
    e.preventDefault();
    !isLastPage && getPageList(currentPage + 1, currentquery);
  });
})();

// 검색기능
(() => {
  const seection = document.querySelector("section");
  const txtQuery = seection.querySelector("input");
  const btnSearch = seection.querySelector("button");

  btnSearch.addEventListener("click", (e) => {
    e.preventDefault();
    currentquery = txtQuery.value;
    getPageList(0, currentquery);
  });

  txtQuery.addEventListener("keyup", (e) => {
    e.preventDefault();
    if (e.key.toLocaleLowerCase() === "enter") {
      currentquery = txtQuery.value;
      getPageList(0, currentquery);
    }
  });
})();

// 검색조건 초기화
(() => {
  const seection = document.querySelector("section");
  const btnReset = seection.querySelectorAll("button")[1];
  btnReset.addEventListener("click", (e) => {
    e.preventDefault();

    // 검색조건 입력박스 초기화
    document.forms[2].reset();

    // 검색조건값 초기화
    currentquery = "";

    // 검색조건이 초기화되면 0번페이지에서 다시 조회
    getPageList(0, currentquery);
  });
})();

// 추가
(() => {
  const form = document.forms[0];
  const input = form.querySelectorAll("input");
  const nameInput = input[0];
  const titleInput = input[1];
  const contentTextarea = form.querySelector("textarea");
  const addBtn = form.querySelector("button");

  addBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const creatorName = nameInput.value.trim();
    const title = titleInput.value.trim();
    const content = contentTextarea.value.trim();

    if (!creatorName || !title || !content) {
      alert("모든 항목을 입력해주세요");
      return;
    }

    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        creatorName: creatorName,
        title: title,
        content: content,
      }),
    });
    const result = await response.json();
    console.log(result);
    // const container = document.querySelector(".container");
    const article = document.createElement("article");
    article.appendChild(createTemplate(result));

    window.location.reload();
    form.reset();
  });
})();

// 조회
(async () => {
  const response = await fetch("http://localhost:8080/posts");
  const result = await response.json();

  const container = document.querySelector(".container");
  for (let item of result) {
    container.append(createTemplate(item));
  }
})();

// 삭제
(() => {
  const container = document.querySelector(".container");
  container.addEventListener("click", async (e) => {
    if (e.target.classList.contains("removeBtn")) {
      const removeArticle = e.target.closest("article");
      console.log(removeArticle);

      const removeNumber = removeArticle.querySelector("h4").dataset.no; // data-no 값을 가져와서 할당
      console.log(removeNumber);
      // 서버 연결
      await fetch(`http://localhost:8080/posts/${removeNumber}`, {
        method: "DELETE",
      });
      removeArticle.remove();
    }
  });
})();

// 수정폼

(() => {
  document.querySelector(".container").addEventListener("click", (e) => {
    if (e.target.classList.contains("modifyBtn")) {
      /** @type {HTMLButtonElement} */

      const modifyBtn = e.target;
      console.log(modifyBtn);

      const cells = modifyBtn.parentElement;
      console.log(cells);

      // 모달 레이어 띄우기
      /** @type {HTMLButtonElement} */
      const layer = document.querySelector(".modal");
      layer.hidden = false;

      // 모달 내부의 폼에 기존 선택값을 채워넣음
      const modal_cont = document.querySelector(".modal_cont");

      const no = cells.querySelector("h4").innerHTML;
      console.log(no);
      const title = cells.querySelector("h2").innerText;
      const content = cells.querySelector("p").innerText;

      modal_cont.querySelector("strong").innerText = no;
      modal_cont.querySelector("input").value = title;
      modal_cont.querySelector("textarea").value = content;

      // 확인 취소 버튼에 이벤트 헨들러 추가
      const buttons = modal_cont.querySelectorAll("button");
      // 취소버튼
      buttons[1].addEventListener("click", (e) => {
        e.preventDefault();

        layer.hidden = true;
      });

      // 수정버튼
      buttons[0].addEventListener("click", async (e) => {
        e.preventDefault();
        const no = cells.querySelector("h4").innerHTML;

        const title = modal_cont.querySelector("input").value;
        const content = modal_cont.querySelector("textarea").value;
        console.log(title);
        console.log(content);

        const options = {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        };

        // 서버연동 후 데이터 보내기
        const response = await fetch(
          `http://localhost:8080/posts/${no}`,
          options
        );
        console.log(response.status);

        cells.querySelector("h2").innerText = title;
        cells.querySelector("p").innerText = content;

        layer.hidden = true;
      });
    }
  });
})();
