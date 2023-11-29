import { useEffect, useState } from "react";
import { handleMouseEnter, handleMouseLeave } from "../Tools";
import axios from "axios";
import { useAccount } from "../../../ui/organisms/useAccount";


const RankingCard = () => {

    const { account } = useAccount();
    const [rankNbr, setRankNbr] = useState<number>();
    const [userPts, setUserPts] = useState<number>();

    useEffect (() => {
        const getRanking = async () => {
            try {
                const ranking = await axios.get(`http://localhost:4000/user/ranking?userId=${account.username}`);
                const rankNbr = ranking.data.findIndex((user: any) => user.username === account.username)
                const userPts = ranking.data[rankNbr].score
                setUserPts(userPts);
                setRankNbr(rankNbr + 1);
            } catch (error) {
                console.error("Erreur lors de la récupération du classement :", error);
            }
        }
        getRanking();
    }, [])

    return(
        <div className="rankingCardContainer">
            <div className="rankingNbrContainer">
                <h1 className="rankingNbr">{rankNbr}</h1>
            </div>
            <div className="ligneHor"></div>
            <div className="rankingNbrContainer">
                <h1 className="rankingPts">{userPts} pts</h1>
            </div>
        </div>         
               
    )

}

export default RankingCard