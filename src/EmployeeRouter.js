import React from 'react'
import EmployeeList from './EmployeeList';
import EmployeeEdit from './EmployeeEdit';
import {
    Routes,
    Route,
} from "react-router-dom";
import Employee from './Employee';

export default function EmployeeRouter() {
    return (
        <Routes>
            <Route path="/empl/:svnr" element={<Employee />} />
            <Route path="/list" element={<EmployeeList />} />
            <Route path="/add" element={<EmployeeEdit />} />
            <Route path="/edit/:svnr" element={<EmployeeEdit />} />
        </Routes>
    )
}
