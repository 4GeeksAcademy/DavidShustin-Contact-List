import React, { useContext } from "react";
import { Context } from "../store/appContext";
import carIcon from "../../img/user-icon.png"
import { Link } from "react-router-dom";

export const ContactCard = ({ contact }) => {
    const { name, email, address, phone } = contact;
    const { actions }= useContext(Context);

    const handleDelete = () => {
        actions.deleteContacts(contact.id);
    } 

    return (
        <li className="list-group-item">
            <div className="container w-100 row align-items-center">
                <div className="col-12 col-sm-4 col-md-3">
                    <img
                        className="mx-auto d-block img-fluid"
                        src={carIcon}
                        alt="user profile icon"
                        width="110px"

                    />
                </div>
                <div className="col-12 col-sm-8 col-md-9">
                    <div className="float-end">
                        <Link to={`/editContact/${contact.id}`}>
                            <button className="btn fas fa-pencil-alt"></button>
                        </Link>
                        <button className="btn fas fa-trash-alt" onClick={handleDelete}></button>
                    </div>
                    <div className="text-start">
                        <label className="lead fw-bold" >{name}</ label>
                        <br></br>
                        <span className="fas fa-map-marker-alt text-muted small me-2"></span>
                        <span className="text-muted small">{address}</span>
                        <br></br>
                        <span className="fa fa-phone fa-fw text-muted small me-2"></span>
                        <span className="text-muted small">{phone}</span>
                        <br></br>
                        <span className="fa fa-envelope fa-fw text-muted small me-2"></span>
                        <span className="text-muted small">{email}</span>
                    </div>
                </div>

            </div>
        </li>
    )
}