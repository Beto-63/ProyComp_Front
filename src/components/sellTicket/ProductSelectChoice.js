import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ProductSelectChoice = () => {
  return (
  <div>
      <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Qty</th>
                            <th colSpan={2}>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Café en leche</td>
                            <td>10</td>
                            <td>5.000</td>
                            <td>Eliminar</td>
                        </tr>
                        <tr>
                            <td>Tinto Negro</td>
                            <td>4</td>
                            <td>4.000</td>
                            <td>Eliminar</td>
                        </tr>
                    </tbody>
                </Table>
                <Button href='/productSelect' type="submit">Validar</Button>
  </div>
  );
};

export default ProductSelectChoice;
