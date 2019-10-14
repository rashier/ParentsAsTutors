import axios from 'axios';

class RouteService {
  constructor() {
    this.service = axios.create({
      baseURL: 'http://localhost:3010/',
      withCredentials: true
    });
  }

  addStudent = (studentname, dni, grade, school, emailparent) => {
    return this.service.post('/addstudent', {studentname, dni, grade, school, emailparent})
    .then(response => response.data)
  }
}

export default RouteService;