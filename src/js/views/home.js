import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { ContactCard } from "../component/contactCard";

import "../../styles/home.css";

export const Home = () => {
	const { store }= useContext(Context);
	return (
		<div className="container my-2">
			<div className="d-flex justify-content-end py-3">
				<Link type="button" className="btn btn-success" to="/contact-form">Add New Contact</Link>
			</div>
			<div
				className="pannel-collapse collapse show mb-5"
				aria-expanded = "true"
			>
				<ul className="list-group pull-down">
					{store.contacts.map((contact, index) => (
						<ContactCard key={index} contact={contact} />
					))}
				</ul>
			</div>
		</div>
	);
}


