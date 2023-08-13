import { SyntheticEvent, useEffect, useState } from "react";
import '../../css/nev.css';
import { useAuth } from "./useAuth";
import { useAccount } from "./useAccount";

const NavDropDown = () => {
	const { account } = useAccount()
	const [open, setOpen] = useState(false);

	/*useEffect(() => {
		let handler = () => {
			setOpen(false);
		};
		document.addEventListener("mousedown", handler);
	});*/

	const handleOpen = () => {
		setOpen(!open);
	};

	const { logout } = useAuth();
	const LogoutSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log("test");
		logout();
	}

	return (
		<div>
			<span onClick={handleOpen} className="test">{account.username}</span>
			{open ? (
				<ul className="menu">
					<li className="menu-item">
						<button>profile</button>
					</li>
					<li className="menu-item">
						<button onClick={LogoutSubmit}>logout</button>
					</li>
				</ul>
			) : null}
		</div>
	);
};

export default NavDropDown;