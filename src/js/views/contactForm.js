import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

export const ContactForm = () => {
    const {store, actions} = useContext(Context);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate()
    const [contactData, setContactData]= useState({
        name: "",
        email: "",
        address: "",
        phone: ""
    })
    useEffect(() => {
        if (isEdit) {
            const contact= store.contacts.find(c => c.id === parseInt(id));
            if (contact) {
                setContactData(contact);
            }
        }
    }, [id, isEdit, store.contacts])
    const handleChange = (e) => {
        setContactData({ ...contactData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await actions.editContact(id, contactData)
            } else {
                await actions.addContacts(contactData)
            }
            await actions.getContacts();
            navigate("/");
        } catch(error) {
            console.error(isEdit? "error updating contact": "error adding contact", error);
        }
    }

    return(
        <div className="container">
            <h1 className="text-center mt-3">{ isEdit ? "Update Contact" : "Add a New Contact"}</h1>
            <form className="contact-form " onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        value={contactData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>address</label>
                    <input
                        type="text"
                        name="address"
                        className="form-control"
                        placeholder="address"
                        value={contactData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="phone"
                        value={contactData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="email"
                        value={contactData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary form-control mt-4">
                    {isEdit ? "Update Contact": "Save"}
                </button>
            </form>
            <a href="/">or get back to contacts</a>
        </div>
    )
}