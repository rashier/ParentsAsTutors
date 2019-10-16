import axios from 'axios';

class RouteService {
  constructor() {
    this.service = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      withCredentials: true
    });
  }

  addStudent = (studentname, dni, grade, school, emailparent) => {
    return this.service.post('/addstudent', {studentname, dni, grade, school, emailparent})
    .then(response => response.data)
  }

  updatestudent = (id, grade, school) => {
    return this.service.post('/updatestudent', {id, grade, school})
    .then(response => response.data)
  }

  studentsUser=()=>{
    return this.service.get('/children')
    .then(sons => {
      return sons.data
    })
  }
}

export default RouteService;