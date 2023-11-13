import React, {useState, useEffect} from "react"
import axios from "axios";
import "../../../../styleProfilPage/toolsCss.css"
import "../infoProfile.css"
import {useAccount} from "../../../../../../ui/organisms/useAccount";

interface Rank {
	username: string,
	score: number
}

export const MyName = () => {
	const { account } = useAccount()
	const [level, setLevel] = useState(0);
	const [rank, setRank] = useState<Rank[]>([]);
	const [myRank, setMyRank] = useState<Rank>();
	// const [myIndex, setIndex] = useState<number>(0);

	useEffect(() => {
		const me = rank.find(user => user.username === account.username)
		// const index = rank.findIndex(user => user.username === account.username)
		console.log("me = ",rank.find(user => user.username === account.username));
		setMyRank(me)
		console.log("myRank = ",myRank);
		// setIndex(index)
	}, [rank]);

	useEffect(() => {
		const getRank = async () => {
			try {
				const response = await axios.get("http://localhost:4000/user/ranking");
				setRank(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération des scores :", error);
			}
		}
		getRank();
	}, []);

	const handleCLickButton = () => {
		if (level < 1000)
			setLevel(level + 20);
	}
	const handleClickReset = () => {
		setLevel(0);
	}

	return (
		<div className="rest-information-component black-border-fine">
			<div className="name-component black-border-separation-b">
				{account.username}
			</div>
			<div className="rank-component">
				<div className="current-level-component ">
					rank: {myRank?.score}
				</div>
				<div className="up-reset-component blue-border">
					<button className="red-border bg-green-300" onClick={handleCLickButton}>
						level-up
					</button>
					<button className="blue-border bg-rose-500" onClick={handleClickReset}>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
}

/*
* Game ranking

import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "../../ui/organisms/useAccount";

interface Rank {
	username: string,
	score: number
}

const Ranking = () => {

	const [rank, setRank] = useState<Rank[]>([]);
	const [myRank, setMyRank] = useState<Rank>();
	const [myIndex, setIndex] = useState<number>(0);
	const { account } = useAccount();

	useEffect(() => {
		const me = rank.find(user => user.username === account.username)
		const index = rank.findIndex(user => user.username === account.username)
		setMyRank(me)
		setIndex(index)
	}, [rank]);

	useEffect(() => {
		const getRank = async () => {
			try {
				const response = await axios.get("http://localhost:4000/user/ranking");
				setRank(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération des scores :", error);
			}
		}
		getRank();
	}, []);

	//h-1/2 w-2/5 bg-gray-300 items-center flex-col flex
	return (
		<div className="w-full p-4 h-56 bg-white/50 rounded-3xl items-center flex-col flex my-1 sm:w-[49%] sm:h-72 md:w-[39%] md:h-96 md:mt-0 xl:w-[468px]">
			<h1 className="text-3xl sm:text-3xl font-bold h-10 md:h-12">Ranking</h1>
			<div className="flex flex-col h-[10rem] w-full sm:h-60 md:h-80">
				<div className="rounded border border-black">
					<table className="sticky top-0 w-full">
						<tr>
							<th className="w-1/3 text-center">rank</th>
							<th className="w-1/3 text-center">name</th>
							<th className="w-1/3 text-center">points</th>
						</tr>
					</table>
				</div>
				<div className="rounded border border-black overflow-y-auto h-full">
					<table className="w-full">
						<thead className="sticky top-0 bg-sky-200 w-full">
							<tr className="text-blue-800">
								<td className="text-center">{myIndex + 1}</td>
								<td className="text-center">{myRank?.username}</td>
								<td className="text-center">{myRank?.score}</td>
							</tr>
						</thead>
						<tbody className="w-full">
							{rank.map((user, id) => (
								<tr key={id} className="">
									<td className="w-1/3 text-center">{id + 1}</td>
									<td className="text-center">{user.username}</td>
									<td className="w-1/3 text-center">{user.score}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

			</div>
		</div>
	);
}

export default Ranking;
*/