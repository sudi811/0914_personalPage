function updateTime() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// 立即更新時間，然後每秒更新一次
updateTime();
setInterval(updateTime, 1000);

// 如果你想修改名字，可以取消註解下面的程式碼並修改名字
// document.getElementById('name-display').textContent = "你的名字";
