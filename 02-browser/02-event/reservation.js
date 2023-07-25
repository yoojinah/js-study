const reservations = [];

function addReservation() {
  const name = document.querySelector("#name").value;
  const data = document.querySelector("#data").value;
  const startTime = document.querySelector("#startTime").value;
  const endTime = document.querySelector("#endTime").value;

  const reservationKey = `${data}-${startTime}-${endTime}`;

  const check = reservations.some(
    (reservation) => reservation.key === reservationKey
  );

  if (
    name !== "" &&
    data !== "" &&
    startTime !== "" &&
    endTime !== "" &&
    !check
  ) {
    reservations.push({
      name: name,
      data: data,
      startTime: startTime,
      endTime: endTime,
      key: reservationKey,
    });
  }

  document.querySelector("#name").value = "";
  document.querySelector("#data").value = "";
  document.querySelector("#startTime").value = "";
  document.querySelector("#endTime").value = "";

  reservationList();
}

function reservationList() {
  const reservList = document.querySelector(".reservList");
  reservList.textContent = "";

  for (let i = 0; i < reservations.length; i++) {
    let list = document.createElement("li");
    list.textContent = `이름: ${reservations[i].name} | 예약날짜: ${reservations[i].data} | 예약 시작 시간: ${reservations[i].startTime} | 예약 종료 시간: ${reservations[i].endTime}`;
    reservList.appendChild(list);
  }
}

const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", addReservation);
