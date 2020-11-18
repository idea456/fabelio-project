import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    badge: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        fontSize: "1em"
  } 
});

export default function ProductCard(props) {
    const classes = useStyles();
    const { name, image, colours, dimension, price, material, sold } = props.product;

    const colorNames = {
        "custard vienna": "#EBDCC3",
        "graphite vienna": "#7e7a7f",
        "ruby vienna": "#db002c",
        "teal vienna": "#00c1ae",
        "blue jay": "#0088ce",
        "brown vienna": "#6a382d"
    }
    const colourNames = Object.keys(colours);
    


    return (
        <Badge color="error" classes={{ badge: classes.badge }} badgeContent={props.ranking} showZero={props.current}>
            <Card style={{borderRadius: 10, width: "28vw", display: "flex", justifyContent: "flex-end", flexDirection: "column" }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={name}
                        image={image}
                        title={name}
                        style={{marginTop: 30}}
                    />
                </CardActionArea>
                <CardContent style={{padding: "2vw"}}>
                    <Typography gutterBottom variant="h3" component="h3" style={{fontSize: "1.8vw"}}>
                        <strong>{name}</strong>
                    </Typography>
                    <div style={{display: "flex", marginTop: 10, marginBottom: 10}}>
                    {colourNames.map(color => {
                        return (
                            <Tooltip title={color} arrow>
                                <div style={{ width: 35, height: 35, marginRight: 15, background: colorNames[color], borderRadius: "50%" }} />
                            </Tooltip>
                        )
                    })}
                    </div>

                    <Typography gutterBottom variant="h5" component="h5" style={{fontSize: "1.2vw", color: "grey"}}>
                    <strong>{`Made with ${material}`}</strong>
                    </Typography>

                    <div style={{display: "flex", justifyContent: "space-between"}}>
                    {["Length", "Width", "Height"].map((d,i) => {
                        return (
                            <h2 style={{marginTop: 20, marginBottom: 30}}>{`${d}: ${dimension[i]}`}</h2>
                        )
                    })}
                    </div>
                    <Typography variant="h2" component="h1" style={{fontSize: "2.5vw"}}>
                        <strong>{`Rp ${price}.000`}</strong>
                    </Typography>
                </CardContent>
            </Card>
        </Badge>
    );
} 