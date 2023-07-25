const focus1 = document.querySelector("input:nth-of-type(1)");
const focus2 = document.querySelector("input:nth-of-type(2)");

console.log(focus1);
console.log(focus2);

focus1.addEventListener("mousedown", (e) => {
  e.preventDefault();
});

focus2.addEventListener("focus", (e) => {
  e.target.value = "";
});

document.body.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  console.log(e);
  confirm("당신은 해커입니까?") && window.close();
});
