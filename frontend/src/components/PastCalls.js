import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    'Elvis Presley',
    '16 Mar, 2019',
    'Tupelo, MS',
    '1 star',
  ),
  createData(
    1,
    'Elvis Presley',
    '16 Mar, 2019',
    'Tupelo, MS',
    '1 star',
  ),
  createData(2, 'Tom Scholz', '16 Mar, 2019','Boston, MA', '1 star'),
  createData(
    3,
    'Elvis Presley',
    '16 Mar, 2019',
    'Tupelo, MS',
    '1 star',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function PastCalls() {
  return (
    <React.Fragment>
      <Title>Recent Calls</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
     
            <TableCell>Name</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time Slot</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
