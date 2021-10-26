import React from "react";
import "./App.css";
import Accordian from "react-bootstrap/Accordion";
import Course from "./Course";

function CourseArea(props) {

  
  const getCourses = () => {
    let courses = [];

    const filteredCourses = props.cartMode
    ? Object.values(props.cartCourses) : Object.values(props.filteredCourses)

    for (let [i, course] of filteredCourses.entries()) {
      courses.push(
        <Course
          key={course.name}
          key2={i}
          cartCourses={props.cartCourses}
          setCart={props.setCart}
          cartMode={props.cartMode}
          course={course}
          completedCourseNumbers={props.completedCourseNumbers}
        />
      );
    }

    return courses;
  };

  return <Accordian style={{ marginRight: "20px" }}>{getCourses()}</Accordian>;
}

export default CourseArea;
