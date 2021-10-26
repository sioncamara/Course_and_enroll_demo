
export default function SearchAndFilter(courses, search, subject, minimumCredits, maximumCredits, interest) {

  
  
  const containsSearch = (course) => {
    for (const str of course.keywords) {
      if (str.includes(search)) return true
    }
    return false
  }
  
  const meetArgs = (course) => {
    if ( !((minimumCredits === '' || minimumCredits <= course.credits) &&
     (maximumCredits === '' |course.credits <= maximumCredits)) ) return false // return false if not within credit range

    if ( !(subject==='All') && !(course.subject === subject)) return false // return false if the courses subject is not equal to the selected subject (if selected subject is all, then ignore)

    if (!(containsSearch(course))) return false // check if word is search word is in keywords

    if( !(interest==="All") && !(course.keywords.includes(interest))) return false
    return true
  }

  const res = courses.filter(course =>  meetArgs(course))
  return res;
}
