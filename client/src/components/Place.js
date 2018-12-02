import React, { Component } from 'react'

class Place extends Component {
  state =  {
    numberOfRows: 11*4,
    rows: [],
    courseTitle: '',
    courseRoom: ''
  }
  createPlace = ()=>{
    let {courses, time} = this.props
    
    if(time){
      let place = []
      place.push(<div style={{height: '15px'}} key={888}></div>)
      let j = 1
      for(let i = 1; i < this.state.numberOfRows; i+=2){
        if(i === this.state.numberOfRows-1) break
        if(j % 2 === 1){
          place.push(
            <div style={{height: '30px'}} className="time-line" key={i}>
            </div>)
        } else {
          place.push(
            <div style={{height: '30px'}} className="time-line" key={i}>
                {j/2+9}:00
            </div>)
        }
        j++
      }
      return place
    } else {
      let temp = []
      if(courses){
        courses.forEach(course => {
          let x = course.startTimeH - 9
          let y = course.endTimeH - 9
          let mx = course.startTimeM / 15
          let my = course.endTimeM / 15
          let startPlaceIndex = x * 4 + mx
          let endPlaceIndex = y * 4 + my
          console.log(startPlaceIndex, endPlaceIndex)
          let height = (endPlaceIndex - startPlaceIndex)*15
          let courseHtml = <div style={{height: height+'px'}} className="coloredd" key={startPlaceIndex}>
                          {course.title}
                      </div>
          temp.push({start: startPlaceIndex, height: (endPlaceIndex - startPlaceIndex), course: courseHtml})
        });
        let place = []
        for(let i = 0; i < this.state.numberOfRows; i++){
          if(temp.length>0){
            let course = temp.find(course => {
              return course.start === i
            })
            console.log(course)
            if(course && i === course.start){
              place.push(course.course)
              i+=course.height-1
            } else {
              if(i%4 === 3) {
                place.push(<div className="place-row cbordered" key={i}></div>)
              } else {
                place.push(<div className="place-row" key={i}></div>)
              }
            }
          } else {
            if(i%4 === 3) {
              place.push(<div className="place-row cbordered" key={i}></div>)
            } else {
              place.push(<div className="place-row" key={i}></div>)
            }
          }
        }
        return place
      } else {
        let place = []
        for(let i = 0; i < this.state.numberOfRows; i+=4){
          place.push(
            <div style={{height: "60px"}} className="place-row cbordered" key={i}></div>
          )
        }
        return place
      }
    }
  }

  render() {
    let column = null;
    if(this.props.time){
      column = <div className="d-flex-row place ml-3 mr-2">
                {this.createPlace()}
              </div>
    } else {
      column = <div className="d-flex-row place col">
                {this.createPlace()}
              </div>
    }
    return (
      column
    )
  }
}
export default Place