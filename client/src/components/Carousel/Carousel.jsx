import React, { Component } from 'react'

export default class Carousel extends Component {
    render() {
        return (
        <div className="hero carousel" onClick={()=> window.open("https://unplugged.paxsite.com/", "_blank")} style={{backgroundImage: "url(/images/bgs-banner-pax.jpg)"}}>
          </div>
        )
    }
}
