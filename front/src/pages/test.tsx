import Login from "./Auth/Login";
import SignupForm from "./Auth/SignupForm";

const Test = () => {
	const a = true;

	if (a === true) {
		return (
			<div>
				page de test
				<Login />
			</div>

		);
	}
	else {
		return (
			<h1>test</h1>
		)
	}
};
export default Test;