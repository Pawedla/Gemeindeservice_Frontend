import React from 'react'
import {
    Link
} from "react-router-dom";

export default function Overview() {
    return (
        <div className="container text-center">
            <div className="container text-center">
                <div className="container">
                    <ul>
                        <li className="list-group-item"><Link to="employees/list">Mitarbeiter</Link></li>
                        <li className="list-group-item"><Link to="meetings/list">Sitzungen</Link></li>
                        <li className="list-group-item"><Link to="decisions/list">Beschlüsse</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
