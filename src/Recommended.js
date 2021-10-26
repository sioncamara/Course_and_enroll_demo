export default function Recommended(courses, ratedCourses) {
  //return courses

  const courseNumbers = Object.keys(ratedCourses);
  //const courseRatings = Object.values(ratedCourses);
  console.log('rated courses:', ratedCourses)

  // remove completed courses
  let recommendedCourses = courses.filter(
    (course) => !courseNumbers.includes(course.number)
  );

  // add rating element to each recommended course
  for (const course of recommendedCourses) {
    course.ratings = [];
  }

  const containsInterest = (course, keywords, rating) => {
    for (const interest of keywords) {
        //console.log(interest)
      if (course.keywords.includes(interest)) course.ratings.push(rating);
    }
  };

  
  // add ratings to courses that have matching keywords as rated courses
  for (const courseNumber of courseNumbers) {
    const [rating, keywords] = ratedCourses[courseNumber];
    if (rating !== "No Rating") {
        console.log(keywords)
      for (const course of recommendedCourses) {
        containsInterest(course, keywords, rating);
      }

    }
  }


 const average = (ratings) => {
     ratings = ratings.map(i => Number(i))
     return ratings.reduce((a,b) => a + b) / parseFloat(ratings.length)
 }

  // take average of ratings
  for (const course of recommendedCourses) {
      if (course.ratings.length > 0) course.ratings = [average(course.ratings)]
  }


  // add courses that have same keywords as rated courses to result array
  let result = []
  for ( const course of recommendedCourses) {
      if (course.ratings.length === 1) result.push(course)
  }

  // sort courses by rating
  result = result.sort((a, b) => {
      const rating = 0
    //   console.log('a:', a.ratings[rating])
    //   console.log('b:', b)
      //return 0
      return  b.ratings[rating] - a.ratings[rating]
  })
 
  
  console.log(result)
  return result;
}
