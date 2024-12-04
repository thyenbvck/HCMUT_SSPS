import React from 'react';
function Filter(props) {
    const handleLoaiChange = (event) => {
        props.onLoaiChange(event.target.value);
    };

    const handleNhaCungCapChange = (event) => {
        props.onNhaCungCapChange(event.target.value);
    };

    const handleSapXepChange = (event) => {
        props.onSapXepChange(event.target.value);
    };
    return (
        <span className="filter">
            <label htmlFor="loai">Loại giấy:</label>
            <select id="loai" onChange={handleLoaiChange}>
                <option value="A4">A4</option>
                <option value="A3">A3</option>
                <option value="A2">A2</option>
            </select>
        </span>
    );
}

export default Filter;