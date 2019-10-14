import axios from 'axios';

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
      withCredentials: true
    });
  }

  signup = (firstname, surnames, phone, email, username, password, role) => {
    return this.service.post('/signup', {firstname, surnames, phone, email, username, password, role})
    .then(response => response.data)
  }

  login = (username, password) => {
    return this.service.post('/login', {username, password})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/currentUser',)
    .then(response => response.data)
  }

  updateprofile = (phone, email) => {
    return this.service.post('/update/:id',{phone, email})
    .then(response => response.data)
  }

  logout = () => {
    return this.service.get('/logout',)
    .then(response => response.data)
  }
}

export default AuthService;