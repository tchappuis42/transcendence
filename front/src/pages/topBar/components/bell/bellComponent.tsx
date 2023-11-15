import React, { useState } from "react";
import "../slanderousMenu.css"
import notification from "../../../image/noun-bell.svg";
import { ClickOutside } from "../../tools/clickoutside"

type IsActivComponentBell = {
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BellNotificationComponent = ({ setIsActive }: IsActivComponentBell) => {
	const [open, setOpen] = useState(false);
	const ref = ClickOutside({ setOpen });

	const handleOpen = (): void => {
		setOpen(!open);
	}

	return (
		<div className="bell-img-notification" ref={ref}>
			<span className="test-1" onClick={handleOpen}>
				<img alt="notification" src={notification} className="h-[20px]" />
			</span>
			{open && (
				<div>
					<div className="menu-slanderous-bell black-border-fine">
						<li className="menu-slanderous-list">
							notification-2
						</li>
						<li className="menu-slanderous-list">
							notification-2
						</li>
					</div>
				</div>
			)}
		</div>
	);
}
