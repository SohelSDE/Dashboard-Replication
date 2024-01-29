import React, { useEffect, useState } from "react";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";
import Widget from "../../components/Widget";
import Calendar from "./components/calendar/Calendar";
import Map from "./components/am4chartMap/am4chartMap";
import Rickshaw from "./components/rickshaw/Rickshaw";
import AnimatedNumber from "react-animated-numbers";
import s from "./Dashboard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { DataFetch } from "../../actions/data";

const Dashboard = (email) => {
  const [checkedArr, setCheckedArr] = useState([false, false, false]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const dashboardData=useSelector((state)=>state.dataReducer.data)
  const StateChecker = useSelector((state)=>state)
  console.log(' states available on Dashboard:-',StateChecker)

  useEffect(() => {
  //  dispatch(auth);
    dispatch(DataFetch());

  }, [dispatch]);
  
  const checkTable = (id) => {
    let arr = [];
    if (id === 0) {
      const val = !checkedArr[0];
      for (let i = 0; i < checkedArr.length; i += 1) {
        arr[i] = val;
      }
    } else {
      arr = checkedArr.slice();
      arr[id] = !arr[id];
    }
    if (arr[0]) {
      let count = 1;
      for (let i = 1; i < arr.length; i += 1) {
        if (arr[i]) {
          count += 1;
        }
      }
      if (count !== arr.length) {
        arr[0] = !arr[0];
      }
    }
    setCheckedArr(arr);
  };
 
 

  return (
   
    <div className={s.root}>
      <h1 className="page-title">
        Dashboard &nbsp;
        <small>
          <small>{user ? user.split("@")[0] : "GUEST"}</small>
        </small>
      </h1>
      <Row>
        <Col lg={7}>
          <Widget className="bg-transparent">
            <Map />
          </Widget>
        </Col>
        <Col lg={1} />
        <Col lg={4}>
          <Widget
            className="bg-transparent"
            title={
              <h5>
                {" "}
                Map
                <span className="fw-semi-bold">&nbsp;Statistics</span>
              </h5>
            }
            settings
            refresh
            close
          >
            <p>
              Status: <strong style={{ color: "greenyellow" }}>Live</strong>
            </p>
            <p>
              <span className="circle bg-default text-white">
                <i className="fa fa-map-marker" />
              </span>
              <span>
                <AnimatedNumber animateToNumber={dashboardData?.mapStatistics.totalHired}fontStyle={{
          fontSize: 20,
          color:'violet',
        }}  />
                <p><strong style={{ color:'whitesmoke' }}>Total Hired</strong><AnimatedNumber animateToNumber={dashboardData?.mapStatistics.totalInterviewed}   fontStyle={{
          fontSize: 20,
          color:'blueviolet',
        }} /> Total Interviewed/Short listed </p>
              </span>
            </p>
            <div className="row progress-stats">
              <div className="col-md-9 col-12">
                <h6 className="name fw-semi-bold">Foreign Visits</h6>
                <p className="description deemphasize mb-xs text-white">
                  Employee Hired
                </p>
                <Progress
                  color="primary"
                  value="60"
                  className="bg-subtle-blue progress-xs"
                />
              </div>
              <div className="col-md-3 col-12 text-center">
                <span className="status rounded rounded-lg bg-default text-light">
                  <small>
                    <AnimatedNumber
                      animateToNumber={
                        dashboardData?.discharge.foreignVisit.employeeHired
                      }
                    />
                  </small>
                </span>
              </div>
            </div>
            <div className="row progress-stats">
              <div className="col-md-9 col-12">
                <h6 className="name fw-semi-bold">Local Visits</h6>
                <p className="description deemphasize mb-xs text-white">
                  Employee Rejected{" "}
                </p>
                <Progress
                  color="danger"
                  value="39"
                  className="bg-subtle-blue progress-xs"
                />
              </div>
              <div className="col-md-3 col-12 text-center">
                <span className="status rounded rounded-lg bg-default text-light">
                  <small>
                    <AnimatedNumber
                      animateToNumber={
                        dashboardData?.discharge.localVisits.employeeRejected
                      }
                    />
                  </small>
                </span>
              </div>
            </div>
            <div className="row progress-stats">
              <div className="col-md-9 col-12">
                <h6 className="name fw-semi-bold">pipeline</h6>
                <p className="description deemphasize mb-xs text-white">
                  Employee proceed
                </p>
                <Progress
                  color="success"
                  value="80"
                  className="bg-subtle-blue progress-xs"
                />
              </div>
              <div className="col-md-3 col-12 text-center">
                <span className="status rounded rounded-lg bg-default text-light">
                  <small>
                    <AnimatedNumber
                      animateToNumber={
                        dashboardData?.discharge.pipeline.employeeProceed
                      }
                    />
                  </small>
                </span>
              </div>
            </div>
            <h6 className="fw-semi-bold mt">Map Distributions</h6>
            <p>
              Tracking:{" "}
              <strong>
                {dashboardData?.mapDistributions.tracking === "Active"
                  ? "Active"
                  : "Away"}
              </strong>
            </p>
            <p>
              <span className="circle bg-default text-white">
                <i className="fa fa-cog" />
              </span>
              &nbsp; {dashboardData?.mapDistributions.resumeRecieved} -resume recieved{" "}
              {dashboardData?.mapDistributions.resumeSortlisted} -sortlisted,
            </p>
            <div className="input-group mt">
              <input
                type="text"
                className="form-control bg-custom-dark border-0"
                placeholder="Search Map"
              />
              <span className="input-group-btn">
                <button
                  type="submit"
                  className={`btn btn-subtle-blue ${s.searchBtn}`}
                >
                  <i className="fa fa-search text-light" />
                </button>
              </span>
            </div>
          </Widget>
        </Col>
      </Row>
      <Row>
        {/* <Col lg={6} xl={4} xs={12}> */}
        {dashboardData?.Domains.map((Domain) => {
          return (
            <React.Fragment key={Domain.id}>
              <Col lg={6} xl={4} xs={12}>
                <Widget title={<h6> {Domain.Name} </h6>} close settings>
                  <div className="stats-row">
                    <div className="stat-item">
                      <h6 className="name">Short Listed</h6>
                      <p className="value">{Domain.SortListed}</p>
                    </div>
                    <div className="stat-item">
                      <h6 className="name">Inteview Sheduled</h6>
                      <p className="value">{Domain.inteviewSheduled}</p>
                    </div>
                    <div className="stat-item">
                      <h6 className="name">Hired</h6>
                      <p className="value">{Domain.Hired}</p>
                    </div>
                  </div>
                  <Progress
                    color={
                      Domain.comparedToLastMonth > 30 ? "success" : "danger"
                    }
                    value="60"
                    className="bg-subtle-blue progress-xs"
                  />
                  <p>
                    <small>
                      <span className="circle bg-default text-white mr-2">
                        <i className="fa fa-chevron-up" />
                      </span>
                    </small>
                    <span className="fw-semi-bold">
                      &nbsp;{Domain.comparedToLastMonth}{" "}
                      <strong>
                        % -{Domain.comparedToLastMonth > 20 ? "More" : "Less"}
                      </strong>
                    </span>
                    &nbsp;than last month
                  </p>
                </Widget>
              </Col>
            </React.Fragment>
          );
        })}
      </Row>
      <Row>
        <Col lg={4} xs={12}>
          <Widget
            title={
              <h6>
                <span className="badge badge-success mr-2">New</span> Messages
              </h6>
            }
            refresh
            close
          >
            <div className="widget-body undo_padding">
              <div className="list-group list-group-lg">
                {dashboardData?.newMessages.map((chatApp) => {
                  return (
                    <button className="list-group-item text-left" key={chatApp.messageId}>
                      <span className="thumb-sm float-left mr">
                        <img
                          className="rounded-circle"
                          src={chatApp.profilePic}
                          alt="..."
                        />
                        <i className="status status-bottom bg-success" />
                      </span>
                      <div>
                        <h6 className="m-0">{chatApp.sender}</h6>
                        <p className="help-block text-ellipsis m-0">
                          {chatApp.message}{" "}
                        </p>
                      </div>
                    </button>
                  );
                })}
               
              </div>
            </div>
            <footer className="bg-widget-transparent mt">
              <input
                type="search"
                className="form-control form-control-sm bg-custom-dark border-0"
                placeholder="Search"
              />
            </footer>
          </Widget>
        </Col>

        <Col lg={4} xs={12}>
          <Widget
            title={
              <h6>
                {" "}
                Market <span className="fw-semi-bold">Stats</span>
              </h6>
            }
            close
          >
            <div className="widget-body">
              <h3 ><AnimatedNumber animateToNumber={dashboardData?.marketStats.Deliverd}/></h3>
              <p className="">
                Target <span className="fw-semi-bold" style={{color:'greenyellow'}}>          
                <AnimatedNumber animateToNumber={dashboardData?.marketStats.targetDay}/></span> today Progress
                is <span className="fw-semi-bold" style={{color:"green"}}>{dashboardData?.marketStats.Progress}%</span>.
              </p>
            </div>
            <div className={`widget-table-overflow ${s.table}`}>
              <Table striped size="sm">
                <thead className="no-bd">
                  <tr>
                    <th>
                      <div className="checkbox abc-checkbox">
                        <Input
                          className="mt-0"
                          id="checkbox210"
                          type="checkbox"
                          onClick={() => checkTable(0)}
                          checked={checkedArr[0]}
                          readOnly
                        />{" "}
                        <Label for="checkbox210" />
                      </div>
                    </th>
                    <th>client</th>
                    <th>Requirements</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData?.marketStats.client.map((data)=>{
                    return(
                      <tr key={data.clientId}>
                      <td>
                        <div className="checkbox abc-checkbox">
                          <Input
                            className="mt-0"
                            id="checkbox212"
                            type="checkbox"
                            onClick={() => checkTable(1)}
                            checked={checkedArr[1]}
                            readOnly
                          />{" "}
                          <Label for="checkbox212" />
                        </div>
                      </td>
                      <td>{data.name}</td>
                      <td className="text-align-right fw-semi-bold">{data.Requirement}</td>
                    </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>

            <div
              className="widget-body mt-xlg chart-overflow-bottom"
              style={{ height: "120px", overflow: "hidden" }}
            >
              <Rickshaw height={120} />
            </div>
          </Widget>
        </Col>

        <Col lg={4} xs={12}>
          <Widget
            title={<h6>Calendar</h6>}
            settings
            close
            bodyClass={"pt-2 px-0 py-0"}
          >
            <Calendar />
            <div className="list-group fs-mini">
              <button className="list-group-item text-ellipsis">
                <span className="badge badge-pill badge-primary float-right">
                  6:45
                </span>
                Weed out the flower bed
              </button>
              <button className="list-group-item text-ellipsis">
                <span className="badge badge-pill badge-success float-right">
                  9:41
                </span>
                Stop world water pollution
              </button>
            </div>
          </Widget>
        </Col>
      </Row>{" "}
    </div>
  );
};

export default Dashboard;
