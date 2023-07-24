import Login from "./Login";
import Signup from "./Signup";


const Test = () => {
	const a = true;

	if (a === true) {
		return (
			<div>
				<Login />
				<Signup />
			</div>

		);
	}
	else {
		return (
			Signup(),
			<h1>test</h1>
		)
	}
};
export default Test;