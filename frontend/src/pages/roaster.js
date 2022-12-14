import React, { Component } from "react";

import axios from "axios";
import { Form } from "react-bootstrap";
import {
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import TimePicker from "react-bootstrap-time-picker";

import { FaPlus, FaMinus } from "react-icons/fa";

import { nAllUpd } from "../store/Actions/BasicAction";

import toastr from "toastr";
import "toastr/build/toastr.min.css";

import "./../css/react-confirm-alert.css";
import Autocomplete from "react-autocomplete";
import { FaRegFilePdf } from "react-icons/fa";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import "./../css/App.css";
import { Object } from "core-js";
import { IoMdDownload } from "react-icons/io";
import { CSVLink } from "react-csv";

class Roaster extends Component {
  constructor(props) {
    super(props);
    let selMonth =
      new Date().getMonth() - 1
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1);
    this.state = {
      isEditable: false,
      selPatient: 0,
      selPatientValue: "",
      perPatient: false,
      selYear: new Date().getFullYear(),
      selMonth: selMonth,
      assigns: [],
      assignPerDay: [],
    };
  }

  componentDidMount() {}
  viewPerPatient = (e) => {
    this.setState({
      ...this.state,
      perPatient: !this.state.perPatient,
    });
  };
  getTotals(data, key) {
    let total = 0;
    data.forEach((item) => {
      total += item[key] ? item[key] : 0;
    });
    return total;
  }

  save = () => {
    const { basic } = this.props;
    const {
      isEditable,
      selPatient,
      selYear,
      selMonth,
      assigns,
    } = this.state;
    if (isEditable) {
      this.setState({
        ...this.state,
        isEditable: false,
      });
      const { requestblocks } = this.props.basic;
      if(requestblocks.length !== 0){
        toastr.clear();
        setTimeout(() => toastr.warning("This item cannot be requested! Please wait until approver approve the transfer request."), 300);
        return;
      }
      console.log(assigns);
      axios
        .post("rota/assign", {
          patient_id: selPatient,
          year: selYear,
          month: selMonth,
          assignData: assigns,
        })
        .then(function (response) {
          let res = response.data;
          if(res.state == "error"){
            toastr.clear();
            setTimeout(() => toastr.info("roaster edit request error!"), 3000);
          }
        })
        .catch(function (error) {});
    } else {
      let assigns = [];
      let assignPerDay = [];
      let newAssign = [];
      let month = selYear + "-" + selMonth;
      let daysInMonth = new Date(selYear, selMonth, 0).getDate();

      if (selPatient !== 0) {
        for (let i = 0; i < daysInMonth; i++) {
          assignPerDay[i + 1] = 0;
        }

        basic.nurses.map((nurse) => {
          nurse.rota.map((rota) => {
            if (rota.patient_id == selPatient && rota.date.includes(month)) {
              let day = rota.date.slice(8) * 1;
              assignPerDay[day]++;
              assigns.push({
                date: rota.date,
                day: day,
                nurse_name: nurse.name,
                nurse_short_id: nurse._id.slice(20),
                nurse_id: nurse._id,
                designation: nurse.level == 0 ? "Registered" : "Assistant",
                duty_start: rota.duty_start,
                duty_end: rota.duty_end,
                hour: rota.hour,
              });
            }
          });
        });

        for (let i = 0; i < daysInMonth; i++) {
          if (assignPerDay[(i + 1) * 1] == 0) {
            assignPerDay[(i + 1) * 1] = 1;
            newAssign.date =
              month + "-" + (i < 9 ? +"0" + String(i + 1) : i + 1);
            newAssign.day = (i + 1) * 1;
            newAssign.nurse_name = "Off Day";
            newAssign.nurse_short_id = "Off Day";
            newAssign.nurse_id = "Off Day";
            newAssign.designation = "Off Day";
            newAssign.duty_start = "Off Day";
            newAssign.duty_end = "Off Day";
            newAssign.hour = "Off Day";

            assigns = [...assigns, { ...newAssign }];
          }
        }
        assigns.sort((a, b) =>
          a.date > b.date
            ? 1
            : b.date > a.date
            ? -1
            : a.duty_start > b.duty_start
            ? 1
            : b.duty_start > a.duty_start
            ? -1
            : 0
        );

        let total = 0;
        for (var i in assignPerDay) {
          for (var j = 1; j <= assignPerDay[i]; j++) {
            assigns[total].rotation = j;
            total++;
          }
        }

        this.setState({
          ...this.state,
          isEditable: true,
          assigns: [...assigns],
          assignPerDay: [...assignPerDay],
        });
      }
    }
  };

  multiAssign = (e, row) => {
    const { selYear, selMonth, assigns, assignPerDay } = this.state;

    let selMultiDay = row.day;
    let month = selYear + "-" + selMonth;

    let newAssign = {};
    newAssign.date =
      month +
      "-" +
      (selMultiDay < 9 ? +"0" + String(selMultiDay) : selMultiDay);
    newAssign.day = selMultiDay;
    newAssign.rotation = assignPerDay[selMultiDay] + 1;
    newAssign.nurse_name = "Off Day";
    newAssign.nurse_name = "Off Day";
    newAssign.nurse_short_id = "Off Day";
    newAssign.nurse_id = "Off Day";
    newAssign.designation = "Off Day";
    newAssign.duty_start = "Off Day";
    newAssign.duty_end = "Off Day";
    newAssign.hour = "Off Day";

    let n = 0;
    assignPerDay[selMultiDay]++;
    for (let i = 1; i < selMultiDay * 1 + 1; i++) {
      n += assignPerDay[i];
    }
    assigns.splice(n - 1, 0, newAssign);
    assigns.splice(-1);

    this.setState({
      ...this.state,
      assigns: [...assigns],
      assignPerDay: [...assignPerDay],
    });
  };
  multiRemove = (e, row) => {
    const { assigns, assignPerDay } = this.state;

    let selMultiDay = row.day;
    let n = 0;
    for (let i = 1; i < selMultiDay; i++) {
      n += assignPerDay[i];
    }

    if (assignPerDay[selMultiDay] == 1) {
      assigns[n].nurse_name = "Off Day";
      assigns[n].nurse_short_id = "Off Day";
      assigns[n].nurse_id = "Off Day";
      assigns[n].designation = "Off Day";
      assigns[n].duty_start = "Off Day";
      assigns[n].duty_end = "Off Day";
      assigns[n].hour = "Off Day";
      this.setState({
        ...this.state,
        assigns: [...assigns],
      });
    } else {
      for (let j = 0; j < assignPerDay[selMultiDay]; j++) {
        if (j == row.rotation - 1) {
          assigns.splice(n + j, 1);
        } else if (j >= row.rotation) {
          assigns[n + j - 1].rotation--;
        }
      }
      assignPerDay[selMultiDay]--;

      assigns.splice(-1);
      this.setState({
        ...this.state,
        assigns: [...assigns],
        assignPerDay: [...assignPerDay],
      });
    }
  };

  onChangePatient = (e) => {
    // console.log(e.target);
    this.setState({
      ...this.state,
      selPatient: 0,
      selPatientValue: e.target.value,
    });
  };

  onSelectPatient = (val, item) => {
    this.setState({
      ...this.state,
      selPatient: item.key,
      selPatientValue: val,
    });
  };
  onChangeYear = (e) => {
    this.setState({
      ...this.state,
      selYear: e.target.value,
      isEditable: false,
    });
  };
  onChangeMonth = (e) => {
    this.setState({
      ...this.state,
      selMonth: e.target.value,
      isEditable: false,
    });
  };
  onChangeMultiDay = (e) => {
    this.setState({
      ...this.state,
      selMultiDay: e.target.value,
    });
  };
  onChangeNurse = (e, row) => {
    const { basic } = this.props;
    let { assigns } = this.state;

    assigns.map((assign, assignIndex) => {
      if (assign.day == row.day && assign.rotation == row.rotation) {
        basic.nurses.map((nurse) => {
          if (nurse._id == e.target.value) {
            assigns[assignIndex].nurse_name = nurse.name;
            assigns[assignIndex].nurse_id = nurse._id;
            assigns[assignIndex].nurse_short_id = nurse._id.slice(20);
            assigns[assignIndex].designation =
              nurse.level == 0 ? "Registered" : "Assistant";
          }
        });
      }
    });

    assigns.splice(-1);
    this.setState({
      ...this.state,
      assigns: [...assigns],
    });
  };
  onChangeDutyStart = (e, row) => {
    const { basic } = this.props;
    let { assigns, selPatient } = this.state;
    var _self = this;
    var hour =
      parseInt(e / 3600) > 9 ? parseInt(e / 3600) : "0" + parseInt(e / 3600);
    var min = e % 3600 == 0 ? "00" : "30";
    var _start = hour + ":" + min;
    var _end, _hour;
    if (hour >= 12) {
      _end = "23:30";
      _hour = 23 - hour;
    } else {
      _end = hour + 12 + ":" + min;
      _hour = 12;
    }
    var rotas;
    var isduplicate = false;

    var assignCount = assigns.length;
    var isAssign = false;

    let step = function () {
      return new Promise(function (resolve) {
        assigns.map((assign, index) => {
          if (
            assign.rotation !== row.rotation &&
            assign.date == row.date &&
            assign.duty_start < _start &&
            assign.duty_end > _start
          ) {
            isAssign = true;
            toastr.info(
              "Already Assign Hour in rotation" + assign.rotation + "!"
            );
          }
          if (index == assignCount - 1 && isAssign == false) {
            resolve();
          }
        });
      }).then(function () {
        return new Promise(function (resolve) {
          basic.nurses.map((nurse) => {
            if (nurse._id == row.nurse_id) {
              rotas = nurse.rota.length;
              if (rotas == 0) {
                resolve();
              }
              nurse.rota.map((rota, rotaIndex) => {
                if (
                  rota.date == row.date &&
                  rota.duty_start < _start &&
                  rota.duty_end > _start
                ) {
                  isduplicate = true;
                  basic.patients.map((patient) => {
                    if (
                      rota.patient_id != selPatient &&
                      rota.patient_id == patient._id
                    ) {
                      confirmAlert({
                        title: "Duplicate Time",
                        message:
                          "Nurse is allocated for " +
                          rota.duty_start +
                          " to " +
                          rota.duty_end +
                          " to " +
                          patient.name +
                          ". You want to overwrite?",
                        buttons: [
                          {
                            label: "Yes",
                            onClick: () => {
                              resolve();
                            },
                          },
                          {
                            label: "No",
                            onClick: () => {},
                          },
                        ],
                      });
                    }
                  });
                }
                if (rotaIndex == rotas - 1 && isduplicate == false) {
                  resolve();
                }
              });
            }
          });
        }).then(function () {
          assigns.map((assign, assignIndex) => {
            if (assign.day == row.day && assign.rotation == row.rotation) {
              basic.nurses.map((nurse) => {
                if (nurse._id == row.nurse_id) {
                  assigns[assignIndex].duty_start = _start;
                  assigns[assignIndex].duty_end = _end;
                  assigns[assignIndex].hour = _hour;
                }
              });
            }
          });

          assigns.splice(-1);
          _self.setState({
            ..._self.state,
            assigns: [...assigns],
          });
        });
      });
    };
    step();
  };
  onChangeDutyEnd = (e, row) => {
    const { basic } = this.props;
    let { assigns, selPatient } = this.state;
    var _self = this;
    var hour =
      parseInt(e / 3600) > 9 ? parseInt(e / 3600) : "0" + parseInt(e / 3600);
    var min = e % 3600 == 0 ? "00" : "30";
    var _end = hour + ":" + min;
    var rotas;
    var isduplicate = false;

    var assignCount = assigns.length;
    var isAssign = false;

    let step = function () {
      return new Promise(function (resolve) {
        assigns.map((assign, index) => {
          if (
            assign.rotation !== row.rotation &&
            assign.date == row.date &&
            assign.duty_start != "Off Day" &&
            assign.duty_end != "Off Day" &&
            assign.duty_start < _end &&
            assign.duty_end > row.duty_start
          ) {
            isAssign = true;
            toastr.info(
              "Already Assign Hour in rotation" + assign.rotation + "!"
            );
          }
          if (index == assignCount - 1 && isAssign == false) {
            resolve();
          }
        });
      }).then(function () {
        return new Promise(function (resolve) {
          basic.nurses.map((nurse) => {
            if (nurse._id == row.nurse_id) {
              rotas = nurse.rota.length;
              if (rotas == 0) {
                resolve();
              }
              nurse.rota.map((rota, rotaIndex) => {
                if (
                  rota.date == row.date &&
                  rota.duty_end > row.duty_start &&
                  rota.duty_start < _end
                ) {
                  basic.patients.map((patient) => {
                    if (
                      rota.patient_id != selPatient &&
                      rota.patient_id == patient._id
                    ) {
                      isduplicate = true;
                      confirmAlert({
                        title: "Duplicate Time",
                        message:
                          "Nurse is allocated for " +
                          rota.duty_start +
                          " to " +
                          rota.duty_end +
                          " to " +
                          patient.name +
                          ". You want to overwrite?",
                        buttons: [
                          {
                            label: "Yes",
                            onClick: () => {
                              resolve();
                            },
                          },
                          {
                            label: "No",
                            onClick: () => {},
                          },
                        ],
                      });
                    }
                  });
                }
                if (rotaIndex == rotas - 1 && isduplicate == false) {
                  resolve();
                }
              });
            }
          });
        }).then(function () {
          assigns.map((assign, assignIndex) => {
            if (assign.day == row.day && assign.rotation == row.rotation) {
              basic.nurses.map((nurse) => {
                if (nurse._id == row.nurse_id) {
                  assigns[assignIndex].duty_end = _end;
                  if (assigns[assignIndex].duty_end != "NA") {
                    assigns[assignIndex].hour = Math.abs(
                      assigns[assignIndex].duty_end.split(":")[0] -
                        assigns[assignIndex].duty_start.split(":")[0]
                    );
                  }
                }
              });
            }
          });

          assigns.splice(-1);
          _self.setState({
            ..._self.state,
            assigns: [...assigns],
          });
        });
      });
    };
    step();
  };

  swap(json) {
    let ret = [];
    for (var key in json) {
      ret[json[key]] = key;
    }
    return ret;
  }

  render() {
    const { basic } = this.props;
    const {user} = this.props.basic;
    const {
      selPatient,
      selPatientValue,
      selYear,
      selMonth,
      isEditable,
      assigns,
      assignPerDay,
    } = this.state;
    let assignColumns = [];
    let assignDatas = [];
    let assignPerDayDatas = [];
    let newAssign = [];
    let assignHour;
    let month = selYear + "-" + selMonth;
    let daysInMonth = new Date(selYear, selMonth, 0).getDate();

    let monthNames = basic.monthNames;

    // console.log(monthNames);
    // let monthObject = {...monthNames};

    let Mon = Object.keys(monthNames);
    let NoMon = Object.values(monthNames);

    const MonthSelect = Mon.map((month, index) => (
      <option key={index} value={NoMon[index]}>{month}</option>
    ));
    let thour = 0;
    //get holidays per month
    let holidays = basic.holidays;
    let holidaysPerMonth = [];
    holidays.map((holiday) => {
      if (holiday.slice(0, 2) == selMonth) {
        holidaysPerMonth.push(selYear + "-" + holiday);
      }
    });
    //get sundays per month
    let sundaysPerMonth = [];
    let headers = [
      { label: "Date", key: "date" },
      { label: "Emp ID", key: "nurse_short_id" },
      { label: "Emp Name", key: "nurse_name" },
      { label: "Designation", key: "designation" },
      { label: "Duty Start", key: "duty_start" },
      { label: "Duty End", key: "duty_end" },
      { label: "Hour", key: "hour" },
    ];
    let date = selYear + "-" + selMonth + "-01";
    let firstDate = new Date(date).getDay();
    if (firstDate == 0) {
      firstDate = 1;
    } else {
      firstDate = 7 - firstDate + 1;
    }
    for (let selDay = firstDate; selDay < daysInMonth; selDay += 7) {
      let day = selDay > 9 ? selDay : "0" + selDay;
      sundaysPerMonth.push(month + "-" + day);
    }

    if (isEditable) {
      assignColumns = [
        {
          name: "Date",
          center: true,
          wrap: true,
          selector: (row) => row.date,
        },
        // {
        //   name: "Rotation No",
        //   center:true,
        //   wrap:true,
        //   selector: (row) => row.rotation,
        // },
        {
          name: "Emp ID",
          center: true,
          wrap: true,
          with: "80px",
          selector: (row) => row.nurse_short_id,
        },
        {
          name: "Emp Name",
          center: true,
          wrap: true,
          width: "200px",
          cell: (row) => (row.date !== "Total"&&
            <Form.Select
              aria-label="patient select"
              value={row._nurse_id}
              onChange={(e) => this.onChangeNurse(e, row)}
            >
              <option value="0">Select Nurse</option>
              {basic.nurses.map((nurse, index) => {
                //get leavedays per month
                let leaves = nurse.leave ? nurse.leave : [];
                let leavedaysPerMonth = [];

                for (let leave of leaves) {
                  let from = new Date(leave.from);
                  let to = new Date(leave.to);
                  for (let betweenDay = from; betweenDay <= to; ) {
                    let year = betweenDay.getFullYear();
                    let day =
                      betweenDay.getDate() > 9
                        ? betweenDay.getDate()
                        : "0" + betweenDay.getDate();
                    if (
                      year == selYear &&
                      betweenDay.getMonth() + 1 == parseInt(selMonth)
                    ) {
                      leavedaysPerMonth.push(month + "-" + day);
                    }
                    betweenDay.setDate(betweenDay.getDate() + 1);
                  }
                }

                let workingdays = [
                  ...leavedaysPerMonth,
                  ...holidaysPerMonth,
                  ...sundaysPerMonth,
                ];
                workingdays = [...new Set(workingdays)];
                assignHour = (daysInMonth - workingdays.length) * 8;

                basic.nurses.map((_nurse, index) => {
                  if (_nurse._id == nurse._id) {
                    _nurse.rota.map((rota) => {
                      if (
                        rota.date.includes(month) &&
                        rota.patient_id != selPatient
                      ) {
                        assignHour -= rota.hour;
                      }
                    });
                  }
                });

                assigns.map((assign) => {
                  if (assign.nurse_id == nurse._id && assign.hour != "NA") {
                    assignHour -= assign.hour;
                  }
                });
                return (
                  <option
                    key={index}
                    value={nurse._id}
                    className="assign"
                    selected={nurse._id == row.nurse_id ? "selected" : ""}
                  >
                    {nurse.name}
                    {"(" + assignHour + ")"}
                  </option>
                );
              })}
            </Form.Select>
          ),
        },
        {
          name: "Designation",
          center: true,
          wrap: true,
          width: "100px",
          selector: (row) => row.designation,
        },
        {
          name: "Duty Start",
          center: true,
          wrap: true,
          width: "140px",
          cell: (row) => (row.date !== "Total"&&
            <TimePicker
              step={30}
              value={row.duty_start == "Off Day" ? "12:00" : row.duty_start}
              disabled={row.nurse_id == "Off Day" ? "disabled" : ""}
              onChange={(e) => this.onChangeDutyStart(e, row)}
            />
          ),
        },
        {
          name: "Duty End",
          center: true,
          wrap: true,
          width: "140px",
          selector: (row) => (row.date !== "Total"&&
            <TimePicker
              start={row.duty_start == "Off Day" ? "00:00" : row.duty_start}
              step={30}
              value={row.duty_end == "Off Day" ? "12:00" : row.duty_end}
              disabled={row.duty_start == "Off Day" ? "disabled" : ""}
              onChange={(e) => this.onChangeDutyEnd(e, row)}
            />
          ),
        },
        {
          name: "Hour",
          center: true,
          wrap: true,
          width: "80px",
          selector: (row) => row.hour,
        },
        {
          name: "Action",
          center: true,
          wrap: true,
          width: "120px",
          selector: (row) =>
            row.rotation == 1 ? (
              [
                <MDBBtnGroup key={row.leave_id}>
                  <MDBBtn
                    outline
                    floating
                    color="success"
                    size="sm"
                    onClick={(e) => this.multiAssign(e, row)}
                  >
                    <FaPlus />
                  </MDBBtn>
                  <MDBBtn
                    outline
                    floating
                    color="success"
                    size="sm"
                    onClick={(e) => this.multiRemove(e, row)}
                  >
                    <FaMinus />
                  </MDBBtn>
                </MDBBtnGroup>,
              ]
            ) : (
              <MDBBtn
                outline
                floating
                color="success"
                size="sm"
                onClick={(e) => this.multiRemove(e, row)}
              >
                <FaMinus />
              </MDBBtn>
            ),
        },
      ];

      assignDatas = assigns;
      assignPerDayDatas = assignPerDay;
    } else {
      assignColumns = [
        {
          name: "Date",
          center: true,
          wrap: true,
          selector: (row) => row.date,
        },
        {
          name: "Emp ID",
          center: true,
          wrap: true,
          with: "80px",
          selector: (row) => row.nurse_short_id,
        },
        {
          name: "Emp Name",
          center: true,
          wrap: true,
          selector: (row) => row.nurse_name,
        },
        {
          name: "Designation",
          center: true,
          wrap: true,
          selector: (row) => row.designation,
        },
        {
          name: "Duty Start",
          center: true,
          wrap: true,
          selector: (row) => row.duty_start,
        },
        {
          name: "Duty End",
          center: true,
          wrap: true,
          selector: (row) => row.duty_end,
        },
        {
          name: "Hour",
          center: true,
          wrap: true,
          selector: (row) => row.hour,
        },
      ];

      if (selPatient != 0) {
        for (let i = 0; i < daysInMonth; i++) {
          assignPerDayDatas[i + 1] = 0;
        }

        basic.nurses.map((nurse) => {
          nurse.rota.map((rota) => {
            if (rota.patient_id == selPatient && rota.date.includes(month)) {
              thour += rota.hour;
              let day = rota.date.slice(8) * 1;
              assignPerDayDatas[day]++;
              assignDatas.push({
                date: rota.date,
                day: day,
                nurse_name: nurse.name,
                nurse_short_id: nurse._id.slice(20),
                nurse_id: nurse._id,
                designation: nurse.level == 0 ? "Registered" : "Assistant",
                duty_start: rota.duty_start,
                duty_end: rota.duty_end,
                hour: rota.hour,
              });
            }
          });
        });

        for (let i = 0; i < daysInMonth; i++) {
          if (assignPerDayDatas[(i + 1) * 1] == 0) {
            assignPerDayDatas[(i + 1) * 1] = 1;
            newAssign.date =
              month + "-" + (i < 9 ? +"0" + String(i + 1) : i + 1);
            newAssign.day = (i + 1) * 1;
            newAssign.nurse_name = "Off Day";
            newAssign.nurse_short_id = "Off Day";
            newAssign.nurse_id = "Off Day";
            newAssign.designation = "Off Day";
            newAssign.duty_start = "Off Day";
            newAssign.duty_end = "Off Day";
            newAssign.hour = "Off Day";

            assignDatas = [...assignDatas, { ...newAssign }];
          }
        }

        assignDatas.sort((a, b) =>
          a.date > b.date
            ? 1
            : b.date > a.date
            ? -1
            : a.duty_start > b.duty_start
            ? 1
            : b.duty_start > a.duty_start
            ? -1
            : 0
        );

        let total = 0;
        for (var i in assignPerDayDatas) {
          for (var j = 1; j <= assignPerDayDatas[i]; j++) {
            assignDatas[total].rotation = j;
            total++;
          }
        }
      }
    }

    let patientList = [];
    let patientAutoList = [];

    basic.patients.map((patient) => {
      patientList[patient._id] = patient.name;
      if (patient.name.includes(selPatientValue)) {
        patientAutoList.push({
          label: patient.name,
          key: patient._id,
        });
      }
    });
    let total = {
      date: "Total",
      hour: thour,
    };
    for (let month in monthNames) {
      total[month] = this.getTotals(assignDatas, month);
    }
    total["total"] = this.getTotals(assignDatas, "total");
    assignDatas.push(total);

    const conditionalRowStyles = [
      {
        when: (row) => row.rotation == 1,
        style: (row) => ({
          backgroundColor:
            row.day % 2 == 1 ? "rgb(160,160,160)" : "rgb(192,192,192)",
        }),
      },
    ];

    function generate() {
      const doc = new jsPDF("a4", "pt", "letter");

      var img = new Image();
      var src = "https://i.postimg.cc/wMgr6Tr0/converted.jpg";
      img.src = src;
      const rows = [];

      const columns = [];
      headers.map((key) => columns.push({ header: key.label }));

      assignDatas.map((key) =>
        rows.push(
          Object.values([
            key.date,
            key.nurse_short_id,
            key.nurse_name,
            key.designation,
            key.duty_start,
            key.duty_end,
            key.hour,
          ])
        )
      );

      doc.setFontSize(20);
      doc.addImage(img, "JPEG", 420, 15, 160, 30);
      doc.text(250, 80, "Duty Roaster");

      doc.autoTable(columns, rows, {
        margin: { top: 100, left: 30, right: 30, bottom: 50 },
        theme: "grid",
      });

      doc.setFontSize(10);
      doc.text(30, 755, "Assigned By___________________");
      doc.text(420, 755, "Approved by___________________");
      const pageCount = doc.internal.getNumberOfPages();

      for (var i = 1; i <= pageCount; i++) {
        // Go to page i
        doc.setPage(i);
        doc.text(
          String(i) + "/" + String(pageCount),
          325 - 20,
          805 - 30,
          null,
          null,
          "center"
        );
      }
      doc.save("roaster.pdf");
    }

    return (
      <MDBContainer>
        <div className="pt-5 text-center text-dark">
          <h1 className="mt-3">DUTY ROASTER</h1>
        </div>
        <MDBRow className=" align-items-center justify-content-center">
          <MDBCol md="2" className="pt-4"></MDBCol>
        </MDBRow>
        <MDBRow className=" align-items-center justify-content-center">
          <MDBCol className="autocomplete col-md-2 ncard">
            <Autocomplete
              getItemValue={(item) => item.label}
              items={patientAutoList}
              inputProps={{ placeholder: "Select Patients" }}
              renderItem={(item, isHighlighted) => (
                <div
                  style={{
                    background: isHighlighted ? "#2E86C1" : "white",
                    color: isHighlighted ? "white" : "black",
                    borderRadius: "1px",
                    backgroundColor: "white",
                    fontSize: "15px",
                    fontFamily: "Arial",
                  }}
                >
                  {item.label}
                </div>
              )}
              value={selPatientValue}
              onChange={(e) => this.onChangePatient(e)}
              onSelect={(val, item) => this.onSelectPatient(val, item)}
            />
          </MDBCol>
          <MDBCol md="2">
            <Form.Group>
              <Form.Control
                type="number"
                value={selYear}
                placeholder="Year"
                min={2022}
                max={new Date().getFullYear()}
                onChange={(e) => this.onChangeYear(e)}
              />
            </Form.Group>
          </MDBCol>
          <MDBCol md="2">
            <Form.Select
              aria-label="select"
              value={selMonth}
              onChange={(e) => this.onChangeMonth(e)}
            >
              {MonthSelect}
            </Form.Select>
          </MDBCol>
          <MDBCol md="1">
            {user.hasOwnProperty("role") && user.role !== 1 &&
            <MDBCol md="2">
              <MDBBtn
                outline
                rounded
                color="success"
                type="button"
                onClick={() => this.save()}
              >
                {isEditable ? "save" : "edit"}
              </MDBBtn>
            </MDBCol>
            }
            <MDBCol md="2">
              <CSVLink
                headers={headers}
                data={assignDatas}
                filename={"roaster.csv"}
                className="btn btn-success Pbtn-success1"
                target="_blank"
              >
                <IoMdDownload />
                Export
              </CSVLink>
            </MDBCol>
            <MDBCol md="2">
              <button
                className="btn btn-success Pbtn-success2"
                target="_blank"
                onClick={() => generate()}
              >
                <FaRegFilePdf /> PDF
              </button>
            </MDBCol>
          </MDBCol>
        </MDBRow>
        <MDBRow className="p-2">
          <DataTable
            columns={assignColumns}
            data={assignDatas}
            fixedHeader
            fixedHeaderScrollHeight={"70vh"}
            conditionalRowStyles={conditionalRowStyles}
          />
        </MDBRow>
      </MDBContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getRoaster: (data) => dispatch(nAllUpd(data)),
});

const mapStateToProps = (BasicData) => ({
  basic: BasicData.BasicData,
});
export default connect(mapStateToProps, mapDispatchToProps)(Roaster);
