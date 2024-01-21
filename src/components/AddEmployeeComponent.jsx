import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import Profile1 from '../assests/profile-images/Ellipse -1.png';
import Profile2 from '../assests/profile-images/Ellipse -2.png';
import Profile3 from '../assests/profile-images/Ellipse -3.png';
import Profile4 from '../assests/profile-images/Ellipse -7.png';
import ReactSlider from 'react-slider';



const AddEmployeeComponent = () => {
    const [firstName,setfirstName] = useState('')
    const [lastName,setlastName] = useState('')
    const [emailId,setemailId] = useState('')
    const [gender,setGender] = useState()
    const [profilePic,setprofilePic] = useState('')
    const [salary, setSalary] = useState();
    const navigate = useNavigate();
    const {id} = useParams();


    const saveOrUpdateEmployee = (e) =>{
        e.preventDefault();
        console.log(id);

       const employee = {firstName,lastName,emailId,gender,profilePic,salary}
       console.log(employee);
      if(id){
        EmployeeService.updateEmployee(id,employee).then((response) =>{
            navigate('/employees')

        }).catch(error =>{
            console.log(error)
        })

      }else{
        EmployeeService.createEmployee(employee).then((response) =>{
            console.log(response.data)
            navigate('/employees')
           }).catch(error =>{
                console.log(error)
           })
      }
    }

    useEffect( () =>{
        EmployeeService.getEmployeeById(id).then((response) =>{
            setfirstName(response.data.firstName)
            setlastName(response.data.lastName)
            setemailId(response.data.emailId)
            setGender(response.data.gender)
            setprofilePic(response.data.profilePic)
        }).catch(error =>{
            console.log(error)
        })
    },[])

    const title = () =>{
        if(id){
            return <h2 className = "text-center">Update Employee</h2>
        }else{
            return <h2 className = "text-center">Add Employee</h2>
        }
    }

    const profileImages = [
        {url:Profile1, path: '../assests/profile-images/Ellipse -1.png', selected:false},
        {url:Profile2, path: '../assests/profile-images/Ellipse -2.png',selected:false},
        {url:Profile3, path: '../assests/profile-images/Ellipse -3.png',selected:false},
        {url:Profile4, path: '../assests/profile-images/Ellipse -7.png',selected:false}
    ]

    const handleReset = (e) => {
        e.preventDefault();
        setfirstName('')
        setlastName('')
        setemailId('')
        setGender()
        setprofilePic('')
        setSalary()
        alert("Form reset!");
      };

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        title()
                    }
                    <div className='card-body'>
                        <form>
                        <div className = "form-group mb-2">
                                    <label className = "form-label"> First Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter first name"
                                        name = "firstName"
                                        className = "form-control"
                                        value = {firstName}
                                        onChange = {(e) => setfirstName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Last Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter last name"
                                        name = "lastName"
                                        className = "form-control"
                                        value = {lastName}
                                        onChange = {(e) => setlastName(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <div className= "form-group mb-2" style={{ marginTop: "10px" }}>
                                    <label className = "form-label"> Gender :</label>
                                    <input type = "radio" name="gender" value={"Male"}  style={{ marginLeft: "8px" }} onChange={(e) => setGender(e.target.value)} />Male
                                    <input type = "radio" name="gender" value={"Female"} style={{ marginLeft: "9px" }} onChange={(e) => setGender(e.target.value)} />Female
                                </div>
                                <div  className="form-group mb-2"   style={{ display: "flex", flexWrap: "nowrap"}}>
                                    <label className = "form-label"> Profile :</label>
                                     {profileImages.map((image, index) => (
                                     <div key={index} className="profile-image-option" style={{ maxWidth: "150px" }}>
                                        <input
                                        style={{marginLeft:"10px"}}
                                        type="radio"
                                        name="profileImage"
                                        value={image.path}
                                        onChange={(e) => setprofilePic(e.target.value)}/>
                                        <img src={image.url} alt={`Profile picture ${index + 1}`} />
                                     </div>
                                     ))}
                                    </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email Id :</label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter email Id"
                                        name = "emailId"
                                        className = "form-control"
                                        value = {emailId}
                                        onChange = {(e) => setemailId(e.target.value)}
                                    >
                                    </input>
                        
                                    <div style={{marginTop:"15px"}}>
                                        <label htmlFor="salary">Salary:</label>
                                        <input
                                        style={{marginLeft:"10px"}}
                                        type="range"
                                        min={10000}
                                        max={100000}
                                        step={1000}
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}/>
                                         <span>{salary}</span>
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <button className="btn btn-success mr-2" onClick={(e) => saveOrUpdateEmployee(e)}>Submit</button>
                                        <Link to="/employees" className="btn btn-danger" style={{marginLeft:"10px"}}>Cancel</Link>
                                        <button variant="danger" type="reset" onClick={(e) =>handleReset(e)}>Reset</button>
                                    </div>
                                </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEmployeeComponent;
