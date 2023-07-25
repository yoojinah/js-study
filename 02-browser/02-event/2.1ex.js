const tit = document.querySelector("h2");
const ul = document.querySelector("ul");
const icon = document.querySelector("i");
tit.addEventListener("click", () => {
  ul.hidden = !ul.hidden;
  icon.style.transform = ul.hidden ? "rotate(0deg)" : "rotate(90deg)";
});
