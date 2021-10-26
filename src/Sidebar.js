import React, { useRef } from "react";
import "./App.css";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import SearchAndFilter from "./SearchAndFilter";

function Sidebar(props) {
  const subject = useRef("");
  const minimumCredits = useRef("");
  const maximumCredits = useRef("");
  const search = useRef("");
  const interest = useRef("");

  const setCourses = () => {
    props.setCourses(
      SearchAndFilter(
        props.courses,
        search.current.value,
        subject.current.value,
        minimumCredits.current.value,
        maximumCredits.current.value,
        interest.current.value
      )
    );
  };


  const handleCreditsKeyDown = (e) => {
    if (
      [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "Backspace",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Tab",
      ].indexOf(e.key) === -1
    )
      e.preventDefault();
  };

  const getSubjectOptions = () => {
    let subjectOptions = [];

    for (const subject of props.subjects) {
      subjectOptions.push(<option key={subject}>{subject}</option>);
    }

    return subjectOptions;
  };

  const getInterestOptions = () => {
    let interestOptions = [];

    for (const interest of props.interests) {
      interestOptions.push(<option key={interest}>{interest}</option>);
    }

    return interestOptions;
  };

  return (
    <>
      <Card
        style={{
          width: "calc(20vw - 5px)",
          marginLeft: "5px",
          height: "calc(100vh - 10px)",
          position: "fixed",
        }}
      >
        <Card.Body>
          <Card.Title>Search and Filter</Card.Title>

          <Form>
            <Form.Group
              controlId="formKeywords"
              onChange={() => setCourses()}
              style={{ width: "100%" }}
            >
              <Form.Label>Search</Form.Label>
              <Form.Control
                style={{ marginBottom: "15px" }}
                type="text"
                placeholder="Search"
                autoComplete="off"
                ref={search}
              />
            </Form.Group>

            <Form.Group
              controlId="formSubject"
              style={{ width: "100%", height: "200%" }}
            >
              <Form.Label>Subject</Form.Label>
              <Form.Control
                style={{ width: "100%", height: "200%", marginBottom: "15px" }}
                as="select"
                ref={subject}
                onChange={() => setCourses()}
              >
                {getSubjectOptions()}
              </Form.Control>
            </Form.Group>

            <Form.Group
              controlId="formInterest"
              style={{ width: "100%", height: "200%" }}
            >
              <Form.Label>Interest Area</Form.Label>
              <Form.Control
                style={{ width: "100%", height: "200%", marginBottom: "15px" }}
                as="select"
                ref={interest}
                onChange={() => {
                  setCourses(); 
                }}
              >
                {getInterestOptions()}
              </Form.Control>
            </Form.Group>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <Form.Group
                controlId="minimumCredits"
                onChange={() => setCourses()}
                onKeyDown={(e) => handleCreditsKeyDown(e)}
              >
                <Form.Label>Credits</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="minimum"
                  autoComplete="off"
                  name="minimum"
                  ref={minimumCredits}
                />
              </Form.Group>
              <div
                style={{
                  marginLeft: "5px",
                  marginRight: "5px",
                  marginTop: "38px",
                }}
              >
                to
              </div>
              <Form.Group
                controlId="maximumCredits"
                style={{ marginTop: "32px" }}
                onChange={() => setCourses()}
                onKeyDown={(e) => handleCreditsKeyDown(e)}
              >
                <Form.Control
                  type="text"
                  placeholder="maximum"
                  autoComplete="off"
                  ref={maximumCredits}
                />
              </Form.Group>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default Sidebar;
