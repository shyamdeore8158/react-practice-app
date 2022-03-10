import { createContext, useState } from "react";
import StudentData from "../components/StundentData";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
    const [students, setStudents] = useState(StudentData);
    const [editable, setEditable] = useState({
        dbStudent: {},
        edit: false
    })

    const addStudent = (student) => {
        console.log("Context", student)
        setStudents([student, ...students])
    }
    const updateStudent = (id, updateStudentObj) => {
        setEditable({
            edit: true,
            dbStudent: updateStudentObj
        })
    }

    const actualUpdate = (id, dbStudent) => {
        setStudents(students.map((student) => student.id === id ? dbStudent : student))
    }
    const deleteStudent = (id) => {
        console.log("deleteStudent", id)
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