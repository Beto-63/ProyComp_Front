import React from 'react';

import ProductSelectForm from '../components/sellTicket/ProductSelectForm';
import ProductSelectTable from '../components/sellTicket/ProductSelectTable';

const ProductSelect = () => {
  return (
    <div>
      <ProductSelectForm/>
      <ProductSelectTable/>
    </div>
  );
};

export default ProductSelect;
