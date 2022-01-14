
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Navigate,
    useParams
} from "react-router-dom";
export default function ParticipantsEdit() {

    let api = "https://gemeindeservice-backend.herokuapp.com/"


    let { id } = useParams();
    const [employees, setEmployees] = useState([]);
    const [addedParticipants, setAddedParticipants] = useState([]);
    const [initialSavedParticipants, setInitialSavedParticipants] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const selectedParticipant = useRef()

    const addParticipant = () => {
        let newParticipants = [...addedParticipants]
        let partToAdd

        employees.forEach(empl => {
            if (empl.svnr == selectedParticipant.current.value) {
                partToAdd = empl
            }
        });
        newParticipants.push(partToAdd)
        setAddedParticipants(newParticipants)
        selectedParticipant.current.value = ""
    }

    const deleteParticipants = (part) => {
        let newParticipants = [...addedParticipants]
        newParticipants.splice(newParticipants.indexOf(part), 1);
        setAddedParticipants(newParticipants)
    }

    const saveParticipant = () => {
        let deletePromise = []
        initialSavedParticipants.forEach(oldParticipant => {
            deletePromise.push(axios.delete(api + `teilnehmer/${oldParticipant.svnr}/${id}`))
        });
        Promise.all(deletePromise).then(responses => {
            let promises = []
            addedParticipants.forEach(p => {
                let participant = { svnr: p.svnr, sitzungID: id }
                promises.push(axios.post(api + 'teilnehmer', participant))
            });
            Promise.all(promises).then(responses => {
                setRedirect(true)
            })
        })
    }


    useEffect(() => {
        fetch(api + "persons")
            .then(response => response.json())
            .then(data => {
                setEmployees(data)
                fetch(api + `teilnehmer/${id}`)
                    .then(response1 => response1.json())
                    .then(data1 => {
                        let savedParticipants = []
                        data1.forEach(participant => {
                            data.forEach(empl => {
                                if (empl.svnr === participant.svnr) {
                                    savedParticipants.push(empl)
                                }
                            });
                        });
                        setAddedParticipants(savedParticipants)
                        setInitialSavedParticipants(savedParticipants)
                    })
            })
    }, []);


    return (
        <div class="container text-center">
            {redirect ? <Navigate to={`/meetings/meeting/${id}`} /> : null}
            <div class="container text-center">
                <div class="container">
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Mitarbeiter:</label>
                        <div class="col-sm-10">
                            <select ref={selectedParticipant} class="form-control" aria-label="Default select example">
                                <option value="" disabled selected>Teilnehmer wählen</option>
                                {
                                    employees.map(employee => {
                                        return (
                                            <option value={employee.svnr}>{employee.vorname + " " + employee.nachname}</option>
                                        )
                                    })
                                }
                            </select>
                            <button type="submit" class="m-3 btn btn-primary" onClick={() => addParticipant("delete")}>Hinzufügen</button>
                        </div>
                        {
                            addedParticipants.map(p => {
                                return (
                                    <div class=" col-sm-10">
                                        <label>{p.vorname + " " + p.nachname}</label>
                                        <button type="submit" class="m-3 btn btn-primary" onClick={() => deleteParticipants(p)}>Löschen</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button type="submit" class="m-3 btn btn-primary" onClick={() => saveParticipant()}>Speichern</button>
                </div>
            </div>
        </div>
    )
}
