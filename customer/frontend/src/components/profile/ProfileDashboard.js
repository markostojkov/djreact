import React, { Fragment } from "react";

import ChangePassword from "./ChangePassword";
import User from "./User";
import ChangeUser from "./ChangeUser";

export default function ProfileDashboard() {
	return (
		<div className="row mt-3">
			<User />
			<ChangePassword />
			<ChangeUser />
		</div>
	);
}
