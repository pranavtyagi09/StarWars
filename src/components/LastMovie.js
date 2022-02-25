import React, {useState, useEffect} from 'react';

const LastMovie = ({films}) => {

    const [sortedFilms, setSortedFilms] = useState();
    let filmsArr = [...films];
    useEffect(()=>{
        if(films){
            filmsArr.sort((a,b)=>{
                return new Date(b.release_date) - new Date(a.release_date);
            });
            setSortedFilms(filmsArr);
        }
    },[films])

    return (
    <>
        <label>Name/Year last movie:</label>
        {sortedFilms && sortedFilms[0] && sortedFilms[0].title && 
            <p>{sortedFilms[0].title} - {sortedFilms[0].release_date.substring(0, 4)}</p>
        }
    </>
    );
}

export default LastMovie;