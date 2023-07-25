// const form = document.querySelector("form");
// form.addEventListener("submit", function (e) {
//   e.preventDefault();

//   const genderChoice = document.querySelector("#gender").value;
//   const choice = document.createElement("p");
//   choice.textContent = `당신의 성별은 ${genderChoice} 입니다.`;

//   document.body.appendChild(choice);
// });

const students = [];

function addStudent() {
  const name = document.querySelector("#studentName").value;
  const age = document.querySelector("#studentAge").value;
  const grade = document.querySelector("#studentGrade").value;

  if (name !== "" && age !== "" && grade !== "") {
    students.push({
      name: name,
      age: age,
      grade: grade,
    });
  }
  document.querySelector("#studentName").value = "";
  document.querySelector("#studentAge").value = "";
  document.querySelector("#studentGrade").value = "";

  showStudentsList();
}

function showStudentsList() {
  const studentsList = document.querySelector(".studentList");
  studentsList.textContent = "";
  for (let i = 0; i < students.length; i++) {
    const list = document.createElement("li");
    list.textContent = `이름:${students[i].name} | 나이:${students[i].age} | 학년:${students[i].grade}`;

    studentsList.appendChild(list);
  }
}

function findMaxGrade() {
  if (students.length === 0) {
    alert("등록된 학생이 없습니다");
    return;
  }

  let maxGrade = 0;
  let maxGradeStudentName = "";
  for (let i = 0; i < students.length; i++) {
    let grade = parseInt(students[i].grade, 10);
    if (!isNaN(grade) && grade > maxGrade) {
      maxGrade = grade;
      maxGradeStudentName = students[i].name;
    }
  }

  const find = document.querySelector(".max");
  const maxGradeName = document.createElement("p");
  maxGradeName.textContent = `가장 높은 학년은 ${maxGrade} 이고, 학생의 이름은 ${maxGradeStudentName} 입니다.`;

  find.textContent = "";
  find.prepend(maxGradeName);
}

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", addStudent);

const findMaxBtn = document.querySelector("#findMaxBtn");
findMaxBtn.addEventListener("click", findMaxGrade);
