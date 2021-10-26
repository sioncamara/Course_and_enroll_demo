import React from "react";
import "./App.css";
import Accordion from "react-bootstrap/Accordion";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Button from "react-bootstrap/Button";
import Section from "./Section";

function Course(props) {
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

  const meetsRequisites = (newCourse) => {
    const completedCourses = Object.keys(props.completedCourseNumbers);

    const requisites = props.course.requisites;
    if (requisites.length === 0) return true;
    let meetsGroup = false;

    // check if course is new. If it is not do not show alert in conditional state
    let isNew = true;
    for (const course of props.cartCourses) {
      if (course.number === newCourse.number) isNew = false;
    }

    for (const reqGroup of requisites) {
      // must meet one requisite in each group
      for (const req of reqGroup) {
        // only need to meet one of these
        if (completedCourses.includes(req)) meetsGroup = true;
      }
      if (!meetsGroup) {
        if(isNew) alert("You do not meet the requisties for the course added");
        return false; //check if one requisite within group was met
      }
      meetsGroup = false; // reset for next group
    }
    return true; // at least one requisit in each group was met
  };

  const getSections = () => {
    const sections = [];
    for (const [i, section] of props.course.sections.entries()) {
      sections.push(
        <Section
          key={i}
          section={section}
          course={props.course}
          cartCourses={props.cartCourses}
          setCart={props.setCart}
          cartMode={props.cartMode}
        />
      );
    }
    return sections;
  };

  return (
    <>
      <Accordion.Item
        style={props.cartMode ? { width: "93%" } : { width: "100%" }}
        eventKey={props.key2}
      >
        <Accordion.Header style={{ textAlign: "center" }}>
          <div>
            <p style={{ fontSize: "1rem" }}>
              ({props.course.number}) | ({props.course.credits} credits)
            </p>
            &nbsp;&nbsp;
            <p style={{ fontSize: "1.5rem", marginTop: "-20px" }}>
              {"\t" + props.course.name}
            </p>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <>
            <Button
              type="button"
              onClick={
                props.cartMode
                  ? () => props.setCart(props.course)
                  : () => {
                      props.setCart(props.course);
                      meetsRequisites(props.course);
                    }
              }
              style={{ fontSize: "0.7rem", margin: "10px" }}
              variant="outline-secondary"
            >
              {props.cartMode ? (
                <RemoveShoppingCartIcon />
              ) : (
                <ShoppingCartIcon />
              )}
              {props.cartMode ? "remove from cart" : "Add to cart"}
            </Button>

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
              {
                /*isert message about not meeting requisites here*/
                //props.cartMode && meetsRequisites()
              }
            </p>
            <p>
              <u>Keywords:</u>&nbsp;{getKeywords()}
            </p>
            <p style={{ fontSize: "1.3rem" }}>Sections</p>
            <ul style={{ listStyleType: "disc" }}>{getSections()}</ul>
          </>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}

export default Course;
