import React, { useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Recommended from "./Recommended";

function CompletedCourse(props) {
  const rating = useRef("");

  const getKeywords = () => {
    let keywordsStr = "";
    const keywords = props.course.keywords;
    for (let [i, keyword] of keywords.entries())
      keywordsStr += i < keywords.length - 1 ? keyword + ", " : keyword;
    return keywordsStr;
  };

  const getRequisites = () => {
    const requisites = props.course.requisites;
    let reqStr = "";
    if (requisites.length === 0) return reqStr;
    else reqStr += "(";

    for (let [i, reqGroup] of requisites.entries()) {
      for (let [i, req] of reqGroup.entries()) {
        reqStr += i < reqGroup.length - 1 ? req + " OR " : req + ")";
      }
      if (i < requisites.length - 1) reqStr += " AND (";
    }
    return reqStr;
  };

  const getRatingOptions = () => {
    let ratingOptions = [];
    const ratings = ["No Rating", "0", "1", "2", "3", "4", "5"];
    for (const rating of ratings) {
      ratingOptions.push(<option key={rating}>{rating}</option>);
    }

    return ratingOptions;
  };

  return (
    <>
      <Accordion.Item
        style={{
          width: "33%",
        }}
        eventKey={props.key2}
      >
        <Accordion.Header style={{ textAlign: "center" }}>
          <>
            <div>
              <p style={{ fontSize: "1rem" }}>
                ({props.course.number}) | ({props.course.credits} credits)
              </p>
              &nbsp;&nbsp;
              <p style={{ fontSize: "1.5rem", marginTop: "-20px" }}>
                {"\t" + props.course.name}
              </p>
              {!props.isRecommended && (
                <Form style={{ marginTop: "2rem" }}>
                  <Form.Group
                    controlId="rating"
                    style={{ width: "100%", height: "200%" }}
                  >
                    <Form.Control
                      style={{
                        width: "100%",
                        height: "200%",
                        marginBottom: "15px",
                      }}
                      as="select"
                      ref={rating}
                      onChange={() => {
                        props.updateRatedCourses(
                          props.course,
                          rating.current.value
                        );
                        props.setRecommendedCourses(
                          Recommended(props.allCourses, props.ratedCourses)
                        );
                      }}
                    >
                      {getRatingOptions()}
                    </Form.Control>
                  </Form.Group>
                </Form>
              )}
            </div>
          </>
        </Accordion.Header>
        <Accordion.Body>
          <>
            <p style={{ fontSize: "1.1rem" }}>
              <b>Subject:</b> {props.course.subject}
            </p>
            <p>
              <b>Description: </b>
              {props.course.description}
            </p>
            <p style={{ fontSize: "1rem" }}>
              {" "}
              <b>Requisites:</b> {getRequisites()}
            </p>
            <p>
              <u>Keywords:</u>&nbsp;{getKeywords()}
            </p>
          </>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}

export default CompletedCourse;
