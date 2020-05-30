import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

let name = "Toilet Paper"
let image = "https://images.squarespace-cdn.com/content/v1/5d716b6832e14f0001f75af4/1587063146356-UT1W87T2WYDR2G7HFOV3/ke17ZwdGBToddI8pDm48kNiEM88mrzHRsd1mQ3bxVct7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0s0XaMNjCqAzRibjnE_wBlkZ2axuMlPfqFLWy-3Tjp4nKScCHg1XF4aLsQJlo6oYbA/IMG_3672.jpg"
let owner = "shudoijd"
let description = "According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway. Because bees don’t care what humans think is impossible.” SEQ. 75 - “INTRO TO BARRY” INT. BENSON HOUSE - DAY ANGLE ON: Sneakers on the ground. Camera PANS UP to reveal BARRY BENSON’S BEDROOM ANGLE ON: Barry’s hand flipping through different sweaters in his closet. BARRY Yellow black, yellow black, yellow black, yellow black, yellow black, yellow black...oohh, black and yellow... ANGLE ON: Barry wearing the sweater he picked, looking in the mirror. BARRY (CONT’D) Yeah, let’s shake it up a little."


class Item extends React.Component {
    render() {
        let divStyle={
            padding: "20px",
            alignContent: "center",
            color: "#312F2F",
            backgroundColor: "#939EBF",
        }
        let secondStyle={
            padding: "10px",

        }
        let imageStyle={
            height: "500px"
        }
        let buttonStyle={
            backgroundColor: "#BBCDF2", 
            height: "25px",
            border: "none"
        }

        return(
            <React.Fragment>
                <body >
                    <div style={divStyle}>
                        <h1>
                            {name}
                        </h1>
                        <img src={image} style={imageStyle}/>
                    </div>
                    <div style={secondStyle}>
                        <h2>
                            Owner: {owner}
                            
                        </h2>
                        <button style={buttonStyle}>Contact Owner</button>
                        
                        <p>
                            {description}
                        </p>
                    </div>

                </body>
            </React.Fragment>  
        );
    }
}

export default Item;