import React from 'react';
import Avatar from '@material-ui/core/Avatar';

class AvatarTitle extends React.Component {
    render(){
        return(
            <div className="avatar-title-container">
                <Avatar>{this.props.icon}</Avatar>
                <h2 className="avatar-title-heading">{this.props.heading}</h2>
            </div>
        );
    }
}

export default AvatarTitle;