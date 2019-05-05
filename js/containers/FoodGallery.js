import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
};


const tileData = [
    {img: "https://www.imagesource.com/Doc/IS0/Media/TR5/7/6/5/3/IS09AH9JZ.jpg"},
    {img: "https://www.imagesource.com/Doc/IS0/Media/TR5/7/6/5/3/IS09AH9JZ.jpg"},
    {img: "https://www.imagesource.com/Doc/IS0/Media/TR5/7/6/5/3/IS09AH9JZ.jpg"},
    {img: "https://www.imagesource.com/Doc/IS0/Media/TR5/7/6/5/3/IS09AH9JZ.jpg"},
];

function FoodGallery(props) {
  return (
    <div style={styles.root}>
      <GridList style={styles.gridList} cols={2}>
        {tileData.map((tile, idx)=> (
          <GridListTile key={idx}>
            <img src={tile.img} alt="hello" />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default FoodGallery;