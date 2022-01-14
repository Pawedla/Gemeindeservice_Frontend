import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
    Link
} from "react-router-dom";


export default function DecisionList() {

    let api = "https://gemeindeservice-backend.herokuapp.com/"


    const [decisions, setDecisions] = useState([]);

    useEffect(() => {
        fetch(api + "beschluss")
            .then(response => response.json())
            .then(data => setDecisions(data));

    }, []);


    return (

        <div>
            <div className="container text-center">
                <div className="container text-center">
                    <div className="container">
                        <h5 align="center">Mitarbeiterliste</h5>
                        <br />
                        <div className="table-responsive">
                            <table id="data" className="table table-striped table-bordered">
                                <tbody className='table-striped'>
                                    <tr>
                                        <th>Beschreibung</th>
                                    </tr>
                                    {
                                        decisions.map(decision => {
                                            return (
                                                <tr>
                                                    <td> <Link to={`../decision/${decision.id}`}>{decision.text}</Link></td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <Link to="../add">
                            <button type="submit" name="create" class="m-3 btn btn-primary">Hinzufügen</button>
                        </Link>
                    </div >
                </div>
            </div>
        </div>
    )
}
