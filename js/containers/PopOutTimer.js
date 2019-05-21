import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Clock from 'react-clock';
import CountDown from './CountDown';

const styles = {
    popoutContainer: {
        width: '500px'
    },
    popOutTitle: {
        padding: "20px",
        width: '100%',
        textAlign: 'center',
        fontFamily: 'Bree Serif',
        fontSize: "1.5em"
    },
    popOutButton: {
        width: '100%',
        fontWeight: '1'
    },
    image: {
        width: "100%"
    },
    leftContainer: {
        marginLeft: "50px"
    },
    rightContainer: {
        width: "200px",
        marginLeft: "auto",
        marginRight: "50px"
    },
    textContainer: {
        wordWrap: "break-word",
        width: "100%",
    },
    flexContainer: {
        display: "flex",
        marginBottom: "25px",
        marginTop: "25px"
    },
    countDownContainer:{
        width: "80%",
        margin: "0 auto",
    }
}

class PopOutTimer extends React.Component {  
    state = {
        date: new Date(),
    }

    componentDidMount(){
        setInterval(() => {
            this.setState({
                date: new Date(),
            })
        }, 1000);
    }

    render() {
    
      return (
        <Dialog open={this.props.open} aria-labelledby="simple-dialog-title">
            <div style={styles.popoutContainer}>
                <div style={styles.popOutTitle}>
                    <div>Cook-along Timer</div>
                </div>
                <div className={this.props.timerClass} style={styles.flexContainer}>
                    <div style={styles.leftContainer}>
                        <Clock value={this.state.date}/>
                    </div>
                    <div style={styles.rightContainer}>
                        <div style={styles.countDownContainer}>
                            <CountDown
                                initial={this.props.countdown}
                                onFinish={this.props.onFinish}
                            />
                        </div>
                        <div style={styles.textContainer}>
                            {this.props.text}
                        </div>
                    </div>
                </div>
                <Button 
                    style={styles.popOutButton} 
                    onClick={this.props.handleClose}
                >
                    Close
                </Button>
            </div>
        </Dialog>
      );
    }
  }

export default PopOutTimer;