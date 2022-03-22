import { useState, useContext, useEffect } from "react"
import StudentContext from "../context/StudentContext";
import { v4 as uuid } from "uuid"
import Header from "./Header";

import Select from "react-select"

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
    const [category,setCategory] = useState("")
    const [subCategory,setSubCategory] = useState("")

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
      

    // loading update data

    useEffect(() => {
        console.log("useEffects", editable.edit)
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

    const handleCategoryChange = (e) => {
        const value = e.value
        setCategory(value)
        console.log(category)
    }

    const handleSubCategoryChange = (e) => {
        const value = e.value
        setSubCategory(value)
        console.log(subCategory)
    }

    const submitForm = (e) => {
        e.preventDefault();
        // console.log(formData)
        console.log(subCategory.value , category.value)
        // if (editable.edit === true) {
        //     actualUpdate(editable.dbStudent.id, formData);
        // }
        // else {
        //     console.log("Else", formData)
        //     // formData.id = uuid();
        //     addStudent(formData)
        //     setMessage("Record created successfully")
        // }
    }

    function logChange(val) {
        console.log("Selected: " + val);
      }

    return (
        <div className="container">
            <Header text="TO Log Entry" />
            <div className="card mt-1">
                <div className="card-body">
                    <form onSubmit={submitForm}>                       
                        <div className="form-group">
                        <Select 
                           placeholder="Category"
                           options={options}
                           onChange={(value)=>setCategory(value)}
                            />
                        </div>
                        <div className="form-group">
                        <Select 
                           placeholder="Sub Category"
                           options={options}
                           onChange={(value)=>setSubCategory(value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Category"
                                value={studName}
                                onChange={handleFieldChange}
                                name="studName"
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Sub-Category"
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
                {message && (
                    <div className="alert alert-success" >{message}</div>
                )}

            </div>
        </div>
    )
}

export default Student