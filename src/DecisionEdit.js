import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {
    Navigate,
    useParams
} from "react-router-dom";

export default function DecisionEdit() {

    let api = "https://gemeindeservice-backend.herokuapp.com/"


    const [decision, setDecision] = useState();
    const [redirect, setRedirect] = useState(false);
    const [meetings, setMeetings] = useState([]);

    let { id } = useParams();
    const del = useRef()
    const meeting = useRef();
    const desc = useRef();

    useEffect(() => {
        if (id) {
            fetch(api + "beschluss")
                .then(response => response.json())
                .then(data =>
                    data.forEach(des => {
                        if (des.id == id) {
                            setDecision(des)
                        }
                    }))
        }
        fetch(api + "sitzungen")
            .then(response => response.json())
            .then(data => setMeetings(data));
    }, []);

    const submitDecision = (e) => {
        if (e && e == "delete") {

            axios.delete(api + `beschluss/${id}`)
                .then(function (response) {
                    setRedirect(true)
                })
        } else {
            if (id) {

                let decision = {
                    text: desc.current.value,
                    sitzungID: meeting.current.value
                }
                axios.put(api + `beschluss/${id}`, decision)
                    .then(function (response) {
                        setRedirect(true)
                    })
            } else {
                let decision = {
                    text: desc.current.value,
                    sitzungID: meeting.current.value,
                    id: uuidv4()
                }
                axios.post(api + "beschluss", decision)
                    .then(function (response) {
                        setRedirect(true)
                    })
            }
        }
    }

    return (
        <div className="container text-center">
            {redirect ? <Navigate to="/decisions/list" /> : null}
            <div className="container text-center">
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Sitzung:</label>
                    <div class="col-sm-10">
                        <select ref={meeting} defaultValue={decision ? decision.sitzungID : null} class="form-control" aria-label="Default select example">
                            {id ?
                                null
                                :
                                <option value={decision ? decision.sitzungID : ""} disabled selected>Sitzung wählen</option>
                            }
                            {
                                meetings.map(meeting => {
                                    if (decision && decision.sitzungID === meeting.id) {
                                        return (
                                            <option selected value={meeting.id}>{meeting.datum}</option>
                                        )
                                    } else {
                                        return (
                                            <option value={meeting.id}>{meeting.datum}</option>

                                        )
                                    }

                                })
                            }
                        </select>

                    </div>
                </div>
                <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Beschreibung:</label>
                    <div class="col-sm-10">
                        <input type="text" ref={desc} defaultValue={decision ? decision.text : ""} class="form-control" id="nachname" />
                    </div>
                </div>

                <button type="submit" class="m-3 btn btn-primary" onClick={e => submitDecision()}>{id ? "Speichern" : "Hinzufügen"}</button>
                {id ?
                    <button type="submit" class="m-3 btn btn-primary" ref={del} onClick={() => submitDecision("delete")}>Löschen</button>
                    : null
                }
            </div>

        </div >
    )
}
