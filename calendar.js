const getDaysInMonth = (year, month) =>{
    return new Date(year, month+1,0).getDate();
}

const getDaysPrevMonth = (year, month) =>{

    if((month + 1)===1){
        month = 12;
        year--;
    }

    return new Date(year, month,0).getDate();
}

function changeMonth(){
    
    if(this.id == 'prevMonth'){
        if(actualMonth > 0){
            actualMonth--;
        }else{
            actualMonth = 11;
            actualYear--;
        } 
    }
    if(this.id == 'nextMonth'){
        if(actualMonth < 11){
            actualMonth++;
        }else{
            actualMonth = 0;
            actualYear++;
        }
    }
    
    renderCalendar(actualYear, actualMonth);
}

const renderCalendar = (year, month) => {

    const daysContainer = document.querySelector('.calendar-body-days');
    daysContainer.innerHTML = '';

    let daysPrevMonth = getDaysPrevMonth(year, month);
    let daysInMonth   = getDaysInMonth(year, month);
    let weekDayOfFirstDay = new Date(year, month, 1).getDay();
    let weekDayOfLastDay = new Date(year, month, daysInMonth).getDay();

    document.querySelector('.calendar-head-date-month').textContent = monthNames[month];
    document.querySelector('.calendar-head-date-year').textContent = year;

    let days = '';

    //days prev month

    for(let i = weekDayOfFirstDay-1; i >= 0; i--) {
        days += `<div class="calendar-body-days-prev">${daysPrevMonth - i}</div>`;
    }

    //days actual month
    for(let i = 0; i < daysInMonth; i++) {
        
        let isToday = today.getDate() == i +1 && today.getMonth() == month && today.getFullYear() == year ? 'today' : '';

        days += `
            <div class="calendar-body-days-actual ${isToday}">
                ${i + 1}
            </div>`;
    }

    //days next month
    for(let i = 0; i < 6 - (weekDayOfLastDay); i++) {
        days += `<div class="calendar-body-days-prev">${i+1}</div>`;
    }
    
    daysContainer.innerHTML = days

}

//Globals
let monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

let today       = new Date();
let actualMonth = today.getMonth();
let actualYear  = today.getFullYear();
let actualDay   = today.getDate();

//render the actual month
renderCalendar(actualYear, actualMonth);

let calendarBtns = document.querySelectorAll('.calendar-head-btn');
calendarBtns.forEach(btn=>btn.addEventListener('click', changeMonth)); 
