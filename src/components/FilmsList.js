import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const FilmsList = ({films}) => {

    return (
        <>
        <label>List of movies:</label>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', border: '0.5px solid black'}}>
            <List>
                {
                    films && films.map((item,index)=>{
                        return (
                            <ListItem key={index} >
                                <ListItemText primary={item.title} />
                            </ListItem>
                        );
                    })
                }
            </List>
        </Box>
      </>
    )
}

export default FilmsList;