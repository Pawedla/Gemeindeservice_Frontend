import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
    Link
} from "react-router-dom";

export default function Header() {

    return (
        <div>
            <div className="container text-center">
                <h1 className="py-4 bg-dark text-light rounded m-0"><i className='fas fa-building'></i> Gemeindeverwaltung</h1>
                <div className="topnav bg-dark text-light">
                    <Link to="..">Home</Link>
                </div>
                <br />
                <div className="container text-center">
                    <h3 className="py-4 bg-info text-light rounded">4020 Linz</h3>
                </div>
            </div>
        </div>
    )
}
