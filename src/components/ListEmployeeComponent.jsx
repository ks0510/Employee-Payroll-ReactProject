import React,{useEffect, useState} from "react";
import EmployeeService from "../services/EmployeeService";
import { Link } from "react-router-dom";
import Profile1 from "../assests/profile-images/Ellipse -1.png";
import Profile2 from '../assests/profile-images/Ellipse -2.png';
import Profile3 from '../assests/profile-images/Ellipse -3.png';
import Profile4 from '../assests/profile-images/Ellipse -7.png';

const ListEmployeeComponent = () =>{

    const[employees,setEmployees] = useState([])

    useEffect( () => {
        getAllEMployees();

    },[]
    )

    const getAllEMployees = () =>{

        EmployeeService.getAllEMployees().then((response) =>{
            setEmployees(response.data)
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })

    }

    const deleteEmployee = (employeeId) =>{
        EmployeeService.deleteEmployee(employeeId).then((response) =>{
            getAllEMployees();

        }).catch(error =>{
            console.log(error)
        })
    }

    return(
        <div className = "container">
        <h2 className = "text-center"> List Employees </h2>
        <Link to= "/add-employee" className="btn btn-primary mb-2">Add Employee</Link>
        <table className="table table-bordered table-striped">
            <thead>
                <th>Profile </th>
                <th>First Name </th>
                <th>Last Name </th>
                <th>Email Id </th>
                <th>Gender </th>
                <th>Salary</th>
                <th> Actions </th>
            </thead>
            <tbody>
                {
                    employees.map(
                        employee =>
                        <tr key = {employee.id}> 
                            <td> 
                            {<img src=
                                        {employee.profilePic === '../assests/profile-images/Ellipse -1.png' ? Profile1 :
                                        employee.profilePic === '../assests/profile-images/Ellipse -2.png' ? Profile2 :
                                        employee.profilePic=== '../assests/profile-images/Ellipse -3.png' ? Profile3 :
                                                    Profile4
                                        } alt="" />}
                            </td>
                            <td> {employee.firstName} </td>
                            <td> {employee.lastName} </td>
                            <td> {employee.emailId} </td>
                            <td> {employee.gender} </td>
                            <td> {employee.salary} </td>
                            <td>
                                <Link className="btn btn-info" to={`/edit-employee/${employee.id}`}>Update</Link>
                                <button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}
                                style={{marginLeft:"10px"}}>Delete</button>

                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
    )
}

export default ListEmployeeComponent;