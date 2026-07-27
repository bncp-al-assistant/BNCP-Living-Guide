let reservations = JSON.parse(localStorage.getItem("reservation")) || [];

showReservations();

document.getElementById("reservationForm").addEventListener("submit", function(e){

e.preventDefault();

const reservation={

date:date.value,

team:team.value,

name:name.value,

people:people.value,

facility:facility.value,

memo:memo.value

};

reservations.push(reservation);

localStorage.setItem("reservation",JSON.stringify(reservations));

alert("예약되었습니다.");

this.reset();

showReservations();

});

function showReservations(){

const tbody=document.getElementById("reservationList");

tbody.innerHTML="";

reservations.forEach(r=>{

tbody.innerHTML+=`

<tr>

<td>${r.date}</td>

<td>${r.facility}</td>

<td>${r.name}</td>

<td>${r.team}</td>

</tr>

`;

});

}
