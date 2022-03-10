import { createContext, useEffect, useState } from "react";
import StudentData from "../components/StundentData";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState([]);
    const [editable, setEditable] = useState({
        dbStudent: {},
        edit: false
    })

 
    useEffect(()=>{
       fetchStudentData()
    },[])

    const fetchStudentData = async() =>{
        const response = await fetch("http://localhost:5000/students");
        const data = await response.json();
        console.log("FetchStudentData",data)
        setStudents(data)
    }

    const addStudent = async (student) => {
        console.log(student)
        const response = await fetch("http://localhost:5000/students",{
            "method" : "post",
            headers:{
                "CONTENT-TYPE": "application/json"
            },
            body : JSON.stringify(student)
        })
        const data = await response.json();
        setStudents([data, ...students])
    }
    const updateStudent = (id, updateStudentObj) => {
        setEditable({
            edit: true,
            dbStudent: updateStudentObj
        })
    }

    const actualUpdate = async (id, dbStudent) => {
        const response = await fetch(`http://localhost:5000/students/${id}`,{
            "method" : "put",
            headers:{
                "CONTENT-TYPE": "application/json"
            },
            body : JSON.stringify(dbStudent)
        })
        const data = await response.json();
        setStudents(students.map((student) => student.id === id ? dbStudent : student))
        fetchStudentData()
    }
    const deleteStudent = async (id) => {
        console.log("deleteStudent", id)
        if (window.confirm('Are you sure you want to delete?')) {
            await fetch(`http://localhost:5000/students/${id}`, { method: 'DELETE' })
        }
        setStudents(students.filter((stud) => stud.id !== id))
    }

    return <StudentContext.Provider value={{
        students,
        addStudent,
        updateStudent,
        editable,
        actualUpdate,
        deleteStudent
    }}>
        {children}
    </StudentContext.Provider>
}

export default StudentContext