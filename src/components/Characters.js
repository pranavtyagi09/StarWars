import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



const Characters = ({handleChange, people}) => {

    return (
        <>
            <InputLabel id="character">Character</InputLabel>
            <Select
            labelId="character"
            onChange={handleChange}
            >
                {
                people[0] && people[0].map((item, index)=>{
                    return (<MenuItem key={index} value={index}>{item.name}</MenuItem>);
                })
            }
            </Select>
        </>
    );
}

export default Characters;