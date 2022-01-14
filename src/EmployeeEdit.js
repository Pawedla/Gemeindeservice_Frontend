import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';

import {
    Navigate,
    useParams
} from "react-router-dom";

export default function EmployeeEdit() {

    let api = "https://gemeindeservice-backend.herokuapp.com/"



    const [employee, setEmployee] = useState();
    const [redirect, setRedirect] = useState(false);

    let { svnr } = useParams();
    const del = useRef()

    useEffect(() => {
        if (svnr) {
            fetch(api + `persons/${svnr}`)
                .then(response => response.json())
                .then(data => setEmployee(data));
        }
    }, []);

    const firstName = useRef();
    const lastName = useRef();
    const birthDate = useRef();
    const svNumber = useRef();
    const tel = useRef();
    const email = useRef();
    const func = useRef();

    const submitEmployee = (e) => {
        if (e && e == "delete") {
            axios.delete(api + `persons/${svnr}`)
                .then(function (response) {
                    setRedirect(true)
                })
        } else {
            let employee = {
                vorname: firstName.current.value,
                nachname: lastName.current.value,
                geburtsdatum: birthDate.current.value,
                svnr: svNumber.current.value,
                tel: tel.current.value,
                email: email.current.value,
                funktion: func.current.value
            }

            if (svnr) {
                axios.put(api + `persons/${svnr}`, employee)
                    .then(function (response) {
                        setRedirect(true)
                    })
            } else {
                axios.post(api + 'persons', employee)
                    .then(function (response) {
                        setRedirect(true)
                    })
            }
        }
    }

    return (
        <div className="container text-center">
            {redirect ? <Navigate to="/employees/list" /> : null}
            <div className="container text-center">
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Vorname:</label>
                    <div class="col-sm-10">
                        <input type="text" ref={firstName} defaultValue={employee ? employee.vorname : ""} class="form-control" id="vorname" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Nachname:</label>
                    <div class="col-sm-10">
                        <input type="text" ref={lastName} defaultValue={employee ? employee.nachname : ""} class="form-control" id="nachname" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Geburtsdatum:</label>
                    <div class="col-sm-10">
                        <input type="date" ref={birthDate} defaultValue={employee ? employee.geburtsdatum : ""} class="form-control" id="geburtsdatum" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">SVNR:</label>
                    <div class="col-sm-10">
                        <input type="text" ref={svNumber} defaultValue={employee ? employee.svnr : ""} class="form-control" id="svnr" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Telefon:</label>
                    <div class="col-sm-10">
                        <input type="text" ref={tel} defaultValue={employee ? employee.tel : ""} class="form-control" id="tel" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">E-Mail:</label>
                    <div class="col-sm-10">
                        <input type="text" ref={email} defaultValue={employee ? employee.email : ""} class="form-control" id="email" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Funktion:</label>
                    <div class="col-sm-10">
                        <input type="text" ref={func} defaultValue={employee ? employee.funktion : ""} class="form-control" id="funktion" />
                    </div>
                </div>

                <button type="submit" class="m-3 btn btn-primary" onClick={e => submitEmployee()}>{svnr ? "Speichern" : "Hinzufügen"}</button>
                {svnr ?
                    <button type="submit" class="m-3 btn btn-primary" ref={del} onClick={() => submitEmployee("delete")}>Löschen</button>
                    : null
                }
            </div>
        </div >
    )
}
