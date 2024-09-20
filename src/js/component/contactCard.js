import React from "react";


export const ContactCard = ({contact}) => {
    const {name, email, address, phone}= contact;


    return(
        <li className="list-group-item">
            <div className="container w-100 border border-black">
                <div className="text-start">
                    <label className="Name">{name}</ label>
                    <br></br>
                    <span>{address}</span>
                </div>
            </div>
        </li>
    )
}