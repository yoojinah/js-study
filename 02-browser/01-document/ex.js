// id="age-table"인 테이블
const ageTb = document.querySelector("#age-table");
ageTb.style.backgroundColor = "black";
console.log(ageTb);

//테이블 내의 label 요소 모두(총 3개)
const tbInLabel = ageTb.querySelectorAll("label");
tbInLabel.forEach((label) => {
  label.style.backgroundColor = "beige";
});
console.log(tbInLabel);

//테이블 내의 첫 번째 td(Age가 적힌 곳)
const firstTb = ageTb.querySelector("tr:first-of-type");
firstTb.style.backgroundColor = "red";
firstTb.style.color = "#fff";
console.log(firstTb);

//name="search"인 form
const nameIsSearch = document.querySelector('form[name="search"]');
nameIsSearch.style.backgroundColor = "orange";
console.log(nameIsSearch);

//폼의 첫 번째 input
const firstInput = nameIsSearch.getElementsByTagName("input")[0];
firstInput.style.backgroundColor = "yellow";
console.log(firstInput);

//폼의 마지막 input
const lastInput = nameIsSearch.querySelectorAll("input");
const lastIn = lastInput.item(lastInput.length - 1);
lastIn.style.backgroundColor = "blue";
lastIn.style.color = "#fff";
console.log(lastIn);
