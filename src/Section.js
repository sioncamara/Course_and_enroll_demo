import React from "react";
import "./App.css";
import Subsection from "./Subsection.js";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Button from "react-bootstrap/Button";

function Section(props) {
  const getMettingTimes = (entries) => {
    let times = [];
    for (const [day, time] of entries) {
      times.push(
        <li key={day}>
          {day}:&nbsp;{time}
        </li>
      );
    }
    return times;
  };

  const getSubsections = () => {
    let subSections = [];
    for (const [i, subsection] of props.section.subsections.entries()) {
      subSections.push(
        <Subsection
          key={i}
          setCart={props.setCart}
          cartMode={props.cartMode}
          course={props.course}
          section={props.section}
          sub={subsection}
          getMettingTimes={getMettingTimes}
        />
      );
    }

    return subSections;
  };

  const setSection = (course) => {
    console.log(course)
    let courseCopy = Object.assign({}, course); // must use temp copy to prevent courses sections from being modified
    courseCopy.sections = [props.section];
    return courseCopy;
  };

  //   console.log(typeof props.section.time)
  //   console.log(Object.values(props.section.time).entries())
  return (
    <>
      <li>
        {props.section.number}
        <Button
          type="button"
          onClick={
            props.cartMode
              ? () => props.setCart(props.course)
              : () => props.setCart(setSection(props.course))
          }
          style={{ transform: "scale(.9)", margin: "10px" }}
          variant="outline-secondary"
        >
          {props.cartMode ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />}
        </Button>
        <ul style={{ listStyleType: "circle" }}>
          <li>Instructor: {props.section.instructor}</li>
          <li>Location: {props.section.location}</li>
          <li>
            Metting Times
            <ul style={{ listStyleType: "square" }}>
              {getMettingTimes(Object.entries(props.section.time))}
            </ul>
          </li>
        </ul>
      </li>
      <p style={{ fontSize: "1.1rem" }}>Subsections</p>
      <ul style={{ listStyleType: "circle" }}>{getSubsections()}</ul>
    </>
  );
}

export default Section;
