import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

const styles = {
    popoutContainer: {
        width: '500px'
    },
    popOutTitle: {
        width: '100%',
        textAlign: 'center'
    },
    popOutButton: {
        width: '100%',
        fontWeight: '1'
    },
    popOutText: {
        width: '100%',
        textAlign: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginTop: '20px',
        marginBottom: '60px'
    },
    icon: {
        paddingLeft: '0.5em',
        paddingRight: '0.5em',
        background: '#ff4486',
        color: '#fff',
        borderRadius: '6px',
        fontFamily: 'Oleo Script, serif',
    }
}

class PopOutText extends React.Component {  
    render() {
      return (
        <Dialog open={this.props.open} aria-labelledby="simple-dialog-title">
            <div style={styles.popoutContainer}>
                <div style={styles.popOutTitle}>
                    <DialogTitle>What is <span style={styles.icon}>Foodie</span>&nbsp;?</DialogTitle>
                </div>
                <div style={styles.popOutText}>
                    <span style={styles.icon}>Foodie</span> is a web-based application that scrapes online
                    recipes and allows you to save, rate, and create / edit your recipes! You can drag-and-drop 
                    steps, add ingredients, and delete items using this web interface. Login and start the fun!
                    <br></br>
                    <br></br>
                    Be sure try out <b>Feeling Lucky</b> to get a random recommended recipe for the day!
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

export default PopOutText;