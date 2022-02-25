import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Characters from './Characters';
import FilmsList from './FilmsList';
import LastMovie from './LastMovie';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCharacters, selectChar, fetchFilms, selectFilms, loading} from '../redux/reducer/formSlice';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  rootPadding: {
    padding: '1em',
  }
}));

const Form = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const people = useSelector(selectChar);
  const films = useSelector(selectFilms);
  const status = useSelector(loading);
  const [filmsAPI, setFilmsApi] = useState();

  useEffect(()=>{
      dispatch(fetchCharacters());
    },[])

  useEffect(()=>{
    if(filmsAPI){
       dispatch(fetchFilms(filmsAPI));
    }
  },[filmsAPI])

  const handleCharSelect = (event) => {
    const charIndex = event.target.value;
    setFilmsApi(people[0][charIndex].films)
  };

    return (
        <Box maxWidth="sm" className={classes.rootPadding} >
          <FormControl fullWidth className={classes.formControl}>
            <Characters handleChange={handleCharSelect} people={people} />
              <br/>
            {status && status === 'loading' ?
              <LinearProgress /> :
            <>
              <FilmsList films={films}/>
              <br/>
              <LastMovie films={films}/>
            </>
            }
          </FormControl>
        </Box>
    )
}

export default Form;