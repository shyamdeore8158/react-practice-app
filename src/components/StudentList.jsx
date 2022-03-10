import { useContext } from "react"
import StudentContext from "../context/StudentContext";
import Student from "./Student";
import Button from "./shared/Button";
function StudentList()
{
    const {students,updateStudent,deleteStudent} = useContext(StudentContext);
    return(
        <div className="container">
             <header>
                <div className="container">
                    <h2>Student List</h2>
                </div>
              </header>
            <table className="table table-striped border">
                <thead>
                    <tr>               
                        <th>Name</th>
                        <th>Roll</th>
                        <th>Gender</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student)=>
                    <tr key={student.id}>
                        <td>{student.studName}</td>
                        <td>{student.roll}</td>
                        <td>{student.gender}</td>
                        <td><Button classText="btn btn-primary" onClick={()=>{updateStudent(student.id,student)}}>Edit</Button></td>
                        <td><Button classText="btn btn-success" onClick={()=>{deleteStudent(student.id)}}>Delete</Button></td>                       
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default StudentList