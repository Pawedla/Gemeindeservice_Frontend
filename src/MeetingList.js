import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {

    Link
} from "react-router-dom";

export default function MeetingList() {

    let api = "https://gemeindeservice-backend.herokuapp.com/"

    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        fetch(api + "sitzungen")
            .then(response => response.json())
            .then(data => setMeetings(data));
    }, []);


    return (

        <div>
            <div className="container text-center">
                <div className="container text-center">
                    <div className="container">
                        <h5 align="center">Sitzungsliste</h5>
                        <br />
                        <div className="table-responsive">
                            <table id="data" className="table table-striped table-bordered">
                                <tbody className='table-striped'>
                                    <tr>
                                        <th>Datum</th>
                                    </tr>
                                    {
                                        meetings.map(meeting => {
                                            return (
                                                <tr>
                                                    <td> <Link to={`../meeting/${meeting.id}`}>{meeting.datum}</Link></td>
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
