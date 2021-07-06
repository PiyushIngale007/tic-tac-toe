import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./ScoreBoard.css";

const ScoreBoard = (props) => {
  return (
    <div className="mainDiv">
      <p
        style={{ color: "yellowgreen", padding: "10px", fontSize: "xx-large" }}
      >
        ScoreBoard
      </p>
      {console.log(props.details)}
      <div className="innerDiv">
        <div className="cardDiv">
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.details.Player1}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.details.Player1Score}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className="cardDiv">
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {props.details.Player2}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {props.details.Player2Score}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
