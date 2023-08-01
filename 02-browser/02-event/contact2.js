// addContact()는 사용자가 입력한 이름, 전화번호, 이메일을 연락처 배열에 추가하고,
// 연락처 리스트를 갱신합니다.
// removeContact()는 사용자가 입력한 이름을 연락처 배열에서 제거하고,
// 연락처 리스트를 갱신합니다.
// displayContacts()는 현재 연락처 리스트를 화면에 보여줍니다.
(async () => {
  //fetch(..)
  // http접속을 통해서 데이터를 가져오거나 보내거나 할 수 있음.

  // Primise함수는 처리완료 됐을때 처리함수와
  // 오류일때 처리함수를 매개변수를 받는 함수
  // return new Primise(...)

  // 1. UI를 처리하는 컨텍스트

  // 2. 네트워크 요청을 처리하는 컨텍스트
  // 네트워크 요청이 완료되면
  // .then()의 매개변수 함수가 실행됨
  // 응답객체를 매개변수로 넘겨준다

  // 프로세스(process) : 프로그램이 실행돼서 메모리(램)에 올라가면 프로세스
  // 스레드(thread) : 프로세스의 실행단위를 나눈 것
  // 컨텍스트(context) : 스레드내의 시간을 분할하여 CPU처리할 수 있게 한 단위

  // await Promise객체
  // Promise객체 처리가 완료되면, 리턴값을 받음
  const reponse = await fetch("http://localhost:8080/contacts");
  const result = await reponse.json();
  // const ul = document.querySelector("ul");

  // 배열 반복을 해서 ul 가장 마지막 자식에 추가
  // for (let item of result) {
  //   const template = `
  //   <li>${item.name} | ${item.phone} | ${item.email}</li>
  //   `;

  //   ul.insertAdjacentHTML("afterbegin", template);
  // }

  // res.json() -> json응답을 자바스크립트 객체(배열)로 변환
  // .then((response) => response.json())

  // // 객체(배열)로 변환된 값을 사용
  // .then((result) => {
  //   console.log(result);
  // });
  // 오류체크
  // .catch((arr) => {
  //   console.log(arr);
  // });
  // 3. UI 처리하는 컨텍스트;

  // 네트워크 요청처리는 처리시간이 길다.
  // UI처리와 네트워크 처리를 같은 컨텍스트에서 하면
  // 네트워크 요청처리가 끝날때까지 브라우저는 멈춤
})();

// // 함수선언식
// async function asyncTask(){}

// // 함수 표현식
// const asyncTask = async() =>{}

let contacts = [];
//
// const phoneInput = document.querySelector("#phone");

// phoneInput.addEventListener("input", function (e) {
//   let phoneNumber = e.target.value;
//   phoneNumber = phoneNumber.replace(/\D/g, ""); // 숫자 이외의 문자 제거
//   phoneNumber = phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
//   e.target.value = phoneNumber;
// });

async function addContact() {
  const name = document.querySelector("#name").value;
  const phoneNumber = document.querySelector("#phone").value;
  // phoneNumber = phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

  const email = document.querySelector("#email").value;

  if (name !== "" && phoneNumber !== "" && email !== "") {
    contacts.push({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
    });
  }

  if (email === "") {
    alert("이메일을 입력해주세요.");
    return;
  }

  if (name === "") {
    alert("이름을 입력해주세요.");
    return;
  }

  if (phoneNumber === "") {
    alert("전화번호를 입력해주세요.");
    return;
  }

  // 서버에 데이터 전송
  const response = await fetch("http://localhost:8080/contacts", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      name: name,
      phoneNumber: phoneNumber,
    }),
  });

  console.log(response);
  const result = response.json();
  console.log(result);

  document.querySelector("#name").value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#email").value = "";

  displayContacts();
}

function removeContact() {
  const removeName = document.querySelector("#removeName").value;
  const anotherContact = contacts.filter((user) => user.email !== removeName);
  if (anotherContact.length === contacts.length) {
    alert("해당 정보가 존재하지 않습니다.");
  } else {
    contacts = anotherContact;
    displayContacts();
  }

  document.querySelector("#removeName").value = "";
  displayContacts();
}

function displayContacts() {
  const displayList = document.querySelector(".savePhoneList");
  displayList.textContent = "";
  displayList.style.paddingLeft = "0";
  for (let i = 0; i < contacts.length; i++) {
    let list = document.createElement("li");
    list.textContent = `이름: ${contacts[i].name} | 전화번호: ${contacts[i].phoneNumber} | 이메일: ${contacts[i].email}`;
    list.style.listStyle = "none";

    displayList.appendChild(list);
  }
}

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", addContact);

const removeBtn = document.querySelector("#removeBtn");
removeBtn.addEventListener("click", removeContact);

// -----------------add기능-------------------------
// (() => {
//   const form = document.forms[0];
//   const inputs = form.querySelector("input");

//   const name = inputs[0];
//   const phone = inputs[1];
//   const email = inputs[2];

//   const add = form.querySelector("button")

//   add.addEventListener("click", (e) =>{
//     e.preventDefault();
//     const tbody = document.querySelector("tbody")
//     const tr = document.createElement("tr")

//     삭제할 때 사용하려고 데이터 속성을 추가한 것
//     tr.datset.name = name.value;
//     tr.innerHTML = `
//     <td>${name.value}</td>
//     <td>${phone.value}</td>
//     <td>${email.value}</td>
//     `
//     tbody.prepend(tr);
//     form.reset();
//   })
// )}

// --------------------삭제기능----------------------
// () => {
//   const form = document.forms[1];
//   const inputs = form.querySelector("input");
//   const del = form.querySelector("button");

//   del.addEventListener("click", (e) => {
//     e.preventDefault();

//     document.querySelector(`tr[data-name="${name.value}"]`).remove();
//   });
// };
