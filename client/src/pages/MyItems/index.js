  
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
*/
import {Card, CardActionArea, CardMedia, Typography, Button, CardActions, CardContent, Grid} from "@material-ui/core";

let name = "canned food"
let owner = "a"
let description = "nfeljkodfjekdjfl"
let image = "https://bloximages.newyork1.vip.townnews.com/newspressnow.com/content/tncms/assets/v3/editorial/f/df/fdf4f1fc-3a34-11ea-8bf2-231012c771c1/5e237114db416.image.jpg"
let id ="b"
class MyItems extends React.Component{
    render(){
        let cardMediaStyle = {
            height: "240px",
            width: "auto"
        }
        return(
            <React.Fragment>
                <head>
                    {owner}'s Listings
                </head>
                <Grid justify="space-evenly" container spacing={3}>
                    <Grid key={id} container item xs={4}>
                        <Card>
                            <CardActionArea>
                                {image === undefined ? (
                                <CardMedia
                                    style={cardMediaStyle}
                                    image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP._n-qAq6XNFrd6xkEiHbdWgHaHa%26pid%3DApi&f=1"
                                />
                                ) : (
                                <CardMedia
                                    style={cardMediaStyle}
                                    image={image}
                                />
                                )}

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {name}
                                    </Typography>
                                    <Typography component="h5">Creator: {owner}</Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        component="p"
                                    >
                                        {description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Claim
                                </Button>
                                <Button
                                size="small"
                                color="primary"
                                >
                                    Learn More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default MyItems;