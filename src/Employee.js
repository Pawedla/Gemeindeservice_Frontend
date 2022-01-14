import React, { useState, useEffect } from 'react';
import {
    Link,
    useParams
} from "react-router-dom";

export default function Employee() {

    let api = "https://gemeindeservice-backend.herokuapp.com/"


    let { svnr } = useParams();
    const [employee, setEmployee] = useState();

    useEffect(() => {
        fetch(api + `persons/${svnr}`)
            .then(response => response.json())
            .then(data => setEmployee(data));
    }, []);

    return (
        <div class="container text-center">
            <div class="container text-center">
                <div class="container">
                    <h5 align="center">Mitarbeiterdaten</h5>
                    <br />
                    <div class="table-responsive">
                        <table id="data" class="table table-striped table-bordered">
                            <tr>
                                <th>SVNR</th>
                                <th>Vorname</th>
                                <th>Nachname</th>
                                <th>Funktion</th>
                                <th>Telefon</th>
                                <th>Email</th>
                                <th>Geburtsdatum</th>
                            </tr>
                            {employee ?
                                <tr>
                                    <td>{employee.svnr}</td>
                                    <td>{employee.vorname}</td>
                                    <td>{employee.nachname}</td>
                                    <td>{employee.funktion}</td>
                                    <td>{employee.tel}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.geburtsdatum}</td>
                                </tr>
                                : null
                            }
                        </table>
                    </div>

                    <Link to={`../edit/${svnr}`}>
                        <button type="submit" name="create" class="m-3 btn btn-primary">Bearbeiten</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
