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
  
  studentsUser=()=>{
    return this.service.get('/children')
    .then(sons => {
      return sons.data
    })
  }

  updatestudent = (id, grade, school) => {
    return this.service.post('/updatestudent', {id, grade, school})
    .then(response => response.data)
  }

  addActivity = (id, subject, title, activity, video, imgPath) => {
    return this.service.post('/addactivity', {id, subject, title, activity, video, imgPath})
    .then(response => response.data)
  }
  
  activitiesStudent=(idStudent)=>{
    return this.service.get('/activitiesStudent', idStudent)
    .then(activities => {
      return activities.data
    })
  }

  handleUpload(theFile) {
    return this.service
      .post("/upload", theFile)
      .then(res => res.data)
      .catch(err => console.log(err));
  }

  searchYoutube=(query)=>{
    return this.service.get(`/searchyt/${query}`)
    .then(resultSearch => {
      return resultSearch.data.items
    })
  }

  autocomplete=(query)=>{
    return this.service.get(`/searchAutocomplete/${query}`)
    .then(resultSearch => {
      return resultSearch.data
    })
  }
}

export default RouteService;