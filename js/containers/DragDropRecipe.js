import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import SwapIcon from '@material-ui/icons/SwapVert';
import TimeSelector from './TimeSelector';
import IconButton from '@material-ui/core/IconButton';

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const styles = {
  flexContainer: {
    display: "flex"
  },
  itemContent: {
    marginLeft: "10px",
  },
  avatar: {
    backgroundColor: "rgb(255, 212, 0)",
  }, 
  textField: {
    width:"100%",
  },
  textContainer: {
    marginLeft:"5%",
    width: "45%",
  },
  timeContainer: {
    width: "25%",
    marginLeft: "auto",
    marginRight: "0",
  },
  buttonContainer: {
    marginLeft: "auto",
    marginRight: "0",
  },
  iconContainer: {
    marginLeft: "auto",
    marginRight: "0",
  },
}

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
  borderRadius: "5px",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "rgb(224, 224, 222)",
  padding: grid,
  width: '100%',
  borderRadius: '5px',
});

class TextWrapper extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
    }
  }

  handleChange = event => {
    this.setState({
        value: event.target.value,
    })
  }

  render(){
    return(
      <div>
        <TextField
          style={styles.textField}
          value={this.state.value}
          onChange={this.handleChange}
          multiline={true}
        />
      </div>
    );
  }
}

class DragDropRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      refs: [],
      times: []
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  handleDelete = idx => {
    this.setState(prevState => ({
      items: prevState.items.filter((_, i) => i != idx),
      refs: prevState.refs.filter((_, i) => i != idx),
      times: prevState.times.filter((_, i) => i != idx),
    }));
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div style={styles.flexContainer}>
                        <div><Avatar style={styles.avatar}>{index+1}</Avatar></div>
                        <div style={styles.textContainer}><TextWrapper ref={this.state.refs[index]}/></div>
                        <div style={styles.timeContainer}> <TimeSelector ref={this.state.times[index]}/> </div>
                        <div style={styles.iconContainer}><Avatar><SwapIcon /></Avatar></div>
                        <div style={styles.buttonContainer}>
                          <IconButton onClick={() => this.handleDelete(index)}>
                            <DeleteIcon/>
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}


export default DragDropRecipe;