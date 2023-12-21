export interface Paddle {
	x: number;
	y: number;
	color : string;
	score: number;
	paddleHeight : number;
	paddleWidth : number;
}

export interface Game {
	start: boolean;
	score_left: number;
	score_right: number;
	winner: number;
	rgb: boolean;
}

export interface Ball {
	x: number,
	y: number,
	width: number,
	height: number,
	color : string | null,
}