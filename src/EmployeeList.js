import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {

    Link
} from "react-router-dom";


export default function EmployeeList() {

    let api = "https://gemeindeservice-backend.herokuapp.com/"


    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch(api + "persons")
            .then(response => response.json())
            .then(data => setEmployees(data));
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
                                        <th>Vorname</th>
                                        <th>Nachname</th>
                                        <th>Funktion</th>
                                    </tr>
                                    {
                                        employees.map(employee => {
                                            return (
                                                <tr>
                                                    <td> <Link to={`../empl/${employee.svnr}`}>{employee.vorname}</Link></td>
                                                    <td> <Link to={`../empl/${employee.svnr}`}>{employee.nachname}</Link></td>
                                                    <td> <Link to={`../empl/${employee.svnr}`}>{employee.funktion}</Link></td>
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
