import React from 'react';

const ProductTable = (props) => {
    return (
        <tr key={props.index}>
            <td>
                {props.item.sku}
            </td>
            <td>
                {props.item.name}
            </td>
            <td>
                {props.item.price}
            </td>
            <td>
                {props.item.type}
            </td>
        </tr>
    );
};

export default ProductTable;