import React, { Component } from "react";
import RouteServices from "../../services/RouteService";
import "../styles/AddActivity.scss"

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultQuery: [],
      query: "",
      students: [],
      studentcode: "",
      subject: "",
      title: "",
      activity: "",
      video: "",
      imgPath: "",
      autoCompleteResults:[],
      default:"",
      editProfile:false
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

  openEdit() {
    this.setState({
      editProfile: true,
    });
  }

  closeEdit() {
    this.setState({
      editProfile: false
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
        this.setState(
          {...this.state,
          studentcode: "",
          subject: "",
          title: "",
          activity: "",
          video: "",
          imgPath: "",
          default:"DEFAULT"
        });
      })
      .catch(error => console.log(error));
  };

  searchYoutube = event => {
    event.preventDefault();
    const query = this.state.query;
    this.openEdit()
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
    if(this.state.video!==null){
      this.closeEdit()
    }
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
      return true
    } else {
      return false;
    }
  }

  render() {
    const { editProfile } = this.state;
    return (
      <React.Fragment>
        <div className="addActivity-container">
          <h1>For add new activity please complete this form:</h1>
          <div className="addActivity-adds-container">
            <form onSubmit={this.addNewActivity}>
                <div className="addActivity-label-container">
                  <div>
                  <label className="addActivity-label">Subject:</label>
                  <input className="addActivity-input" type="text" name="subject" placeholder="Religion" onChange={e => this.handleChange(e)} />
                  </div>
                  <div>
                  <label className="addActivity-label">Titulo:</label>
                  <input className="addActivity-input" type="text" name="title" placeholder="Tablas de multiplicar" onChange={e => this.handleChange(e)} />
                  </div>
                  <div>                  
                  <label className="addActivity-label">Estudiante:</label>
                  <select name="default" defaultValue={"DEFAULT"} onChange={e => this.studentChange(e)}>
                    <option disabled value="DEFAULT" placeholder="Select a student" ></option>
                    {this.state.students.map(student => (
                      <option key={student._id} value={student._id}>
                        {student.studentname}
                      </option>
                    ))}
                  </select>
                  </div>
                  <div>
                  <label className="addActivity-label">Description activity:</label>
                  <input className="addActivity-input" type="text" name="activity" placeholder="The student have adding..." onChange={e => this.handleChange(e)} />
                  </div>
                  <div>
                  <label className="addActivity-label">Upload the image:</label>
                  <input  className="file-input" type="file" name="imageUrl" onChange={e => this.handleFileUpload(e)} />
                  </div>
                  <div>
                  <label className="addActivity-label"> Search Video in Youtube: </label>
                  <input className="addActivity-input" list="data" type="text" name="query" placeholder="eg. adding and subtracting integers" onChange={e => this.handleChange(e)} />
                  <datalist id="data">
                      {this.state.autoCompleteResults.map((item, key) =>
                        <option key={key} value={item} />
                      )}
                  </datalist>
                  <button className="allbutton" onClick={this.searchYoutube}>Search Video</button>
                </div>
                </div>

          <div className={editProfile ? "resultvideos-container" : "formNone"}>
                <h1 className="addactivity-title-resultyoutube">Please select the video that you want use:</h1>
            {this.state.resultQuery.map((result, idx) => (
              <div key={idx}>
              <h1>{result.snippet.title}</h1>
              <iframe id="player" title={"video"+idx} type="text/html" width="320" height="180" src={"https://www.youtube.com/embed/"+result.id.videoId} frameBorder="0" ></iframe>
              <p>{result.snippet.description}</p>
              <button className="allbutton" name="video" value={"https://www.youtube.com/embed/"+result.id.videoId} onClick={e => this.handleChange(e)}>Select Video</button>
              </div>
            ))}
            </div>
                  <button className="allbutton" disabled={this.checkToSend()}>Add new Activity</button>
            </form>
          
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddActivity;
