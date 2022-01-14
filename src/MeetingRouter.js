import React from 'react'
import MeetingList from './MeetingList';
import MeetingEdit from './MeetingEdit';
import Meeting from './Meeting';
import ParticipantsEdit from './ParticipantsEdit';
import {
    Routes,
    Route,
} from "react-router-dom";

export default function MeetingRouter() {
    return (
        <Routes>
            <Route path="/meeting/:id" element={<Meeting />} />
            <Route path="/list" element={<MeetingList />} />
            <Route path="/add" element={<MeetingEdit />} />
            <Route path="/edit/:id" element={<MeetingEdit />} />
            <Route path="/addParticipants/:id" element={<ParticipantsEdit />} />
        </Routes>
    )
}
