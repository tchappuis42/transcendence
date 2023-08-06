import { useAccount } from "../ui/organisms/useAccount";

const Testuser = () => {
	const { account } = useAccount()
	return (
		<div className="divtest">
			<h1>salut {account.username}</h1>
		</div>
	)
};
export default Testuser;
