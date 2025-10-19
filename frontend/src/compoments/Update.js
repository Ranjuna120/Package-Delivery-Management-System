import React, { useState } from "react";
import '../style/Comman css/style.css';
import axios from "axios";

function Update() {

    return (
        <div className="b">

            <div className="form-container">
                <h1>Update Form</h1>
                <form >

                 
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age:</label>
                        <input type="number" id="age" name="age" required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gpa">GPA:</label>
                        <input type="text" id="gender" name="gender" required />
                    </div>
                    <div className="form-group">
                        <button type="submit" >Submit</button>
                    </div>
                </form>
            </div>

        </div>
    );
}



export default Update;