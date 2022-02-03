import React, { useContext, useState } from 'react';
import SellTicketContext from '../../context/SellTicketContext';

import ProductSelectForm from './ProductSelectForm';
import ProductSelectTable from './ProductSelectTable';


const STProductSelect = () => {
  const { getProductByCatName } = useContext(SellTicketContext)
  //estado que va a almacenar en un arreglo los datos del ProductForm 
  const [product, setProduct] = useState([]);
  //Manejador para el Producto
  const handleProduct = (objProduct) => {
    //Utilizar funcion del contexto
    getProductByCatName(objProduct).then(async resp => {
      let json = await resp.json();
      //almacenar los objetos recibidos del ClientForm en un array
      let array = [...product, objProduct]
      setProduct(array)
    });
  }
  return (
    <div>
      <ProductSelectForm handleProduct={handleProduct} />
      <ProductSelectTable />
    </div>
  );
};

export default STProductSelect;
