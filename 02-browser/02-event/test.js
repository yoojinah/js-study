// 조회(get)
(async () => {
  const response = await fetch("http://localhost:8080/contacts");
  const result = await response.json();
  console.log(result);
  const tbody = document.querySelector("tbody");
  //배열 반복을 해서 tr을 만든 다음에 tbody 가장 마지막 자식에 추가
  for (let item of result) {
    //데이터 타입으로 삭제할 때는 tr에 <tr data-name="${item.name}">
    const template = `
    <tr data-email="${item.email}">
      <td>${item.name}</td>
      <td>${item.phone}</td>
      <td>${item.email}</td>
    </tr>`;
    tbody.insertAdjacentHTML("afterbegin", template);
  }
})();

// 추가폼
(() => {
  const form = document.forms[0];
  const input = form.querySelectorAll("input");
  const name = input[0];
  const phone = input[1];
  const email = input[2];
  const addBtn = form.querySelector("button");

  addBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    if (email === "") {
      alert("이메일을 입력해 주세요");
      return;
    }

    if (name === "") {
      alert("이름을 입력해 주세요");
      return;
    }

    if (phone === "") {
      alert("전화번호를 입력해주세요");
      return;
    }

    const response = await fetch("http://localhost:8080/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        phone: phone.value,
        email: email.value,
      }),
    });

    const result = await response.json();

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${name.value}</td>
        <td>${phone.value}</td>
        <td>${email.value}</td>
      `;

    const tbody = document.querySelector("tbody");
    tbody.appendChild(tr);
    tr.reset();
  });
})();

// 삭제폼
(() => {
  const form = document.forms[1];
  const email = form.querySelector("input");
  const del = form.querySelector("button");
  del.addEventListener("click", async (e) => {
    e.preventDefault();

    // 서버통신
    await fetch(`http://localhost:8080/contacts/${email.value}`, {
      method: "delete",
    });
    const tr = document.querySelector(`tr[data-email="${email.value}"]`);
    if (!tr) {
      alert("해당 이메일의 연락처가 없습니다.");
      return;
    }
    tr.remove();
    form.reset();
  });
})();
