import React, { Component } from 'react'

export default class Loader extends Component {
    render(){
        return(
    				<div className="loader-box">
    						<div>
    							<img
                    title="loading"
                    alt="loading"
                    src="/loading.gif" />
    						</div>
                <div>Loading...</div>
    				</div>
        );
    }
}
