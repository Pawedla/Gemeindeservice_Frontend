import React, { useState, useEffect } from 'react';
import {
    Link,
    useParams
} from "react-router-dom";
export default function Employee() {

    let api = "https://gemeindeservice-backend.herokuapp.com/"
    let { id } = useParams();
    const [decision, setDecision] = useState();
    const [meeting, setMeeting] = useState();

    useEffect(() => {
        fetch(api + "beschluss")
            .then(response => response.json())
            .then(data => {
                data.forEach(des => {
                    if (des.id == id) {
                        setDecision(des)
                        fetch(api + `sitzungen/${des.sitzungID}`)
                            .then(resMeeting => resMeeting.json())
                            .then(dataMeeting => {
                                setMeeting(dataMeeting)
                            })
                    }
                })
            })
    }, []);


    return (
        <div class="container text-center">
            <div class="container text-center">
                <div class="container">
                    <h5 align="center">Beschlussdaten</h5>
                    <br />
                    <li class="list-group-item"><Link to={meeting ? `../../meetings/meeting/${meeting.id}` : ""}>{meeting ? meeting.datum : ""}</Link> </li>
                    <li class="list-group-item">{decision ? decision.text : ""} </li>
                    <Link to={`../edit/${id}`}>
                        <button type="submit" name="create" class="m-3 btn btn-primary">Bearbeiten</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
