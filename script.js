let batteryLevel = 100;
let batteryInterval;
let alarms = [];

/**
 * updateTime
 * 현재 시간을 1초마다 갱신하고, 알람을 체크합니다.
 * 매개변수: 없음
 * 리턴값: 없음
 * 동작 설명: 현재 시간을 업데이트하고 알람 시간에 도달했는지 확인합니다.
 */
function updateTime() {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString('ko-KR');
    document.getElementById('current-time').textContent = formattedTime;

    if (batteryLevel > 0) {
        checkAlarms(currentTime);
        setTimeout(updateTime, 1000);
    }
}

/**
 * decreaseBattery
 * 배터리 수준을 1% 감소시키고, 배터리가 0%가 되면 시계를 멈춥니다.
 * 매개변수: 없음
 * 리턴값: 없음
 * 동작 설명: 배터리가 0%가 되면 시계 화면을 검게 변하게 하고 배터리 감소를 멈춥니다.
 */
function decreaseBattery() {
    if (batteryLevel > 0) {
        batteryLevel--;
        document.getElementById('battery-level').textContent = `${batteryLevel}%`;
    }

    if (batteryLevel === 0) {
        document.getElementById('current-time').textContent = '';
        document.getElementById('time-section').classList.add('blackout');
    }
}

/**
 * addAlarm
 * 사용자가 입력한 시, 분, 초로 알람을 추가합니다.
 * 매개변수: 없음
 * 리턴값: 없음
 * 동작 설명: 알람을 최대 3개까지 추가할 수 있으며, 초과 시 경고 메시지를 표시합니다.
 */
function addAlarm() {
    if (alarms.length >= 3) {
        alert('최대 3개의 알람까지 추가 가능합니다.');
        return;
    }

    const hour = document.getElementById('hour').value.padStart(2, '0');
    const minute = document.getElementById('minute').value.padStart(2, '0');
    const second = document.getElementById('second').value.padStart(2, '0');

    const alarmTime = `${hour}:${minute}:${second}`;
    alarms.push(alarmTime);

    updateAlarmDisplay();
}

/**
 * updateAlarmDisplay
 * 현재 설정된 알람 목록을 화면에 표시합니다.
 * 매개변수: 없음
 * 리턴값: 없음
 * 동작 설명: 알람 목록을 갱신하여 UI에 반영합니다.
 */
function updateAlarmDisplay() {
    const alarmsList = document.getElementById('alarms-list');
    alarmsList.innerHTML = '';
    alarms.forEach((alarm, index) => {
        const li = document.createElement('li');
        li.textContent = `알람 ${index + 1}: ${alarm}`;
        alarmsList.appendChild(li);
    });
}

/**
 * checkAlarms
 * 현재 시간과 설정된 알람 시간을 비교하여 알람이 울릴 시간인지 확인합니다.
 * 매개변수: currentTime (Date 객체)
 * 리턴값: 없음
 * 동작 설명: 알람 시간이 되면 경고 메시지를 표시하고, 해당 알람을 삭제합니다.
 */
function checkAlarms(currentTime) {
    const currentFormattedTime = currentTime.toTimeString().split(' ')[0]; // 시:분:초 형식
    alarms.forEach((alarm, index) => {
        if (alarm === currentFormattedTime) {
            alert(`알람 ${index + 1} 시간입니다!`);
            alarms.splice(index, 1); // 알람이 울리면 삭제
            updateAlarmDisplay();
        }
    });
}

/**
 * initializeClock
 * 초기 설정을 수행하고 시계와 배터리 감소 기능을 시작합니다.
 * 매개변수: 없음
 * 리턴값: 없음
 * 동작 설명: 초기 설정으로 시계를 업데이트하고 배터리 감소를 시작합니다.
 */
function initializeClock() {
    batteryInterval = setInterval(decreaseBattery, 1000); // 배터리 1% 감소 매 초
    updateTime(); // 시간 업데이트
}

// 페이지 로드 시 초기화
window.onload = initializeClock;
