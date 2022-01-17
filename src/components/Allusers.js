import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
];

const Allusers = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userlist, setUserList] = useState([]);

  useEffect(async () => {
    try {
      let data = await axios.get('https://node-appbackend.herokuapp.com/users');
      console.log(data);
      setUserList([...data.data]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchUsers = () => {
    axios.get('https://node-appbackend.herokuapp.com/users').then((data) => {
      console.log(data.data);
      setUserList([...data.data]);
    });
  };
  //Delete User
  const deleteHandler = async (id) => {
    try {
      console.log('Entered Delete Handler');
      console.log('the deleting id :' + id);
      let surity = window.confirm('Are you sure,to delete Data ?');
      if (surity) {
        await axios.delete(`https://node-appbackend.herokuapp.com/users/delete/${id}`);
        fetchUsers();
      }
    } catch (error) {
      console.log('Deleitng time error');
    }
  };

  return (
    <>
      <h4 style={{ margin: '20px' }}>Users list</h4>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Designation</TableCell>
              <TableCell align="right">Salary</TableCell>
              <TableCell align="right">Experience(In Years)</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userlist.map((row) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.designation}</TableCell>
                <TableCell align="right">{row.salary}</TableCell>
                <TableCell align="right">{row.experience}</TableCell>
                <TableCell align="right">
                  <Link to={`/edituser/${row._id}`}>
                    <Button size="small" variant="contained">
                      EDIT
                    </Button>
                  </Link>
                  &nbsp;
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => deleteHandler(row._id)}
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Allusers;
