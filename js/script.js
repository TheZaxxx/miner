document.addEventListener('DOMContentLoaded', function() {
    const commandInput = document.getElementById('commandInput');
    const commandOutput = document.getElementById('commandOutput');
    const mineBtn = document.getElementById('mineBtn');
    const checkinBtn = document.getElementById('checkinBtn');
    const referralBtn = document.getElementById('referralBtn');
    const totalPointsEl = document.getElementById('totalPoints');
    const todayMiningEl = document.getElementById('todayMining');
    const referralBonusEl = document.getElementById('referralBonus');
    
    let isMining = false;
    let miningInterval;
    let points = 1250;
    let todayMining = 85;
    let referralBonus = 365;
    let hasCheckedInToday = false;
    
    // Update points display
    function updatePointsDisplay() {
        totalPointsEl.textContent = points.toLocaleString();
        todayMiningEl.textContent = todayMining.toLocaleString();
        referralBonusEl.textContent = referralBonus.toLocaleString();
    }
    
    // Command processing
    commandInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim().toLowerCase();
            commandInput.value = '';
            
            let output = '';
            
            switch(command) {
                case 'help':
                    output = `<span class="command">Available commands:</span>
                    - help: Show this help message
                    - mine: Start/stop mining
                    - status: Show current mining status
                    - checkin: Daily check-in
                    - referral: Show referral information
                    - clear: Clear terminal`;
                    break;
                    
                case 'mine':
                    if (isMining) {
                        stopMining();
                        output = `<span class="warning">Mining stopped.</span>`;
                    } else {
                        startMining();
                        output = `<span class="success">Mining started. Earning points...</span>`;
                    }
                    break;
                    
                case 'status':
                    output = `<span class="info">Mining Status: ${isMining ? '<span class="success">ACTIVE</span>' : '<span class="error">INACTIVE</span>'}</span>
                    Total Points: <span class="success">${points.toLocaleString()}</span>
                    Today's Mining: <span class="success">${todayMining.toLocaleString()}</span>
                    Referral Bonus: <span class="success">${referralBonus.toLocaleString()}</span>`;
                    break;
                    
                case 'checkin':
                    if (hasCheckedInToday) {
                        output = `<span class="warning">You have already checked in today. Come back tomorrow!</span>`;
                    } else {
                        points += 50;
                        hasCheckedInToday = true;
                        updatePointsDisplay();
                        output = `<span class="success">Daily check-in successful! +50 points added to your account.</span>`;
                    }
                    break;
                    
                case 'referral':
                    output = `<span class="info">Referral Program</span>
                    Your referral code: <span class="success">MPT-7X9Y-2Z8A</span>
                    Referral bonus: <span class="success">${referralBonus.toLocaleString()} points</span>
                    Share your code and earn 10% of your referrals' mining points!`;
                    break;
                    
                case 'clear':
                    commandOutput.innerHTML = '';
                    return;
                    
                case '':
                    return;
                    
                default:
                    output = `<span class="error">Command not found: ${command}. Type 'help' for available commands.</span>`;
            }
            
            commandOutput.innerHTML += `<div class="output">${output}</div>`;
            commandOutput.scrollTop = commandOutput.scrollHeight;
        }
    });
    
    // Mining functionality
    function startMining() {
        isMining = true;
        mineBtn.innerHTML = '<i class="fas fa-stop"></i> Stop Mining';
        mineBtn.classList.add('btn-primary');
        
        miningInterval = setInterval(function() {
            points += 1;
            todayMining += 1;
            updatePointsDisplay();
            
            // Random chance to find bonus
            if (Math.random() < 0.05) {
                const bonus = Math.floor(Math.random() * 10) + 5;
                points += bonus;
                todayMining += bonus;
                updatePointsDisplay();
                
                commandOutput.innerHTML += `<div class="output"><span class="success">Bonus found! +${bonus} points!</span></div>`;
                commandOutput.scrollTop = commandOutput.scrollHeight;
            }
        }, 1000);
    }
    
    function stopMining() {
        isMining = false;
        clearInterval(miningInterval);
        mineBtn.innerHTML = '<i class="fas fa-digging"></i> Start Mining';
        mineBtn.classList.remove('btn-primary');
    }
    
    // Button event listeners
    mineBtn.addEventListener('click', function() {
        if (isMining) {
            stopMining();
            commandOutput.innerHTML += `<div class="output"><span class="warning">Mining stopped.</span></div>`;
        } else {
            startMining();
            commandOutput.innerHTML += `<div class="output"><span class="success">Mining started. Earning points...</span></div>`;
        }
        commandOutput.scrollTop = commandOutput.scrollHeight;
    });
    
    checkinBtn.addEventListener('click', function() {
        if (hasCheckedInToday) {
            commandOutput.innerHTML += `<div class="output"><span class="warning">You have already checked in today. Come back tomorrow!</span></div>`;
        } else {
            points += 50;
            hasCheckedInToday = true;
            updatePointsDisplay();
            commandOutput.innerHTML += `<div class="output"><span class="success">Daily check-in successful! +50 points added to your account.</span></div>`;
        }
        commandOutput.scrollTop = commandOutput.scrollHeight;
    });
    
    referralBtn.addEventListener('click', function() {
        commandOutput.innerHTML += `<div class="output"><span class="info">Referral Program</span>
        Your referral code: <span class="success">MPT-7X9Y-2Z8A</span>
        Referral bonus: <span class="success">${referralBonus.toLocaleString()} points</span>
        Share your code and earn 10% of your referrals' mining points!</div>`;
        commandOutput.scrollTop = commandOutput.scrollHeight;
    });
    
    // Focus on input when clicking anywhere in terminal
    document.querySelector('.terminal').addEventListener('click', function() {
        commandInput.focus();
    });
    
    // Initial focus
    commandInput.focus();
});