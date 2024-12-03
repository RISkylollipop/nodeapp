
document.addEventListener(`DOMContentLoaded`, function () {
    const calendarH = document.getElementById('calendarH');
    const calendar = new FullCalendar.Calendar(calendarH, {
        initialView: 'dayGridMonth'
    })
    calendar.render();
})


