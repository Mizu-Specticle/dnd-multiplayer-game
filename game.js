// ===============================
// D&D MULTIPLAYER GAME ENGINE
// ===============================

// Game State
const gameState = {
    currentScreen: 'lobby',
    players: [],
    currentPlayer: 0,
    lobbyCode: '',
    gameInProgress: false,
    sharedBank: [],
    currentWave: 0,
    currentStage: null,
    enemies: [],
    animationQueue: []
};

// Class Definitions
const CLASSES = {
    rogue: {
        name: 'Rogue',
        health: 60,
        attack: 8,
        defense: 3,
        intelligence: 4,
        abilities: ['Quick Strike', 'Evasion', 'Assassinate']
    },
    archer: {
        name: 'Archer',
        health: 70,
        attack: 7,
        defense: 5,
        intelligence: 5,
        abilities: ['Arrow Shot', 'Pierce Shot', 'Multi-Shot']
    },
    mage: {
        name: 'Mage',
        health: 50,
        attack: 6,
        defense: 2,
        intelligence: 9,
        abilities: ['Fireball', 'Frost Bolt', 'Meteor Storm']
    },
    warrior: {
        name: 'Warrior',
        health: 100,
        attack: 9,
        defense: 8,
        intelligence: 3,
        abilities: ['Power Slash', 'Shield Bash', 'Whirlwind']
    },
    'saintsworn': {
        name: 'Saintsworn',
        health: 75,
        attack: 7,
        defense: 5,
        intelligence: 7,
        abilities: ['Holy Strike', 'Divine Light', 'Soul Cleave']
    },
    'dragon-hybrid': {
        name: 'Dragon Hybrid',
        health: 85,
        attack: 10,
        defense: 6,
        intelligence: 6,
        abilities: ['Dragon Claw', 'Fire Breath', 'Dragon Ascension']
    },
    'shadow-walker': {
        name: 'Shadow Walker',
        health: 65,
        attack: 8,
        defense: 4,
        intelligence: 8,
        abilities: ['Shadow Strike', 'Dark Veil', 'Nightmare Swarm']
    }
};

// Weapons and Items
const WEAPONS = {
    'vagabond-wiresplitter': {
        name: 'Vagabond WireSplitter',
        rarity: 'mythical',
        attack: 15,
        color: { primary: '#22c55e', secondary: '#a855f7' },
        type: 'katana',
        abilities: [
            {
                name: 'Mainframe Slash',
                damage: 8,
                cooldown: 2,
                description: 'Down slash arc of green and purple'
            },
            {
                name: 'Digital Breaker',
                damage: 12,
                cooldown: 5,
                description: 'Two quick jabs with purple/green bursts, 2 damage per turn for 3 turns'
            },
            {
                name: 'Databite Flurry',
                damage: 19,
                cooldown: 3,
                description: 'Massive cutscene with purple/green code, 3-25 damage across 3 seconds'
            }
        ]
    },
    'flames-shin-dragon': {
        name: 'Flames of the Shin Dragon',
        rarity: 'mythical',
        attack: 15,
        color: { primary: '#ff6b35', secondary: '#f97316' },
        type: 'katana',
        abilities: [
            {
                name: 'Mainframe Slash',
                damage: 8,
                cooldown: 2,
                description: 'Down slash arc of red and orange'
            },
            {
                name: 'Digital Breaker',
                damage: 12,
                cooldown: 5,
                description: 'Two quick jabs with red/orange bursts'
            },
            {
                name: 'Databite Flurry',
                damage: 19,
                cooldown: 3,
                description: 'Massive flames of red and orange code flow upward'
            }
        ]
    },
    'soul-daggers': {
        name: 'Soul Daggers',
        rarity: 'legendary',
        attack: 12,
        color: { primary: '#22c55e', secondary: '#16a34a' },
        type: 'dual-daggers',
        abilities: [
            {
                name: 'Soul Slash',
                damage: 5,
                cooldown: 2,
                description: 'Green fading slash with souls going up'
            },
            {
                name: 'Breathtaking Blitz',
                damage: 11,
                cooldown: 6,
                description: 'Forward dash with green soul trails'
            },
            {
                name: 'Bringer of Death',
                damage: 19,
                cooldown: 4,
                description: 'Teleport behind enemy, stab all backs, 3 bleed damage for 4 turns'
            }
        ]
    },
    'reaper': {
        name: 'Reaper',
        rarity: 'mythical',
        attack: 14,
        color: { primary: '#000000', secondary: '#ffffff' },
        type: 'giant-scissors',
        abilities: [
            {
                name: 'Precise Cut',
                damage: 3,
                cooldown: 2,
                description: 'Simple scissors cutting, 2 bleed for 3 turns'
            },
            {
                name: 'Fading Trim',
                damage: 0,
                cooldown: 4,
                description: 'Heal self or ally 15 health with random haircut'
            },
            {
                name: 'Deathly Scissors',
                damage: 12,
                cooldown: 5,
                description: 'Throw scissors up, kick them down (AOE damage split evenly)'
            },
            {
                name: 'Clipper Frenzy',
                damage: 13,
                cooldown: 3,
                description: 'Rapid cutting attack on 1-2 enemies with random hairstyles'
            }
        ]
    }
};

// Stage Scenarios
const STAGE_SCENARIOS = [
    {
        name: 'Goblin Ambush',
        difficulty: 1,
        enemies: [
            { name: 'Goblin Scout', health: 20, attack: 3, defense: 1 }
        ]
    },
    {
        name: 'Wolf Pack',
        difficulty: 2,
        enemies: [
            { name: 'Gray Wolf', health: 35, attack: 5, defense: 2 },
            { name: 'Gray Wolf', health: 35, attack: 5, defense: 2 }
        ]
    },
    {
        name: 'Orc Warriors',
        difficulty: 3,
        enemies: [
            { name: 'Orc Warrior', health: 50, attack: 7, defense: 4 }
        ]
    },
    {
        name: 'Bandit's Lair',
        difficulty: 4,
        enemies: [
            { name: 'Bandit Leader', health: 70, attack: 8, defense: 5 },
            { name: 'Bandit', health: 40, attack: 5, defense: 2 }
        ]
    },
    {
        name: 'Dungeon Infiltration',
        difficulty: 5,
        waves: 6,
        isBoss: true,
        enemies: [
            { name: 'Demon Lord', health: 150, attack: 12, defense: 7 }
        ]
    },
    {
        name: 'Strange Statue Scissors',
        difficulty: 3,
        special: 'reaper-chance',
        enemies: []
    }
];

// Utility Functions
function generateLobbyCode() {
    return 'DND' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function getStarRating(difficulty) {
    return '⭐'.repeat(difficulty);
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    gameState.currentScreen = screenId;
}

function addLog(message, type = 'normal') {
    const logElement = document.getElementById('battle-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    logElement.appendChild(entry);
    logElement.scrollTop = logElement.scrollHeight;
}

function tweenValue(from, to, duration, callback) {
    const startTime = Date.now();
    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = from + (to - from) * progress;
        callback(current);
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    animate();
}

// Player Class
class Player {
    constructor(username, className) {
        this.username = username;
        this.className = className;
        const classStats = CLASSES[className];
        
        this.maxHealth = classStats.health;
        this.health = this.maxHealth;
        this.baseAttack = classStats.attack;
        this.baseDefense = classStats.defense;
        this.intelligence = classStats.intelligence;
        this.stats = {
            vitality: 10,
            strength: 10,
            intelligence: classStats.intelligence,
            luck: 10
        };
        
        this.isDead = false;
        this.weapon = null;
        this.armor = [];
        this.inventory = [];
        this.abilities = classStats.abilities;
        this.abilityCooldowns = {};
        this.statusEffects = [];
    }
    
    get attack() {
        let total = this.baseAttack + (this.stats.strength / 10);
        if (this.weapon) total += this.weapon.attack;
        return Math.floor(total);
    }
    
    get defense() {
        let total = this.baseDefense + (this.stats.vitality / 10);
        this.armor.forEach(a => total += a.defense);
        return Math.floor(total);
    }
    
    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - (this.defense / 2));
        this.health = Math.max(0, this.health - actualDamage);
        if (this.health === 0) {
            this.isDead = true;
        }
        return actualDamage;
    }
    
    heal(amount) {
        const healed = Math.min(amount, this.maxHealth - this.health);
        this.health += healed;
        return healed;
    }
    
    addStatusEffect(effect) {
        this.statusEffects.push(effect);
    }
    
    updateStatusEffects() {
        this.statusEffects = this.statusEffects.filter(effect => {
            if (effect.type === 'bleed') {
                this.takeDamage(effect.damage);
                effect.duration--;
            }
            return effect.duration > 0;
        });
    }
}

// Enemy Class
class Enemy {
    constructor(data) {
        this.name = data.name;
        this.maxHealth = data.health;
        this.health = data.health;
        this.attack = data.attack;
        this.defense = data.defense;
        this.statusEffects = [];
    }
    
    takeDamage(damage) {
        const actualDamage = Math.max(1, damage - (this.defense / 2));
        this.health = Math.max(0, this.health - actualDamage);
        return actualDamage;
    }
    
    addStatusEffect(effect) {
        this.statusEffects.push(effect);
    }
    
    updateStatusEffects() {
        this.statusEffects = this.statusEffects.filter(effect => {
            if (effect.type === 'bleed') {
                this.takeDamage(effect.damage);
                effect.duration--;
            }
            return effect.duration > 0;
        });
    }
}

// Game Logic Functions
function createLobby() {
    const username = document.getElementById('username-input').value.trim();
    
    if (!username) {
        alert('Please enter a username!');
        return;
    }
    
    gameState.lobbyCode = generateLobbyCode();
    const player = new Player(username, 'rogue');
    gameState.players = [player];
    
    document.getElementById('lobby-section').style.display = 'none';
    document.getElementById('lobby-info').style.display = 'block';
    document.getElementById('lobby-code-display').textContent = `Lobby Code: ${gameState.lobbyCode}`;
    
    updatePlayersList();
}

function joinLobby() {
    const username = document.getElementById('username-input').value.trim();
    const code = document.getElementById('lobby-code-input').value.trim();
    
    if (!username || !code) {
        alert('Please enter username and lobby code!');
        return;
    }
    
    // Simulate joining
    const player = new Player(username, 'rogue');
    gameState.players.push(player);
    gameState.lobbyCode = code;
    
    document.getElementById('lobby-section').style.display = 'none';
    document.getElementById('lobby-info').style.display = 'block';
    document.getElementById('lobby-code-display').textContent = `Lobby Code: ${code}`;
    
    updatePlayersList();
}

function updatePlayersList() {
    const list = document.getElementById('players-list');
    list.innerHTML = '';
    
    gameState.players.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = 'player-item';
        item.textContent = `${index + 1}. ${player.username} (${CLASSES[player.className].name})`;
        list.appendChild(item);
    });
    
    const btn = document.getElementById('start-game-btn');
    btn.disabled = gameState.players.length < 2 || gameState.players.length > 4;
}

function startGame() {
    if (gameState.players.length < 2 || gameState.players.length > 4) {
        alert('Need 2-4 players to start!');
        return;
    }
    
    showScreen('class-select-screen');
    setupClassSelection();
}

function setupClassSelection() {
    const cards = document.querySelectorAll('.class-card');
    let selectedCount = 0;
    
    cards.forEach(card => {
        card.onclick = () => {
            const className = card.dataset.class;
            gameState.players[selectedCount].className = className;
            card.style.backgroundColor = 'rgba(74, 222, 128, 0.3)';
            
            selectedCount++;
            if (selectedCount === gameState.players.length) {
                setTimeout(() => {
                    gameState.gameInProgress = true;
                    showScreen('game-screen');
                    initializeGame();
                }, 300);
            }
        };
    });
}

function initializeGame() {
    // Reset player states
    gameState.players.forEach(player => {
        player.isDead = false;
        player.health = player.maxHealth;
    });
    
    gameState.currentPlayer = 0;
    gameState.currentWave = 0;
    gameState.sharedBank = [];
    
    updateTurnOrder();
    showStageSelection();
    drawGame();
}

function updateTurnOrder() {
    const turnList = document.getElementById('turn-list');
    turnList.innerHTML = '';
    
    const nextPlayers = gameState.players.slice(gameState.currentPlayer, gameState.currentPlayer + 4);
    
    nextPlayers.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = 'turn-item';
        if (index === 0) item.classList.add('current');
        if (player.isDead) item.classList.add('dead');
        
        item.textContent = `${index + 1}. ${player.username} (${player.health}/${player.maxHealth})`;
        turnList.appendChild(item);
    });
}

function showStageSelection() {
    const container = document.getElementById('stage-options');
    container.innerHTML = '';
    
    const availableStages = STAGE_SCENARIOS.slice(0, 5);
    
    availableStages.forEach(stage => {
        const option = document.createElement('div');
        option.className = 'stage-option';
        option.innerHTML = `<div>${stage.name}</div><div class="stage-difficulty">${getStarRating(stage.difficulty)}</div>`;
        
        option.onclick = () => {
            gameState.currentStage = stage;
            startBattle(stage);
        };
        
        container.appendChild(option);
    });
    
    document.getElementById('stage-selection').style.display = 'block';
}

function startBattle(stage) {
    document.getElementById('stage-selection').style.display = 'none';
    
    gameState.enemies = stage.enemies.map(e => new Enemy(e));
    gameState.currentWave = 1;
    
    updateBattleUI();
}

function updateBattleUI() {
    const currentPlayer = gameState.players[gameState.currentPlayer % gameState.players.length];
    
    document.getElementById('player-name').textContent = currentPlayer.username;
    document.getElementById('player-class').textContent = CLASSES[currentPlayer.className].name;
    
    // Update health bars
    const healthPercent = (currentPlayer.health / currentPlayer.maxHealth) * 100;
    document.getElementById('health-bar').style.width = healthPercent + '%';
    document.getElementById('health-text').textContent = `${Math.floor(currentPlayer.health)}/${Math.floor(currentPlayer.maxHealth)}`;
    
    if (gameState.enemies.length > 0) {
        const enemy = gameState.enemies[0];
        document.getElementById('enemy-name').textContent = enemy.name;
        const enemyHealthPercent = (enemy.health / enemy.maxHealth) * 100;
        document.getElementById('enemy-health-bar').style.width = enemyHealthPercent + '%';
        document.getElementById('enemy-health-text').textContent = `${Math.floor(enemy.health)}/${Math.floor(enemy.maxHealth)}`;
    }
    
    updateTurnOrder();
    setupAbilities();
}

function setupAbilities() {
    const currentPlayer = gameState.players[gameState.currentPlayer % gameState.players.length];
    const container = document.getElementById('player-abilities');
    container.innerHTML = '';
    
    // Basic attack
    const basicBtn = document.createElement('button');
    basicBtn.className = 'ability-btn';
    basicBtn.textContent = `Attack (${currentPlayer.attack} DMG)`;
    basicBtn.onclick = () => performAction('attack');
    container.appendChild(basicBtn);
    
    // Class abilities
    currentPlayer.abilities.forEach((ability, index) => {
        const btn = document.createElement('button');
        btn.className = 'ability-btn';
        btn.textContent = ability;
        
        const cooldown = currentPlayer.abilityCooldowns[ability] || 0;
        if (cooldown > 0) {
            btn.disabled = true;
            btn.innerHTML += `<br><span class="ability-cooldown">CD: ${cooldown}</span>`;
        }
        
        btn.onclick = () => performAction('ability', ability);
        container.appendChild(btn);
    });
    
    // Defend
    const defendBtn = document.createElement('button');
    defendBtn.className = 'ability-btn';
    defendBtn.textContent = 'Defend';
    defendBtn.onclick = () => performAction('defend');
    container.appendChild(defendBtn);
}

function performAction(actionType, actionName = null) {
    const currentPlayer = gameState.players[gameState.currentPlayer % gameState.players.length];
    
    if (gameState.enemies.length === 0) return;
    
    const enemy = gameState.enemies[0];
    let damage = 0;
    
    if (actionType === 'attack') {
        damage = currentPlayer.attack + Math.floor(Math.random() * 5);
        const actualDamage = enemy.takeDamage(damage);
        addLog(`${currentPlayer.username} attacked for ${Math.floor(actualDamage)} damage!`, 'damage');
    } else if (actionType === 'ability') {
        damage = (Math.random() * 15) + 10;
        const actualDamage = enemy.takeDamage(damage);
        addLog(`${currentPlayer.username} used ${actionName}! ${Math.floor(actualDamage)} damage!`, 'ability');
        currentPlayer.abilityCooldowns[actionName] = 3;
    } else if (actionType === 'defend') {
        addLog(`${currentPlayer.username} takes a defensive stance!`, 'normal');
    }
    
    // Update cooldowns
    Object.keys(currentPlayer.abilityCooldowns).forEach(ability => {
        if (currentPlayer.abilityCooldowns[ability] > 0) {
            currentPlayer.abilityCooldowns[ability]--;
        }
    });
    
    // Check if enemy is defeated
    if (enemy.health <= 0) {
        gameState.enemies.shift();
        if (gameState.enemies.length === 0) {
            addLog(`${enemy.name} has been defeated!`, 'heal');
            endRound();
        }
    } else {
        // Enemy counter-attack (after a delay)
        setTimeout(() => {
            enemyTurn();
        }, 500);
    }
    
    updateBattleUI();
}

function enemyTurn() {
    const currentPlayer = gameState.players[gameState.currentPlayer % gameState.players.length];
    const enemy = gameState.enemies[0];
    
    if (!enemy) return;
    
    const damage = enemy.attack + Math.floor(Math.random() * 3);
    const actualDamage = currentPlayer.takeDamage(damage);
    addLog(`${enemy.name} attacks for ${Math.floor(actualDamage)} damage!`, 'damage');
    
    if (currentPlayer.health <= 0) {
        currentPlayer.isDead = true;
        addLog(`${currentPlayer.username} has been defeated!`, 'damage');
    }
    
    updateBattleUI();
    nextTurn();
}

function endRound() {
    // Check for fountain of rejuvenation (low chance)
    if (Math.random() < 0.15) {
        const deadPlayer = gameState.players.find(p => p.isDead);
        if (deadPlayer) {
            showFountainPrompt(deadPlayer);
            return;
        }
    }
    
    // Check for resting spot (low chance)
    if (Math.random() < 0.2) {
        showRestingArea();
        return;
    }
    
    // Continue to next stage or victory
    if (gameState.currentWave < gameState.currentStage.waves) {
        gameState.currentWave++;
        startBattle(gameState.currentStage);
    } else {
        showVictory();
    }
}

function showFountainPrompt(player) {
    document.getElementById('fountain-target').textContent = `${player.username} lies motionless...`;
    document.getElementById('fountain-prompt').style.display = 'block';
    
    document.getElementById('fountain-revive').onclick = () => {
        player.health = player.maxHealth * 0.3;
        player.isDead = false;
        addLog(`${player.username} has been revived by the fountain!`, 'heal');
        document.getElementById('fountain-prompt').style.display = 'none';
        endRound();
    };
    
    document.getElementById('fountain-skip').onclick = () => {
        document.getElementById('fountain-prompt').style.display = 'none';
        endRound();
    };
}

function showRestingArea() {
    document.getElementById('resting-area').style.display = 'block';
    
    document.getElementById('rest-heal').onclick = () => {
        gameState.players[gameState.currentPlayer % gameState.players.length].heal(gameState.players[gameState.currentPlayer % gameState.players.length].maxHealth * 0.3);
        addLog('Health restored!', 'heal');
        document.getElementById('resting-area').style.display = 'none';
        endRound();
    };
    
    document.getElementById('rest-weapon').onclick = () => {
        gameState.players[gameState.currentPlayer % gameState.players.length].baseAttack += 2;
        addLog('Weapon damage increased!', 'ability');
        document.getElementById('resting-area').style.display = 'none';
        endRound();
    };
    
    document.getElementById('rest-armor').onclick = () => {
        gameState.players[gameState.currentPlayer % gameState.players.length].baseDefense += 2;
        addLog('Armor reinforced!', 'heal');
        document.getElementById('resting-area').style.display = 'none';
        endRound();
    };
    
    document.getElementById('bank-access').onclick = () => {
        showBank();
    };
    
    document.getElementById('continue-adventure').onclick = () => {
        document.getElementById('resting-area').style.display = 'none';
        endRound();
    };
}

function showBank() {
    const bankMenu = document.getElementById('bank-menu');
    const inventory = document.getElementById('bank-inventory');
    inventory.innerHTML = '';
    
    gameState.sharedBank.forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = `bank-item ${item.rarity}`;
        itemEl.textContent = item.name;
        inventory.appendChild(itemEl);
    });
    
    bankMenu.style.display = 'block';
    document.getElementById('close-bank').onclick = () => {
        bankMenu.style.display = 'none';
    };
}

function nextTurn() {
    gameState.currentPlayer++;
    const nextPlayer = gameState.players[gameState.currentPlayer % gameState.players.length];
    
    if (nextPlayer.isDead) {
        nextTurn();
        return;
    }
    
    updateBattleUI();
}

function showVictory() {
    showScreen('victory-screen');
    
    const content = document.getElementById('victory-content');
    content.innerHTML = `
        <h2>Dungeon Cleared!</h2>
        <p>All enemies defeated!</p>
        <div id="rewards"></div>
    `;
    
    document.getElementById('return-lobby-btn').onclick = () => {
        showScreen('lobby-screen');
        initializeGame();
    };
}

function drawGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#1a2332';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw forest background
    ctx.fillStyle = '#2d5a3d';
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.6);
    
    // Draw ground
    ctx.fillStyle = '#3a6d4f';
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);
    
    // Draw simple player and enemy representations
    drawPixelatedCharacter(ctx, 150, 300, '#4ade80');
    drawPixelatedCharacter(ctx, canvas.width - 150, 300, '#ef4444');
    
    requestAnimationFrame(drawGame);
}

function drawPixelatedCharacter(ctx, x, y, color) {
    // Simple pixelated humanoid (64+ shapes approach)
    const scale = 4;
    
    // Head
    ctx.fillStyle = '#f5deb3';
    ctx.fillRect(x - 12, y - 30, 24, 24);
    
    // Body
    ctx.fillStyle = color;
    ctx.fillRect(x - 10, y - 6, 20, 20);
    
    // Arms
    ctx.fillRect(x - 18, y - 2, 8, 16);
    ctx.fillRect(x + 10, y - 2, 8, 16);
    
    // Legs
    ctx.fillRect(x - 6, y + 14, 6, 12);
    ctx.fillRect(x, y + 14, 6, 12);
}

// Event Listeners
document.getElementById('create-lobby-btn').addEventListener('click', createLobby);
document.getElementById('join-lobby-btn').addEventListener('click', joinLobby);
document.getElementById('start-game-btn').addEventListener('click', startGame);

document.getElementById('open-stat-menu').addEventListener('click', () => {
    document.getElementById('stat-menu').style.display = 'block';
});

document.getElementById('close-stat-menu').addEventListener('click', () => {
    document.getElementById('stat-menu').style.display = 'none';
});

// Stat upgrades
['vitality', 'strength', 'intelligence', 'luck'].forEach(stat => {
    document.getElementById(`${stat}-up`).addEventListener('click', () => {
        gameState.players[gameState.currentPlayer % gameState.players.length].stats[stat]++;
        document.getElementById(`${stat}-val`).textContent = gameState.players[gameState.currentPlayer % gameState.players.length].stats[stat];
    });
});

// Initialize
console.log('D&D Multiplayer Game Engine Loaded!');
