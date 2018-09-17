import React from 'react';

const Search = ({value, handleChange, children}) => {
    return (
        <form style={{margin: 'auto', width: '524px'}}>
            <input type="text" 
                   value={value} 
                   onChange={handleChange} 
                   placeholder={children} 
                   style={{marginTop: '20px', 
                           padding: '5px',
                           width: '215px'}} />
        </form>
    );
};

export default Search;