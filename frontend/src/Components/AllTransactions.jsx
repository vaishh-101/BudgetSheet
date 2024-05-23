import { Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({
    _id: "",
    title: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://192.168.166.218:5000/transactions"
      );
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.166.218:5000/transactions/${id}`);
      Swal.fire({
        title: 'Deleted!',
        text: 'Transaction has been deleted.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete transaction.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  const handleUpdate = (transaction) => {
    setCurrentTransaction({
      _id: transaction._id,
      title: transaction.title,
      amount: transaction.amount,
      category: transaction.category,
    });
    setEditDialogOpen(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setCurrentTransaction({ ...currentTransaction, [name]: value });
  };

  const handleEditSave = async () => {
    const { _id, title, amount, category } = currentTransaction;
    try {
      await axios.put(`http://192.168.166.218:5000/transactions/${_id}`, {
        title,
        amount,
        category,
      });
      setEditDialogOpen(false);
      Swal.fire({
        title: 'Updated!',
        text: 'Transaction has been updated.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      fetchTransactions(); 
    } catch (error) {
      console.error("Error updating transaction", error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update transaction.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  };

  return (
    <Container style={{ marginBottom: 75, marginTop: 75
     }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleUpdate(transaction)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(transaction._id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={currentTransaction.title}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Amount"
            name="amount"
            type="number"
            value={currentTransaction.amount}
            onChange={handleEditChange}
            fullWidth
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={currentTransaction.category}
              onChange={handleEditChange}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Grocery">🛒 Grocery</MenuItem>
              <MenuItem value="Courses">📚 Courses</MenuItem>
              <MenuItem value="Food">🍕 Food</MenuItem>
              <MenuItem value="Salary">💵 Salary</MenuItem>
              <MenuItem value="Shopping">🛍️ Shopping</MenuItem>
              <MenuItem value="Travelling">✈ Travelling</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AllTransactions;
