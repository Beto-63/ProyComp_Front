import React, { useContext, useState } from 'react';
import SellTicketContext from '../../context/SellTicketContext';

import ProductSelectForm from './CatAndTempSalection';
import ProductSelectTable from './ProductSelectTable';


const STProductSelect = () => {




  return (
    <div>
      <ProductSelectForm />
      {/* <ProductSelectTable /> */}
    </div>
  );
};

export default STProductSelect;
