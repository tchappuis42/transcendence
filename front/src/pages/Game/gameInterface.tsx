export interface Paddle {
	x: number;
	y: number;
	width: number;
	height: number;
	score: number;
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
}