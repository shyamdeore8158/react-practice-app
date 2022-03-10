import { useState, useContext, useEffect } from "react"
import StudentContext from "../context/StudentContext";
import { v4 as uuid } from "uuid"

function Student() {

    const [formData, setFormdata] = useState({
        studName: '',
        roll: '',
        gender: ''
    });
    const [selectedOption, setSelectedOption] = useState('')
    const [message, setMessage] = useState('')
    const [disabled, setDisabled] = useState(false)
    let { studName, roll, gender } = formData
    const { addStudent, editable, actualUpdate } = useContext(StudentContext);

    // loading update data

    useEffect(() => {
        console.log("useEffects",editable.edit)
        if (editable.edit === true) {
            setFormdata({
                studName: editable.dbStudent.studName,
                roll: editable.dbStudent.roll,
                gender: editable.dbStudent.gender
            })
            setSelectedOption(editable.dbStudent.gender)
        }
    }, [editable])

    const handleFieldChange = (e) => {
        setFormdata({
            ...formData, [e.target.name]: e.target.value
        })
        setSelectedOption(e.target.value);
    }
    const submitForm = (e) => {
        e.preventDefault();
       // console.log(formData)
        if (editable.edit === true) {
            actualUpdate(editable.dbStudent.id, formData);
        }
        else {
            console.log("Else",formData)
           // formData.id = uuid();
            addStudent(formData)
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">Student Entry Form</div>
                <div className="card-body">
                    <form onSubmit={submitForm}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Student Name"
                                value={studName}
                                onChange={handleFieldChange}
                                name="studName"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Roll no"
                                value={roll}
                                onChange={handleFieldChange}
                                name="roll"
                            />
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                value="Male"
                                onChange={handleFieldChange}
                                checked={selectedOption === "Male"}
                                name="gender"
                            />
                            <label className="form-check-label">
                                Male
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                value="Female"
                                onChange={handleFieldChange}
                                checked={selectedOption === "Female"}
                                name="gender"
                            />
                            <label className="form-check-label">
                                Female
                            </label>
                        </div>
                        <button className="btn btn-primary" disabled={disabled}>Save</button>
                    </form>
                </div>
                <div className="card-footer">
                    {message && <p className="alert alert-warning" >{message}</p>}
                </div>

            </div>
        </div>
    )
}

export default Student