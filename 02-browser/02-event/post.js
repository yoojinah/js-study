// (async () => {
//   const url = "http://localhost:8080/posts";
//   const resfonse = await fetch(url);
//   const result = await resfonse.json();
//   console.log(result);

//   // 배열 메서드를 사용하기 위하여
//   const data = Array.from(result);
//   data.sort((a, b) => b.no - a.no);

//   const container = document.querySelector(".container");

//   for (let item of data) {
//     const div = document.createElement("div");
//     div.style.width = "70%";
//     div.style.margin = "2rem auto";
//     div.style.backgroundColor = "#fcfcfc";
//     div.style.boxShadow = "2px 2px 10px #ddd";
//     div.style.borderRadius = "20px";
//     div.style.marginBottom = "2rem";
//     div.style.borderLeft = "10px solid #e6dbff";

//     const template = `

//     <div data-no="${item.no}"></div>
//     <h2>작성자 : ${item.name}</h2>

//     <h3>${item.title}</h3>

//     <p>${item.content}</p>

//     <span>작성시간 : ${new Date(item.creatorTime).toLocaleString()}</span>
//     `;
//     div.innerHTML = template;
//     container.appendChild(div);
//   }
// })();

// (() => {
//   const form = document.forms[0];
//   const input = form.querySelectorAll("input");
//   const name = input[0];
//   const title = input[1];
//   const content = form.querySelector("textarea");
//   const add = form.querySelector("button");

//   add.addEventListener("click", async (e) => {
//     e.preventDefault();

//     if (name.value === "") {
//       alert("작성자 이름을 입력해주세요");
//       return;
//     }

//     if (title.value === "") {
//       alert("타이틀을 입력해주세요");
//       return;
//     }

//     if (content.value === "") {
//       alert("내용을 입력해주세요");
//       return;
//     }

//     if (name.value !== "" && title.value !== "" && content.value !== "") {
//       const response = await fetch("http://localhost:8080/posts", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({
//           name: name.value,
//           title: title.value,
//           content: content.value,
//         }),
//       });

//       // const responseData = await response.json();
//       const container = document.querySelector(".container");
//       const div = document.createElement("div");
//       const template = `
//     <style>
// h2 {
//   color:#333;
//   font-weight: bold;
//   font-size:1rem;
//   border-bottom:1px dashed #ddd;
//   margin:0;
//   padding:1rem;
// }
// h3 {
//   color: #4d3357;
//   padding: 1rem;
//   display:flex;
//   align-items:center;
//   font-size:1.2rem;
// }
// p {
//   font-size: 1rem;
//   padding: 1rem;
// }
// span {
//   display:block;
//   width:auto;
//   border-top:1px dashed #ddd;
//   color: #666;
//   padding:1rem;
//   font-size:.9rem;
//   text-align:right;
// }
//     </style>
//     <div data-no="${responseData.data.no}"></div>
//     <h2>작성자 : ${responseData.data.name}</h2>

//     <h3>${responseData.data.title}</h3>

//     <p>${responseData.data.content}</p>

//     <span>작성시간 : ${new Date(
//       responseData.data.creatorTime
//     ).toLocaleString()}</span>
//     `;
//       div.innerHTML = template;
//       container.appendChild(div);
//     }
//   });
// })();

// ---------------------------------------
function createTemplate(result) {
  const postDiv = document.createElement("article");
  postDiv.classList.add("post");
  postDiv.innerHTML = `
      <div class="top_class">
        <small>작성자: ${result.creatorName}</small>
        <h4 data-no="${result.no}">no. ${result.no}</h4>
      </div>
      
      <h2>TITLE: ${result.title}</h2>
      
      <p>내용 : ${result.content}</p>
      <span>작성시간: ${new Date(result.creatorTime).toLocaleString()}</span>
      <button class="removeBtn">X</button>
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
      console.log();
      // 서버 연결
      await fetch(`http://localhost:8080/posts/${removeNumber}`, {
        method: "DELETE",
      });
      removeArticle.remove();
    }
  });
})();
