export interface Paddle {
	x: number;
	y: number;
	width: number;
	height: number;
	dy: number;
	color: number;
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
	resetting: boolean,
	dx: number,
	dy: number,
	color: number;
}