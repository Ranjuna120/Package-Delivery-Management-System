import React, { useState, useEffect } from "react";
import axios from "axios";
import '../style/Comman css/table.css';

function Read() {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        function getStudents() {
            axios.get("http://localhost:8070/student/")
                .then((res) => {
                    setStudents(res.data);
                })
                .catch((err) => {
                    console.error(err.message);
                    alert("Error fetching data: " + err.message);
                });
        }
        getStudents();
    }, []);

    return (
        <div>
            <h2>Responsive Table with RWD-Table-Patterns</h2>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="table-responsive" data-pattern="priority-columns">
                            <table summary="This table shows student data" className="table table-bordered table-hover">
                                <caption className="text-center">Student Data Table</caption>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={index}>
                                            <td>{student.name}</td>
                                            <td>{student.age}</td>
                                            <td>{student.gender}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="3" className="text-center">Data retrieved from MongoDB</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Read;
