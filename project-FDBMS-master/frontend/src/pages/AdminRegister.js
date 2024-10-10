import React, { useState } from "react";
import axios from "axios";
import Vcet from "../images/logo.png";
import "../styles/register.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminRegister() {
    const [id, setId] = useState('');
    const [fname, setFname] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [dep, setDep] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const regdata = { id, fname, email, pass, dep, address, city, state, phone };
        const errors = validate(regdata);
        setError(errors);
    
        if (Object.keys(errors).length === 0) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/adminregister`, regdata);
                alert(response.data.message || "Successfully registered");
                console.log(response.data);
    
                // Clear form fields
                setId('');
                setFname('');
                setEmail('');
                setPass('');
                setDep('');
                setAddress('');
                setCity('');
                setState('');
                setPhone('');
                setError({});
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error("Error:", error.response.data);
                    alert(error.response.data.message || "Error registering user");
                } else if (error.request) {
                    // No response was received
                    console.error("Error:", error.request);
                    alert("No response received from server");
                } else {
                    // Something else caused the error
                    console.error("Error:", error.message);
                    alert("Error registering user");
                }
            }
        } else {
            alert("Invalid registration");
        }
    };
    

    function validate(data) {
        const errors = {};
        if (!/^[a-zA-Z0-9._%+-]+@gmail.com$/.test(data.email)) {
            errors.email = "Invalid email ID";
        }
        if (!data.pass || data.pass.length < 8) {
            errors.pass = "Password length must be at least 8 characters";
        } else if (!/^[a-zA-Z0-9*#]+$/.test(data.pass)) {
            errors.pass = "Invalid password";
        }
        if (!data.phone || data.phone.length !== 10) {
            errors.phone = "Phone number must be 10 digits";
        }
        if (!data.id) {
            errors.id = "ID is required";
        }
        if (!/^[A-Za-z]+$/.test(data.fname)) {
            errors.fname = "Invalid name";
        }
        if (!data.dep) {
            errors.dep = "Select any one of the departments";
        }
        return errors;
    }

    return (
        <div id="parent">
            <form className="forms" onSubmit={handleSubmit}>
                <div>
                    <img src={Vcet} alt="Vcet Logo" />
                </div>
                <div>
                    <h1>Registration Form</h1>
                </div>
                <div>
                    <p id="para">Faculty Management</p>
                </div>
                <div className="ip">
                    <input
                        type="text"
                        name="id"
                        placeholder="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    {error.id && <p className="error">{error.id}</p>}
                    <input
                        type="text"
                        name="fname"
                        placeholder="FULLNAME"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                    />
                    {error.fname && <p className="error">{error.fname}</p>}
                    <input
                        type="text"
                        name="email"
                        placeholder="MAIL ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error.email && <p className="error">{error.email}</p>}
                    <input
                        type="password"
                        name="pass"
                        placeholder="PASSWORD"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    {error.pass && <p className="error">{error.pass}</p>}
                    <select
                        id="sel"
                        name="dep"
                        value={dep}
                        onChange={(e) => setDep(e.target.value)}
                    >
                        <option value="" id="def" className="font-weight-bold" selected disabled hidden>
                            <b>SELECT DEPARTMENT</b>
                        </option>
                        <option value="cse">CSE</option>
                        <option value="ece">ECE</option>
                        <option value="mechanical">MECH</option>
                        <option value="eee">EEE</option>
                        <option value="civil">CIVIL</option>
                        <option value="ai&ds">AI&DS</option>
                        <option value="it">IT</option>
                    </select>
                    {error.dep && <p className="error">{error.dep}</p>}
                    <input
                        type="text"
                        name="address"
                        placeholder="ADDRESS"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="CITY"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="STATE"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="PHONE"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {error.phone && <p className="error">{error.phone}</p>}
                </div>
                <div>
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

export default AdminRegister;