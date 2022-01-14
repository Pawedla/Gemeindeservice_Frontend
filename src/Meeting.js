
import React, { useState, useEffect } from 'react';
import {
    Link,
    useParams
} from "react-router-dom";

export default function Meeting() {

    let api = "https://gemeindeservice-backend.herokuapp.com/"


    let { id } = useParams();
    const [meeting, setMeeting] = useState();
    const [participants, setParticipants] = useState([]);
    const [decisions, setDesicions] = useState([]);

    useEffect(() => {
        fetch(api + `sitzungen/${id}`)
            .then(response => response.json())
            .then(data => setMeeting(data));

        fetch(api + `teilnehmer/${id}`)
            .then(response => response.json())
            .then(data => setParticipants(data));

        fetch(api + `beschluss/${id}`)
            .then(response => response.json())
            .then(data => setDesicions(data));
    }, []);

    return (
        <div class="container text-center">
            <div class="container text-center">
                <div class="container">
                    <h5 align="center">Mitarbeiterdaten</h5>
                    <br />
                    <li class="list-group-item">{meeting ? meeting.datum : ""} </li>
                    <li class="list-group-item">{meeting ? meeting.beschreibung : ""}</li>
                    <Link to={`../edit/${id}`}>
                        <button type="submit" name="create" class="m-3 btn btn-primary">Bearbeiten</button>
                    </Link>
                    <div className="container">
                        <h5 align="center" className="mt-3">Teilnehmerliste</h5>
                        <br />
                        <div className="table-responsive">
                            <table id="data" className="table table-striped table-bordered">
                                <tbody className='table-striped'>
                                    <tr>
                                        <th>SVNR</th>
                                    </tr>
                                    {
                                        participants.map(participant => {
                                            return (
                                                <tr>
                                                    <td> <Link to={`../../employees/empl/${participant.svnr}`}>{participant.svnr}</Link></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <Link to={`../addParticipants/${id}`}>
                            <button type="submit" name="create" class="m-3 btn btn-primary">Teilnehmer hinzufügen</button>
                        </Link>
                        <h5 align="center" className="mt-3">Beschlüsse</h5>
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
                                                    <td> <Link to={`../../decisions/decision/${decision.id}`}>{decision.text}</Link></td>

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
