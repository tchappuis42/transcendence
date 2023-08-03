import Navigation from "../ui/organisms/Navigation";
import Login from "./Login";
import Signup from "./Signup";

const navigationOptions = [
	{ label: 'home', url: '/' },
	{ label: 'test', url: '/test' },
	{ label: 'pong', url: '/pong' },
];

const Test = () => {
	const a = true;

	if (a === true) {
		return (
			<div>
				<Navigation options={navigationOptions} />
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