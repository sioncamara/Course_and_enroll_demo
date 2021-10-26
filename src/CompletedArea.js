import React from "react";
import "./App.css";
import Accordian from "react-bootstrap/Accordion";
import CompletedCourse from "./CompletedCourse";

function CompletedArea(props) {
  const getCourses = () => {
    let courses = [];
    //if (props.isRecommended) console.log("selected Interest: ", props.selectedInterest)
    const completedCourses = props.isRecommended
      ? props.recommendedCourses
      : props.completedCourses;

    for (let [i, course] of completedCourses.entries()) {
      courses.push(
        <CompletedCourse
          key={course.name}
          key2={i}
          course={course}
          allCourses={props.allCourses}
          isRecommended={props.isRecommended}
          setRecommendedCourses={props.setRecommendedCourses}
          updateRatedCourses={props.updateRatedCourses}
          ratedCourses={props.ratedCourses}
        />
      );
    }

    return courses;
  };

  return (
    <Accordian flush style={{ marginRight: "20px", textAlign: "center" }}>
      {getCourses()}
    </Accordian>
  );
}

export default CompletedArea;
