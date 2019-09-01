import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Line } from 'react-chartjs-2';

import './Billing.scss'
import Save from '../custom/Save'

const Content = () => {
  const styleDangerZone: React.CSSProperties = {
    border: '1px solid #ff0000',
    padding: '16px 24px',
  }

  const ProfileImageStyle: React.CSSProperties = {
    maxWidth: '250px',
    height: 'auto',
    fill: '#f5f5f5',
  }

  const chartStyle: React.CSSProperties = {
    width: '100%',
    height: '250px',
  }

  const cardContainerStyle: React.CSSProperties = {
    margin: '1em 0',
  }

  const chartData = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan, 2019', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'User',
        borderColor: 'rgba(0, 149, 221, 1)',
        backgroundColor: 'rgba(0, 149, 221, 0.2)',
        data: [4, 4, 4, 2, 5, 7, 7, 7, 8, 9, 10, 11],
      },
    ],
  }

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
        }
      }]
    }
  }

  return (
    <div>
      <Paper>
        <Typography component="h2" className="module-title">Payment history</Typography>
        <div style={chartStyle}>
          <Line data={chartData} options={chartOptions} />
        </div>

        <Typography component="h2" className="module-title">Your subscriptions</Typography>
        <div className="billing-container">
          <div className="item">
            <h3 className="title">Price per user/month</h3>
            <p className="value">$6.0</p>
          </div>
          <div className="item">
            <h3 className="title">Users</h3>
            <p className="value">11</p>
          </div>
          <div className="item">
            <h3 className="title">Amount</h3>
            <p className="value amount">$66.0</p>
            <p className="billed-on">Billed monthly on<br />Oct 1st, 2019</p>
          </div>
        </div>

        <Typography component="h2" className="module-title">Payment information</Typography>
        <Table className="payment-info">
          <TableBody>
          <TableRow>
              <TableCell component="th" scope="row">Payment method:</TableCell>
              <TableCell>Visa ending in 1111</TableCell>
              <TableCell align="right"><Save label="Change payment method" /></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Coupon:</TableCell>
              <TableCell>$200.0</TableCell>
              <TableCell align="right"><Save label="Redeem a coupon" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default Content;
