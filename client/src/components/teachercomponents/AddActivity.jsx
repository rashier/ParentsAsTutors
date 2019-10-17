import React, { Component } from "react";
import { Link } from "react-router-dom";
import RouteServices from "../../services/RouteService";

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultQuery: [],
      query: "",
      students: [],
      studencode: "",
      subject: "",
      title: "",
      activity: "",
      video: "",
      imgPath: "",
      autoCompleteResults:[]
    };
    this.route = new RouteServices();
  }

  componentDidMount() {
    this.route.studentsUser().then(students => {
      this.setState({
        ...this.state,
        students: students.user.alumni
      });
    });
  }

  addNewActivity = event => {
    event.preventDefault();
    const studentcode = this.state.selectStudent._id;
    const subject = this.state.subject;
    const title = this.state.title;
    const activity = this.state.activity;
    const video = this.state.video;
    const imgPath = this.state.imgPath;

    this.route
      .addActivity(studentcode, subject, title, activity, video, imgPath)
      .then(() => {
        this.setState({
          studentcode: "",
          subject: "",
          title: "",
          activity: "",
          video: "",
          imgPath: ""
        });
      })
      .catch(error => console.log(error));
  };

  searchYoutube = event => {
    event.preventDefault();
    const query = this.state.query;

    this.route
      .searchYoutube(query)
      .then(result => {
        this.setState({
          resultQuery: result
        });
      })
      .catch(error => console.log(error));
  };

  studentChange = event => {
    const { value } = event.target;
    this.setState({
      selectStudent: this.state.students.filter(
        student => student._id === value
      )[0]
    });
  };

  handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    this.route
      .handleUpload(uploadData)
      .then(response => {
        this.setState({
          imgPath: response.secure_url
        });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    if(!value==""){
      this.route.autocomplete(value)
      .then(result=>
        this.setState({
          autoCompleteResults: result[1]
        }))
    }
    this.setState({ [name]: value });
  };

  checkToSend() {
    const ste = this.state;
    if (
      !ste.subject ||
      !ste.title ||
      !ste.activity ||
      !ste.video ||
      !ste.imgPath
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    console.log(this.state.autoCompleteResults)

    return (
      <React.Fragment>
        <div className="teacher-container">
          <h1>For add new activity please complete this form:</h1>
          <div className="teacher-adds-container">
            <form onSubmit={this.addNewActivity}>
              <div className="teacher-inputs">
                <div className="teacher-label-container">
                  <label className="teacher-label">Subject:</label>
                  <label className="teacher-label">Titulo:</label>
                  <label className="teacher-label">Estudiante:</label>
                  <label className="teacher-label">Description activity:</label>
                  <label className="teacher-label">Upload the image:</label>
                  <label className="teacher-label">
                    Search Video in Youtube:
                  </label>
                </div>
                <div className="teacher-label-container">
                  <input className="teacher-input" type="text" name="subject" placeholder="Religion" onChange={e => this.handleChange(e)} />
                  <input className="teacher-input" type="text" name="title" placeholder="Tablas de multiplicar" onChange={e => this.handleChange(e)} />
                  <select defaultValue={"DEFAULT"} onChange={e => this.studentChange(e)}>
                    <option disabled value="DEFAULT" placeholder="selecta student" ></option>
                    {this.state.students.map(student => (
                      <option key={student._id} value={student._id}>
                        {student.studentname}
                      </option>
                    ))}
                  </select>
                  <input className="teacher-input" type="text" name="activity" placeholder="The student have adding..." onChange={e => this.handleChange(e)} />
                  <input className="file-input" type="file" name="imageUrl" onChange={e => this.handleFileUpload(e)} />
                  
                  
                  
                  <>
                  <input className="teacher-input" list="data" type="text" name="query" placeholder="eg. adding and subtracting integers" onChange={e => this.handleChange(e)} />

                  <datalist id="data">
                      {this.state.autoCompleteResults.map((item, key) =>
                        <option key={key} value={item} />
                      )}
                  </datalist>
                  </>



                  <button onClick={this.searchYoutube}>Search Video</button>
                  <button disabled={this.checkToSend()}>Add new</button>
                </div>
              </div>
            </form>
          </div>

            {this.state.resultQuery.map((result, idx) => (
              <div>
              <iframe id="player" type="text/html" width="320" height="180" src={"http://www.youtube.com/embed/"+result.id.videoId} frameBorder="0" ></iframe>
              <button>Select Video</button>
              <h1>{result.snippet.title}</h1>
              <p>{result.snippet.description}</p>
              </div>
            ))}
          
          <Link to="/profile">Back</Link>
        </div>
      </React.Fragment>
    );
  }
}

export default AddActivity;
