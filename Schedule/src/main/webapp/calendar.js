document.addEventListener('DOMContentLoaded', function() {
    const yearSelect = document.getElementById('year');
    const monthSelect = document.getElementById('month');
    const showCalendarButton = document.getElementById('showCalendar');

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;

    function populateYears() {
        yearSelect.innerHTML = '';
        for (let year = currentYear - 10; year <= currentYear + 10; year++) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            if (year === currentYear) {
                option.selected = true;
            }
            yearSelect.appendChild(option);
        }
    }

    function populateMonths() {
        monthSelect.innerHTML = '';
        for (let month = 1; month <= 12; month++) {
            const option = document.createElement('option');
            option.value = month;
            option.textContent = month;
            if (month === currentMonth) {
                option.selected = true;
            }
            monthSelect.appendChild(option);
        }
    }

    function generateCalendar(year, month) {
        const calendarSection = document.getElementById('calendar');
        calendarSection.innerHTML = '';
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);

        const calendarTable = document.createElement('table');
        const headerRow = document.createElement('tr');
        const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

        daysOfWeek.forEach((day, index) => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        calendarTable.appendChild(headerRow);

        let row = document.createElement('tr');
        for (let i = 0; i < firstDay.getDay(); i++) {
            const td = document.createElement('td');
            row.appendChild(td);
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            if (row.children.length === 7) {
                calendarTable.appendChild(row);
                row = document.createElement('tr');
            }
            const td = document.createElement('td');
            td.textContent = day;
            td.classList.add('calendar-day');

            const dayOfWeek = new Date(year, month - 1, day).getDay();
            if (dayOfWeek === 6) {
                td.classList.add('saturday');
            } else if (dayOfWeek === 0) {
                td.classList.add('sunday');
            }

            row.appendChild(td);
        }

        calendarTable.appendChild(row);
        calendarSection.appendChild(calendarTable);
    }

    populateYears();
    populateMonths();
    generateCalendar(currentYear, currentMonth);
});
