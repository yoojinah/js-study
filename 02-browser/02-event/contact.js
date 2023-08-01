// template: UI형식의 틀
function createRow(name, phone, email, image) {
  // 1. 요소 생성
  const tr = document.createElement("tr");
  // 삭제할 때 사용하려고 데이터 속성을 추가함
  //** 서버에서 받은 데이터의 유일한 속성(key) */
  // 2. 요소의 속성 설정
  tr.dataset.email = email;
  tr.innerHTML = `
  <td>${name}</td>
  <td>${phone}</td>
  <td>${email}</td>
  <td>${
    image ? `<img width="auto" height="30" src="${image}" alt="${name}">` : ""
  }</td>
  <td><button class="modifyBtn">수정</button></td>
  `;
  return tr;
}
//서버에서 데이터 조회 후 화면에 출력
//JSON 데이터로 tr목록을 만드는 것
// async: 함수를 비동기적으로 실행되게 함.
// async 함수만 따로 떼서 너만 따로 돌아~ 하는 식으로 해줌.
//UI컨텍스트와 별개의 컨텍스트로 실행되게 함.
//프로세스(Process): 프로그램이 실행돼서 메모리(램)에 올라가면 프로세스
//스레드(thread): 프로세스의 실행단위를 나눈 것.
// 컨텍스트(context): 스레드내의 시간을 분할하여 CPU처리할 수 있게 한 단위
//컨텍스트1(우선순위1), 컨텍스트2(우선순위2)
// 우선순위에 따라서 1을 좀더 시간을 많이 할애하고, 2는 약간만 할애
// 여기서는 async가 시작을 먼저하지만, await 만나서 잠시 멈췄다가,
// 아래의 contact 코드가 돌아가고,
// 나중에 await들이 돌아간다.
(async () => {
  //fetch(..)
  // http접속을 통해서 데이터를 가져오거나 보내거나 할 수 있음.
  // await Promise 객체
  //Promise 객체 처리가 완료되면(resolve), 리턴값을 받음.
  //await 키워드는 async 함수 안에서만 사용 가능.
  const response = await fetch("http://localhost:8080/contacts");
  const result = await response.json();
  console.log(result);
  const tbody = document.querySelector("tbody");
  //배열 반복을 해서 tr을 만든 다음에 tbody 가장 마지막 자식에 추가
  for (let item of result) {
    tbody.append(createRow(item.name, item.phone, item.email, item.image));
  }
})();

//추가폼
(() => {
  const form = document.forms[0];
  const inputs = form.querySelectorAll("input");
  const name = inputs[0];
  const phone = inputs[1];
  const email = inputs[2];
  const file = inputs[3]; //input type="file"
  const add = form.querySelector("button");
  add.addEventListener("click", (e) => {
    e.preventDefault();
    if (email.value === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (name.value === "") {
      alert("이름을 입력해주세요.");
      return;
    }
    if (phone.value === "") {
      alert("전화번호를 입력해주세요.");
      return;
    }
    // 데이터를 서버에 전송하고, UI요소 생성
    async function createContact(image) {
      /// --- 서버전송하면 UI 생성

      // 서버에 데이터를 전송
      // fetch(url, options)
      const response = await fetch("http://localhost:8080/contacts", {
        // HTTP Method
        method: "POST",
        // 보낼 데이터 형식은 json
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          name: name.value,
          phone: phone.value,
          image: image ? image : null,
        }),
      });
      console.log(response);

      const result = await response.json();
      console.log(result);

      // 화면에 요소를 추가하는 것은 데이처리가 정상적으로 된 다음에
      // 서버에서 응답받은 데이터
      const { data } = result;

      // --- 3. 어딘가(부모, 다른요소)에 추가한다(append, prepend);
      document
        .querySelector("tbody")
        .prepend(createRow(data.name, data.phone, data.email, data.image));
      form.reset();
    }

    if (file.files[0]) {
      // 파일이 있을 때
      const reader = new FileReader();
      // reader로 파일을 읽기가 완료되면 실행되면 이벤트 핸들러 함수
      reader.addEventListener("load", async (e) => {
        console.log(e);
        // file -> base64 data-url
        const image = e.target.result;
        createContact(image);
      });
      // 파일을 dataURL(base64)로 읽음
      reader.readAsDataURL(file.files[0]);
    } else {
      // 파일이 없을 때
      createContact();
    }

    // return;
  });

  console.log("추가폼 처리 코드");
})();
// 삭제폼
(() => {
  const form = document.forms[1];
  const email = form.querySelector("input");
  const del = form.querySelector("button");
  del.addEventListener("click", async (e) => {
    e.preventDefault();
    //서버통신
    await fetch(`http://localhost:8080/contacts/${email.value}`, {
      method: "DELETE",
    });
    const tr = document.querySelector(`tr[data-email="${email.value}"]`);
    if (!tr) {
      alert("해당 이메일의 연락처 없습니다.");
      return;
    }
    tr.remove();
    form.reset();
  });
})();

// 수정
(() => {
  document.querySelector("tbody").addEventListener("click", (e) => {
    if (e.target.classList.contains("modifyBtn")) {
      /** @type {HTMLButtonElement} */

      const modifyBtn = e.target; // button -> td -> tr

      const row = modifyBtn.parentElement.parentElement; // tr
      const cells = row.querySelectorAll("td");
      console.log(row);
      console.log("이건?", cells);
      console.log(cells[0].innerHTML, cells[1].innerHTML, cells[2].innerHTML);

      // 모달 레이어 띄우기
      /** @type {HTMLButtonElement} */
      const layer = document.querySelector("#modify_layer");
      layer.hidden = false;

      // 모달 내부의 폼에 선택값을 채워 넣음
      layer.querySelector("h3").innerHTML = cells[2].innerHTML;
      const inputs = layer.querySelectorAll("input");
      inputs[0].value = cells[0].innerHTML;
      inputs[1].value = cells[1].innerHTML;

      // 확인/취소 버튼이 이벤트 핸들러 추가
      const buttons = layer.querySelectorAll("button");
      // 취소 버튼
      buttons[1].addEventListener("click", (e) => {
        e.preventDefault();
        layer.hidden = true;
      });
      // 수정 버튼
      buttons[0].addEventListener("click", async (e) => {
        e.preventDefault();
        // 셀이 있는 고정값
        const email = cells[2].innerHTML;
        // 입력값으로
        const name = inputs[0].value;
        const phone = inputs[1].value;

        const options = {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            phone,
          }),
        };
        // 서버 연동
        const response = await fetch(
          `http://localhost:8080/contacts/${email}`,
          options
        );

        console.log(response.status);

        // 데이터셀의 값을 수정입력 폼의 값으로 바꿨음.
        cells[0].innerHTML = inputs[0].value;
        cells[1].innerHTML = inputs[1].value;
        layer.hidden = true;
      });
    }
  });
})();
