import { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { useNavigate } from 'react-router';
import { isEmail } from "validator"
import AuthService from "../services/auth-service";

function Login(props) {
    const navigate = useNavigate()
    const [userForm,setUserForm] = useState({
        username : '',
        password : ''
    })
    let {username , password} = userForm
    const [message, setMessage] = useState("");
    const form = useRef();
    const checkBtn = useRef();

    const handleChange = (e)=>{
        console.log(e.target.value)
       setUserForm({
        ...userForm, [e.target.name]: e.target.value
       })
    }

    const required = value =>{
        if(!value)
        {
            return (
                <div className="alert alert-warning" role="alert">
                    This field is required
                </div>
            )
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log(1)
        form.current.validateAll();
        console.log(checkBtn.current.context._errors.length)
       
        if (checkBtn.current.context._errors.length === 0) {
            
            AuthService.login(username ,password).then(
                () => {
                  navigate("/profile");
                  window.location.reload();
                },
                (error)=>{
                  console.log(error.response.data)
                  setMessage(error.response.data.error+": "+error.response.data.message);
                })
          } else {
            setMessage("Not Sign in");
          }
    }
    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form ref={form} onSubmit={handleSubmit} autocomplete="off">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <Input type="text" className="form-control" name="username" 
                             value={username} onChange={handleChange}
                             validations ={[required]}
                             />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input type="text" className="form-control" name="password" 
                        value={password} onChange={handleChange} validations ={[required]}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Login</button>
                    </div>
                    {message && (
                        <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>

    )
}

export default Login