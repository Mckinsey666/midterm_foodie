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
        textAlign: 'center',
    },
    popOutButton: {
        width: '100%',
        fontWeight: '1'
    },
    image: {
        width: "100%"
    }
}

class PopOutImage extends React.Component {  
    render() {
      return (
        <Dialog open={this.props.open} aria-labelledby="simple-dialog-title">
            <div style={styles.popoutContainer}>
                <div style={styles.popOutTitle}>
                    <DialogTitle>Image Preview</DialogTitle>
                </div>
                <img style={styles.image} src={this.props.src} />
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

export default PopOutImage;