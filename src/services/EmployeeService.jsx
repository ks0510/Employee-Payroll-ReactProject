import axios from "axios";

const base_URL = 'http://localhost:8080/api/v1/employees';

class EmployeeService{

    getAllEMployees(){
        return axios.get(base_URL)
    }

    createEmployee(employee){
        return axios.post(base_URL + '/add',employee)
    }

    getEmployeeById(employeeId){
        return axios.get(base_URL +'/'+employeeId)
    }

    updateEmployee(employeeId,employee){
        return axios.put(base_URL +'/'+employeeId,employee)
    }

    deleteEmployee(employeeId){
        return axios.delete(base_URL+'/'+employeeId)
    }
}

export default new EmployeeService();