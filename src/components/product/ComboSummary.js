import React, { useContext } from 'react'
import ProductContext from '../../context/ProductContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

const ComboSummary = () => {

    const { productsArray, setProductsArray, name } = useContext(ProductContext);

    const handleDelete = (clear) => {
        let array = productsArray.filter((item) => (item.name !== clear))
        setProductsArray(array)

    }
    // TODO Hacer que no aparezcan las infusiones por default tal vez con default valye en el select
    return (
        <div>
            <label>Asi quedará conformado el Combo</label>
            <br />
            <p>{`Nombre del Combo : ${name}`}</p>
            <table className='center'>
                <thead>
                    <tr>
                        <th><p> # </p></th>
                        <th><p> Nombre </p></th>
                        <th><p> Unidades </p></th>
                        <th><p>  </p></th>
                    </tr>
                </thead>
                <tbody>
                    {productsArray.map((e, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{e.name}</td>
                                <td>{e.quantity}</td>
                                <td>
                                    <button className='btn-light-bkg-tall' onClick={() => handleDelete(e.name)} >
                                        <FontAwesomeIcon icon={faCircleXmark} size="2x" />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ComboSummary