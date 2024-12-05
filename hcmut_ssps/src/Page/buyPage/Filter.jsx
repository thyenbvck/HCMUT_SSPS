import React from 'react';

function Filter(props) {
    const handleLoaiChange = (event) => {
        props.onLoaiChange && props.onLoaiChange(event.target.value);
    };

    const handleSetQuantity = (event) => {
        props.onQuantity && props.onQuantity(event.target.value);
    };

    return (
        <span className="filter">
            <label htmlFor="loai">Loại giấy:</label>
            <select id="loai" onChange={handleLoaiChange}>
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="A2">A2</option>
            </select>

            <label htmlFor="quantity">Số lượng:</label>
            <input id="quantity" onChange={handleSetQuantity} />
        </span>
    );
}

export default Filter;