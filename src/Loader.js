import React, { Component } from 'react'

export default class Loader extends Component {
    render(){
        return(
    				<div className="loader-box">
    						<div className="">
    							<img src="/loading.gif"/>
    						</div>
                <div>Loading...</div>
    				</div>
        );
    }
}
