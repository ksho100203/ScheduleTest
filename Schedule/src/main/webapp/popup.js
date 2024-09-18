document.addEventListener('DOMContentLoaded', () => {
  let popup = document.getElementById('popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'popup';
    document.body.appendChild(popup);
  }

  function showPopup(event) {
    popup.innerHTML = `
      <div id="popup-content">
        <p>${event.target.textContent} 日</p>
        
        <label for="salesFlag">営業フラグ:</label>
        <input type="number" id="salesFlag" min="0" max="1" value="1">
        
        <label for="startTime">出社時刻:</label>
        <input type="time" id="startTime" value="09:30"> 
        
        <label for="endTime">退社時刻:</label>
        <input type="time" id="endTime" value="18:30">
        
        <label for="breakTime">休憩時間 (時刻):</label>
        <input type="time" id="breakTime" value="01:00"> 
        
        <label for="overtimeRegular">時間外（通常）:</label>
        <input type="time" id="overtimeRegular" readonly>
        
        <label for="overtimeNight">時間外（深夜）:</label>
        <input type="time" id="overtimeNight" readonly>
        
        <label for="legalHolidayExtra">法定外休日:</label>
        <input type="time" id="legalHolidayExtra">
        
        <label for="legalHoliday">法定休日:</label>
        <input type="time" id="legalHoliday">
        
        <button onclick="closePopup()">閉じる</button>
      </div>
    `;

    popup.style.display = 'block';
    const popupWidth = popup.offsetWidth;
    const popupHeight = popup.offsetHeight;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    popup.style.left = `${(windowWidth - popupWidth) / 2}px`;
    popup.style.top = `${(windowHeight - popupHeight) / 2}px`;

    document.getElementById('startTime').addEventListener('change', calculateOvertime);
    document.getElementById('endTime').addEventListener('change', calculateOvertime);
  }

  function setupPopupListeners() {
    document.querySelectorAll('.calendar-day').forEach(day => {
      day.addEventListener('click', showPopup);
    });
  }

  function calculateOvertime() {
    const startTime = document.getElementById('startTime').value; // 出社時刻
    const endTime = document.getElementById('endTime').value; // 退社時刻

    const workEnd = new Date(`1970-01-01T${endTime}`);
    const baseTime = new Date('1970-01-01T18:30'); // 18:30
    const lateNightLimit = new Date('1970-01-01T22:00'); // 22:00

    let overtimeRegular = 0;
    let overtimeNight = 0;

    // Calculate "時間外（通常）"
    if (workEnd > baseTime) {
      const overtimeEnd = workEnd < lateNightLimit ? workEnd : lateNightLimit;
      overtimeRegular = (overtimeEnd - baseTime) / (1000 * 60); // 分単位で計算
    }

    // Calculate "時間外（深夜）"
    if (workEnd > lateNightLimit) {
      overtimeNight = (workEnd - lateNightLimit) / (1000 * 60); // 分単位で計算
    }

    document.getElementById('overtimeRegular').value = convertMinutesToTimeFormat(overtimeRegular);
    document.getElementById('overtimeNight').value = convertMinutesToTimeFormat(overtimeNight);
  }

  function convertMinutesToTimeFormat(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  }

  // クリックでポップアップを閉じる
  document.addEventListener('click', (event) => {
    if (!popup.contains(event.target) && !event.target.classList.contains('calendar-day')) {
      popup.style.display = 'none';
    }
  });

  // カレンダーのリスナー設定
  setupPopupListeners();
});

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}
