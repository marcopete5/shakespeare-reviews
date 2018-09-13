import React from 'react';

const Search = ({value, handleChange, children}) => {
    return (
        <form>
            <input type="text" value={value} onChange={handleChange} placeholder={children} />
        </form>
    );
};

export default Search;