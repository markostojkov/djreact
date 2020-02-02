import React, { Fragment } from "react";

import Form from "./Form";
import Customers from "./Customers";

export default function Dashboard() {
	return (
		<Fragment>
			<Customers />
			<Form />
		</Fragment>
	);
}
