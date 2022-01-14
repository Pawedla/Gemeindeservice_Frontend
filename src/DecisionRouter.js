import React from 'react'
import Decision from './Decision';
import ParticipantsEdit from './ParticipantsEdit';
import DecisionList from './DecisionList';
import DecisionEdit from './DecisionEdit';

import {
    Routes,
    Route,
} from "react-router-dom";

export default function DecisionRouter() {
    return (
        <Routes>
            <Route path="/decision/:id" element={<Decision />} />
            <Route path="/list" element={<DecisionList />} />
            <Route path="/add" element={<DecisionEdit />} />
            <Route path="/edit/:id" element={<DecisionEdit />} />
            <Route path="/addParticipants/:id" element={<ParticipantsEdit />} />
        </Routes>


    )
}
