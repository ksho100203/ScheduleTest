document.addEventListener('DOMContentLoaded', () => {
  function generateCalendar(year, month) {
    const calendarSection = document.getElementById('calendar');
    calendarSection.innerHTML = '';
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    const calendarTable = document.createElement('table');
    const headerRow = document.createElement('tr');
    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];

    daysOfWeek.forEach(day => {
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

    // イベントリスナーを設定
    setupPopupListeners();
  }

  function setupPopupListeners() {
    document.querySelectorAll('.calendar-day').forEach(day => {
      day.addEventListener('click', showPopup);
    });
  }

  function generateCalendarForSelectedDate() {
    const year = parseInt(document.getElementById('year').value, 10);
    const month = parseInt(document.getElementById('month').value, 10);
    generateCalendar(year, month);
  }

  // 初期カレンダー生成
  generateCalendarForSelectedDate();

  // 月変更ボタンなどのイベントリスナー
  document.getElementById('prevMonth').addEventListener('click', () => {
    const monthSelect = document.getElementById('month');
    const currentMonth = parseInt(monthSelect.value, 10);
    const yearSelect = document.getElementById('year');
    let currentYear = parseInt(yearSelect.value, 10);

    if (currentMonth === 1) {
      currentMonth = 12;
      currentYear--;
    } else {
      currentMonth--;
    }

    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
    generateCalendarForSelectedDate();
  });

  document.getElementById('nextMonth').addEventListener('click', () => {
    const monthSelect = document.getElementById('month');
    const currentMonth = parseInt(monthSelect.value, 10);
    const yearSelect = document.getElementById('year');
    let currentYear = parseInt(yearSelect.value, 10);

    if (currentMonth === 12) {
      currentMonth = 1;
      currentYear++;
    } else {
      currentMonth++;
    }

    monthSelect.value = currentMonth;
    yearSelect.value = currentYear;
    generateCalendarForSelectedDate();
  });
});
