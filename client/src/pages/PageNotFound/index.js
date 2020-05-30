import React from 'react';
import './index.css';

class PageNotFound extends React.Component{
    render(){
        return(
            <body>

                <div id="notfound">
                    <div class="notfound">
                        <div class="notfound-404"></div>
                        <h1>404</h1>
                        <h2>Oops! Page Not Be Found</h2>
                        <p>Sorry but the page you are looking for does not exist, has been removed, name changed, or is temporarily unavailable</p>
                        <a href="#">Back to homepage</a>
                    </div>
                </div>

            </body>
        );
    }
}

export default PageNotFound;