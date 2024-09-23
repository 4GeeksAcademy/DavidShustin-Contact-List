import { json } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
	const API_URL = "https://playground.4geeks.com/contact/agendas";
	const user = "dshustin";

	const handleResponse = (response) => {
		console.log("response from api:", response);
		if (!response.ok) throw { status: response.status, statusText: response.statusText };
		return response.text().then(text => text ? JSON.parse(text) : {});

		// return response.json();
	}
	return {
		store: {
			contacts: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			getContacts: () => {
				fetch(`${API_URL}/${user}`)
					.then(handleResponse)
					.then((data) => {
						if (Array.isArray(data.contacts)) {
							setStore({ contacts: data.contacts });
							console.log("contacts set in store:", data.contacts);
						} else {
							console.error("fetched data is not an array.", data);
							setStore({ contacts: [] });
						}

					})
					.catch((error) => {
						console.error("fetching contacts failed.", error);
						error.status === 404 && getActions().addUser();

					})
			},
			addUser: () => {
				fetch(`${API_URL}/${user}`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({})
				})
					.then(handleResponse)
					.then((data) => {
						console.log(`${user} added successfully`, data);
						getActions().getContacts();
					})
					.catch((error) => {
						console.error("Adding user failed.", error);
					})
			},
			editContact: (id, contactData) => {
				fetch(`${API_URL}/${user}/contacts/${id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contactData)
				})
					.then(handleResponse)
					.then(() => getActions().getContacts())
					.catch((error) => console.error("Editing Contact Failed", error));
			},
			deleteContacts: (id) => {
				fetch(`${API_URL}/${user}/contacts/${id}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({})
				})
					.then(handleResponse)
					.then(() => getActions().getContacts())
					.catch((error) => console.error("Deleting Contacts Failed", error));
			},
			addContacts: (contactData) => {
				fetch(`${API_URL}/${user}/contacts`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(contactData)
				})
					.then(handleResponse)
					.then(() => getActions().getContacts())
					.catch((error) => console.error("Adding new contact failed", error))
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
