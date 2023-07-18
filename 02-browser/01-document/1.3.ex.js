const tbody = document.querySelector("tbody");
tbody.style.backgroundColor = "beige";
console.log(tbody);

// const tr = tbody.querySelectorAll("tr");
// tr.forEach((item) => {
//   // item.style.backgroundColor = "red";
// });

for (let tr of tbody.children) {
  let i = Array.from(tbody.children).indexOf(tr);
  tr.children[i].style.backgroundColor = "red";
}
