import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
    Navigate,
    useParams
} from "react-router-dom";

export default function MeetingEdit() {

    let api = "https://gemeindeservice-backend.herokuapp.com/"

    const [meeting, setMeeting] = useState();
    const [redirect, setRedirect] = useState(false);

    let { id } = useParams();
    const del = useRef()
    const date = useRef();
    const desc = useRef();

    useEffect(() => {

        if (id) {
            fetch(api + `sitzungen/${id}`)
                .then(response => response.json())
                .then(data => setMeeting(data));
        }
    }, []);

    const submitMeeting = (e) => {
        if (e && e == "delete") {

            axios.delete(api + `sitzungen/${id}`)
                .then(function (response) {
                    setRedirect(true)
                })

        } else {
            if (id) {
                let sitzung = {
                    datum: date.current.value,
                    beschreibung: desc.current.value,
                }
                axios.put(api + `sitzungen/${id}`, sitzung)
                    .then(function (response) {
                        setRedirect(true)
                    })
            } else {
                let sitzung = {
                    datum: date.current.value,
                    beschreibung: desc.current.value,
                    id: uuidv4()
                }
                axios.post(api + 'sitzungen', sitzung)
                    .then(function (response) {
                        setRedirect(true)
                    })

            }
        }
    }

    return (
        <div className="container text-center">
            {redirect ? <Navigate to="/meetings/list" /> : null}
            <div className="container text-center">
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Datum:</label>
                    <div class="col-sm-10">
                        <input type="date" ref={date} defaultValue={meeting ? meeting.datum : ""} class="form-control" id="geburtsdatum" />
                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Beschreibung:</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" ref={desc} name="beschreibung" cols="100" rows="5" defaultValue={meeting ? meeting.beschreibung : ""}></textarea>
                    </div>
                </div>
                <button type="submit" class="m-3 btn btn-primary" onClick={e => submitMeeting()}>{id ? "Speichern" : "Hinzufügen"}</button>
                {id ?
                    <button type="submit" class="m-3 btn btn-primary" ref={del} onClick={() => submitMeeting("delete")}>Löschen</button>
                    : null
                }
            </div >
        </div>
    )
}
