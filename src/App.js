import React from "react";
import "./styles.css";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1)
  }
}));

function Table(props) {
  function dItem(id) {
    props.deleteItem(id);
  }

  let index = 0;
  function getIndex() {
    index += 1;
    return index;
  }

  if (props.table.length > 0) {
    return (
      <table className="table table-hover" border="2px">
        <thead>
          <tr>
            <th scope="col" className="fw-bold">
              {" "}
              #{" "}
            </th>
            <th scope="col" className="fw-bold">
              {" "}
              Task Name{" "}
            </th>
            <th scope="col" className="fw-bold">
              {" "}
              Start time of task{" "}
            </th>
            <th scope="col" className="fw-bold">
              {" "}
              End time of task{" "}
            </th>
            <th scope="col" className="fw-bold">
              {" "}
              Action{" "}
            </th>
          </tr>
        </thead>

        <tbody>
          {props.table.map((task) => (
            <tr key={task.id}>
              <td>{getIndex()}</td>
              <td>{task.task}</td>
              <td>{task.starttime}</td>
              <td>{task.endtime}</td>
              <td>
                <Button aria-label="delete" onClick={() => dItem(task.id)}>
                  <DeleteIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else {
    return <span><p className="text-center newday">Have a great day ahead!!</p></span>;
  }
}

function GetRenewButton(props) {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="secondary"
      className={classes.button}
      startIcon={<AutorenewIcon />}
      onClick={props.handleClick}
    >
      {" "}
      Renew{" "}
    </Button>
  );
}

function isValid(starttime, endtime) {
  return starttime < endtime;
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      task: "",
      starttime: "",
      endtime: "",
      tasktable: []
    };
    this.refreshOnClick = this.refreshOnClick.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  refreshOnClick() {
    this.setState({
      tasktable: []
    });
  }

  deleteItem(id) {
    var tasktable = this.state.tasktable.filter((item) => item.id !== id);
    this.setState({
      tasktable: tasktable
    });
  }

  render() {
    return (
      <div className="app">
        <nav
          className="navbar navbar-dark bg-dark sticky-top"
          style={{ color: "white" }}
        >
          <span className="navbar-brand">Schedul'ime </span>
          <span className="navbar-text fst-italic">
            {" "}
            Think your "time flies!", now spend it as you want!{" "}
          </span>
          <span>
            <GetRenewButton handleClick={this.refreshOnClick} />
          </span>
        </nav>

        <div
          className="container card bg-info mb-3 text-center taskform"
          style={{ width: "40rem" }}
        >
          <div className="card-header fw-bold">Add a new task</div>
          <div className="card-body row g-3 container-fluid">
            <div className="input-group mb-3">
              <span className="input-group-text" id="task-addon">
                Title of Task{" "}
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Task"
                aria-describedby="task-addon"
                value={this.state.task}
                onChange={(event) => {
                  if (event.target.value.length > 0) {
                    this.setState({
                      task: event.target.value
                    });
                  } else {
                    this.setState({
                      task: ""
                    });
                  }
                }}
              ></input>
            </div>

            <div className="col">
              <div className="input-group mb-3">
                <span className="input-group-text" id="starttime-addon">
                  Start Time
                </span>
                <input
                  type="time"
                  className="form-control timepicker"
                  aria-label="Start Time"
                  aria-describedby="starttime-addon"
                  value={this.state.starttime}
                  onChange={(event) => {
                    if (event.target.value.length > 0) {
                      this.setState({
                        starttime: event.target.value
                      });
                    } else {
                      this.setState({
                        starttime: "What is start time?"
                      });
                    }
                  }}
                ></input>
              </div>
            </div>
            <div className="col input-group mb-3">
              <span className="input-group-text" id="endtime-addon">
                End Time
              </span>
              <input
                type="time"
                className="form-control"
                aria-label="End Time"
                aria-describedby="endtime-addon"
                value={this.state.endtime}
                onChange={(event) => {
                  if (event.target.value.length > 0) {
                    this.setState({
                      endtime: event.target.value
                    });
                  } else {
                    this.setState({
                      endtime: "What is end time?"
                    });
                  }
                }}
              ></input>
            </div>

            <div className="submitButton d-grid">
              <button
                id="submit"
                className="btn btn-success"
                onClick={() => {
                  if (
                    this.state.task.length === 0 ||
                    this.state.starttime.length == 0 ||
                    this.state.endtime.length === 0
                  ) {
                    var ans = window.confirm("Don't you have anything to do?");
                    if (ans) {
                      alert("Go and sleep!!");
                    } else {
                      alert("Then add details about that!!");
                    }
                  } else if (
                    !isValid(this.state.starttime, this.state.endtime)
                  ) {
                    var ans = window.confirm("Are you 'The Flash' or 'Dr. Strange!'?");
                    if (ans) {
                      alert(
                        "Then you should be saving the world, not hanging on here!"
                      );
                    } else {
                      alert("Then add start and end time properly!!");
                    }
                  } else {
                    var tasktable = this.state.tasktable;
                    tasktable.push({
                      id: tasktable.length + 1,
                      task: this.state.task,
                      starttime: this.state.starttime,
                      endtime: this.state.endtime
                    });
                    this.setState({
                      tasktable: tasktable,
                      task: "",
                      starttime: "",
                      endtime: ""
                    });
                  }
                }}
              >
                Add Task{" "}
              </button>
            </div>
          </div>
        </div>
        <div className="table-responsive container">
          <Table table={this.state.tasktable} deleteItem={this.deleteItem} />
        </div>
      </div>
    );
  }
}