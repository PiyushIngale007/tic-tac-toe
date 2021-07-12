import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './ScoreBoard.css';

const ScoreBoard = (props) => {
  return (
    <div className='mainDiv'>
      <p
        style={{
          color: 'yellowgreen',
          padding: '10px',
          fontSize: 'xx-large',
          fontFamily: 'Otomanopee One',
        }}
      >
        ScoreBoard
      </p>
      {console.log(props.details)}
      <div className='innerDiv'>
        <div className='cardDiv'>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  <span style={{ fontFamily: 'Otomanopee One', margin: '0' }}>
                    {props.details.Player1}
                  </span>
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  <span style={{ margin: '0', fontSize: '1.875rem' }}>
                    {props.details.Player1Score}
                  </span>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className='cardDiv'>
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                  <span style={{ fontFamily: 'Otomanopee One', margin: '0' }}>
                    {props.details.Player2}
                  </span>
                </Typography>
                <Typography variant='body2' color='textSecondary' component='p'>
                  <span style={{ margin: '0', fontSize: '1.875rem' }}>
                    {props.details.Player2Score}
                  </span>
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
