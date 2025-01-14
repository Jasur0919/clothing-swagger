import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import editImg from "../../../assets/edit.svg";
import deleteImg from "../../../assets/delete.svg";
import { worker } from "@service";
import { WorkerModal } from "@modal";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0077b6",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function WorkerTable({ data, setData }) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setOpen(false);
  };

  const handleDelete = async (id) => {
    const response = await worker.delete(id);
    if (response.status === 200) {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>T / R</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {item.first_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.gender}</StyledTableCell>
                <StyledTableCell align="center">
                  {item.last_name}
                </StyledTableCell>
                <StyledTableCell align="center">{item.age}</StyledTableCell>
                <StyledTableCell className="flex" align="center">
                  <div className="flex items-center space-x-4 justify-center">
                    {/* <img
                      onClick={() => handleOpen(item)}
                      src={editImg}
                      alt="bir"
                      className="cursor-pointer hover:scale-125 transition-all duration-200"
                    /> */}
                    <MdOutlineEdit onClick={() => handleOpen(item)}
                      src={editImg}
                      alt="bir"
                      className="cursor-pointer hover:scale-125 transition-all duration-200 text-[25px] text-blue-600"/>
                    {/* <img
                      onClick={() => handleDelete(item.id)}
                      src={deleteImg}
                      alt=""
                      className="cursor-pointer hover:scale-125 transition-all duration-200"
                    /> */}
                    <FaTrashAlt onClick={() => handleDelete(item.id)}
                      src={deleteImg}
                      alt=""
                      className="cursor-pointer hover:scale-125 transition-all duration-200 text-red-600 text-[20px]"/>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <WorkerModal
        open={open}
        handleClose={handleClose}
        item={selectedItem}
        setData={setData}
      />
    </>
  );
}
