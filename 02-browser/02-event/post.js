function createTemplate(result) {
  const postDiv = document.createElement("article");
  postDiv.classList.add("post");
  postDiv.innerHTML = `
      <div class="top_class">
        <small>작성자: ${result.creatorName}</small>
        <h4 data-no="${result.no}">no. ${result.no}</h4>
      </div>
      
      <h2>${result.title}</h2>
      
      <p>${result.content}</p>
      <span>작성시간: ${new Date(result.creatorTime).toLocaleString()}</span>
      <button class="removeBtn">X</button>
      <button class="modifyBtn">수정</button>
    `;

  return postDiv;
}
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

      const row = modifyBtn.parentElement.parentElement;
      console.log(row);
      const cells = row.querySelector("article");

      // 모달 레이어 띄우기
      /** @type {HTMLButtonElement} */
      const layer = document.querySelector(".modal");
      layer.hidden = false;

      // 모달 내부의 폼에 기존 선택값을 채워넣음
      const modal_cont = document.querySelector(".modal_cont");

      const authorName = cells.querySelector("small").innerText;
      const title = cells.querySelector("h2").innerText;
      const content = cells.querySelector("p").innerText;

      modal_cont.querySelector("strong").value = authorName;
      modal_cont.querySelector("input").value = title;
      modal_cont.querySelector("textarea").value = content;
      console.log(content);

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
        const name = cells.querySelector("small").innerHTML;
        log(name);
        const title = modal_cont.querySelector("input").value;
        const content = modal_cont.querySelector("textarea").value;

        const options = {
          method: "PUT",
          body: JSON.stringify({
            title,
            content,
          }),
        };

        // 서버연동 후 데이터 보내기
        const response = await fetch(
          `http://localhost:8080/posts/${name}`,
          options
        );
      });
    }
  });
})();
