class Enemy {

    constructor(row,speed){
        this.x = -100;
        this.y = 135 + (row - 1) * 80;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    };

    update(dt){
        this.x = this.x + this.speed * dt;
        if (this.x > 1050) this.x = -100;
    };

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

class Player {

    constructor() {
        this.x = 500;
        this.y = 630;
        this.sprite = 'images/char-princess-girl.png';
        this.score = 0;
    }

    update(){
        if(this.key === 'left' && this.x > 0){
            this.x = this.x - 100;
        }else if(this.key === 'right' && this.x !== 1000){
            this.x = this.x + 100;
        }else if(this.key === 'up' && this.y > 0){
            this.y = this.y - 80;
        }else if (this.key === 'down' && this.y < 580){
            this.y = this.y + 80;
        }
        this.key = null;

        // if(this.y < 25){
        //     this.reset();
        // }
    }

    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    reset(){
        this.x = 500;
        this.y = 630;
    }
    handleInput(e) {
        this.key = e;
    }

}
class Item {
    constructor(){
        this.x = getRandomNumber(1,10)*100;
        this.y = getRandomNumber(3,10)*75;
        this.sprite = 'images/Heart.png';
    };

    reset(){
        this.x = getRandomNumber(1,9)*100;
        this.y = (getRandomNumber(1,9)*75);

    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

let allEnemies = [];
let player = new Player();
let item = new Item();

for (let i = 0; i < 15; i++) {
    let randomSpeed = getRandomNumber(1, 25) * 10;
    let randomRow = getRandomNumber(1, 6);
    allEnemies[i] = new Enemy(randomRow, randomSpeed);
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
let modal = document.querySelector('.reward__container');
let modalButton = document.querySelector('.restart');
modalButton.addEventListener('click',function(){
    modal.style.display = 'none';
    player.score = 0;
    player.reset();
    item.reset();
});
let scoreButton = document.querySelector('.score__button');

