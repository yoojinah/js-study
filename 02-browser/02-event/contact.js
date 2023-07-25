// addContact()는 사용자가 입력한 이름, 전화번호, 이메일을 연락처 배열에 추가하고,
// 연락처 리스트를 갱신합니다.
// removeContact()는 사용자가 입력한 이름을 연락처 배열에서 제거하고,
// 연락처 리스트를 갱신합니다.
// displayContacts()는 현재 연락처 리스트를 화면에 보여줍니다.

let contacts = [];

const phoneInput = document.querySelector("#phone");

phoneInput.addEventListener("input", function (e) {
  let phoneNumber = e.target.value;
  phoneNumber = phoneNumber.replace(/\D/g, ""); // 숫자 이외의 문자 제거
  phoneNumber = phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, "$1-$2-$3");
  e.target.value = phoneNumber;
});

function addContact() {
  const name = document.querySelector("#name").value;
  let phoneNumber = document.querySelector("#phone").value;
  phoneNumber = phoneNumber.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

  const email = document.querySelector("#email").value;

  if (name !== "" && phoneNumber !== "" && email !== "") {
    contacts.push({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
    });
  }

  document.querySelector("#name").value = "";
  document.querySelector("#phone").value = "";
  document.querySelector("#email").value = "";

  displayContacts();
}

function removeContact() {
  const removeName = document.querySelector("#removeName").value;
  const anotherContact = contacts.filter((user) => user.name !== removeName);
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
  for (let i = 0; i < contacts.length; i++) {
    let list = document.createElement("li");
    list.textContent = `이름: ${contacts[i].name} | 전화번호: ${contacts[i].phoneNumber} | 이메일: ${contacts[i].email}`;
    displayList.appendChild(list);
  }
}

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", addContact);

const removeBtn = document.querySelector("#removeBtn");
removeBtn.addEventListener("click", removeContact);
