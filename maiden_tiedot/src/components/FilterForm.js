import React from 'react';

const FilterForm = ( {text, value, handler} ) => {
    return (
        <div>
            {text} <input value={value} onChange={handler} />
        </div>
    )
}

export default FilterForm