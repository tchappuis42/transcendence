import { ppid } from "process";
import { Ball } from "./ball";
import { Paddle } from "./paddle";

type functions = {
    bonusFunc: (modifier : Paddle[] | Ball | undefined) => void;
    color : string;
    modifier? : Paddle[] | Ball | undefined;
}

type   modifier  = {
    paddle1 : Paddle, 
    paddle2 : Paddle, 
    ball : Ball
}

type coor = {
    x: number;
    y: number;
}

export class Bonus {
    private paddle1 : Paddle;
    private paddle2 : Paddle;
    private ball : Ball;
    isLaunched : boolean;
    index : number;
    color:string;
    coor: {
        x: number;
        y: number;
    };
    functions: functions[];

    constructor(id?: number, modifier? : modifier, coor? : coor) {
        this.coor = {
                x: coor?.x,
                y: coor?.y,
        }
        this.paddle1 = modifier?.paddle1;
        this.paddle2 = modifier?.paddle2;
        this.ball = modifier?.ball;
        this.index = id;
        this.isLaunched = false;
        this.color = "transparent";
        this.functions = [
            {
                bonusFunc: slowDownPaddle,
                modifier : [this.paddle1, this.paddle2],
                color : "blue",
            },
            {
                bonusFunc : speedUpBall,
                modifier : this.ball,
                color:"red",
            },
            {
                bonusFunc : SmallPaddle,
                modifier : [this.paddle1, this.paddle2],
                color:"green",
            },
            {
                bonusFunc : invisiblePaddle,
                modifier : [this.paddle1, this.paddle2],
                color:"purple",
            },
            {
                bonusFunc: slowDownPaddle,
                modifier : [this.paddle1, this.paddle2],
                color : "blue",
            },
            {
                bonusFunc : speedUpBall,
                modifier : this.ball,
                color:"red",
            },
            {
                bonusFunc : SmallPaddle,
                modifier : [this.paddle1, this.paddle2],
                color:"green",
            },
            {
                bonusFunc : invisibleBall,
                modifier : this.ball,
                color:"yellow",
            }
        ]
    }

    bonusInit(){
        if (this.functions[this.index]) {
            this.color = this.functions[this.index].color;
        } else {
            console.error(`Function at index ${this.index} does not exist.`);
        }
    }
    
    launchBonus(){
        if (this.functions[this.index]) {
            const funcToCall = this.functions[this.index].bonusFunc;
            const modifier = this.functions[this.index].modifier;
            console.log("WE LAUNCH THE ASSOCIATED BONUS")
            funcToCall(modifier);
        } else {
            console.error(`Function at index ${this.index} does not exist.`);
        }
    }
};

const slowDownPaddle = (paddles: Paddle[]) => {

    const tmpSpeeds: number[] = [];
    paddles.forEach(paddle => {
        tmpSpeeds.push(paddle.speed);
        paddle.speed = 3;
    });

    setTimeout(() => {
        paddles.forEach((paddle, index) => {
            paddle.speed = tmpSpeeds[index];
        });
    }, 5000);
};

const speedUpBall = (ball: Ball) => {

    const tmpSpeed: number = ball.speed;
    ball.speed = tmpSpeed * 1,5;

    setTimeout(() => {
        ball.speed = tmpSpeed;
    }, 9000);
};

const SmallPaddle = (paddles: Paddle[]) => {

    const tmpSize: number[] = [];
    paddles.forEach(paddle => {
        tmpSize.push(paddle.height);
        paddle.height = 20;
    });

    setTimeout(() => {
        paddles.forEach((paddle, index) => {
            paddle.height = tmpSize[index];
        });
    }, 6000);
};

const invisiblePaddle = (paddles: Paddle[]) => {
    const delays = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000];
    
    delays.forEach((delay, index) => {
        setTimeout(() => {
            paddles[0].color = index % 2 === 0 ? "transparent" : "";
            paddles[1].color = index % 2 === 0 ? "" : "transparent";
        }, delay);
    });
    delays.forEach(() => {
        setTimeout(() => {
            paddles[1].color = "";
        }, 9000);
    });
};

const invisibleBall = (ball: Ball) => {
    const delays = [1000, 2000, 3000, 4000, 5000, 6000];
    
    delays.forEach((delay, index) => {
        setTimeout(() => {
            ball.color = index % 2 === 0 ? "transparent" : "";
        }, delay);
    });
};


