import React from "react";
import {
  Box,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Delete,
  FiberManualRecord,
} from "@material-ui/icons";
import { ROOM_BASE_URL } from "../../Utils/Config";

const TableData = (props) => {
  const { row, handleRoomDataDelete, width } = props;
  const [open, setOpen] = React.useState(false);
  const adminDetails = JSON.parse(row.AdminDetails.replaceAll("'", '"'));
  return (
    <React.Fragment>
      <TableRow hover>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        {width < 770 && (
          <TableCell>
            <b
              className={
                row.users && row.users.items.length
                  ? "activeclass"
                  : "activeclass red"
              }
            >
              <FiberManualRecord size="small" />
            </b>
          </TableCell>
        )}
        <TableCell>{row.name}</TableCell>
        {width > 770 && (
          <>
            <TableCell align="center">
              <b
                className={
                  row.users && row.users.items.length
                    ? "activeclass"
                    : "activeclass red"
                }
              >
                <FiberManualRecord size="small" />
              </b>
            </TableCell>
            {width > 1300 && (
              <TableCell>
                <a
                  rel="noopener noreferrer"
                  href={`${ROOM_BASE_URL}rooms/${row.id}`}
                  target="_blank"
                >
                  {`${ROOM_BASE_URL}rooms/${row.id}`}
                </a>
              </TableCell>
            )}
            <TableCell align="center">{row.userLimit}</TableCell>
            <TableCell>{adminDetails.password}</TableCell>
          </>
        )}
        <TableCell>
          <IconButton
            className="delete"
            aria-label="delete"
            onClick={handleRoomDataDelete}
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
          className="collapse-box"
        >
          <Collapse
            className="open_accordian"
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <Box>
              {width < 1300 && (
                <>
                  <div>
                    <Typography gutterBottom component="div">
                      Room URL:
                    </Typography>
                    <a
                      rel="noopener noreferrer"
                      href={`${ROOM_BASE_URL}rooms/${row.id}`}
                      target="_blank"
                    >
                      {`${ROOM_BASE_URL}rooms/${row.id}`}
                    </a>
                  </div>
                </>
              )}
              {width < 770 && (
                <>
                  <div>
                    <Typography gutterBottom component="div">
                      Users Limit:
                    </Typography>
                    <p>{row.userLimit}</p>
                  </div>
                  <div>
                    <Typography gutterBottom component="div">
                      Room Password:
                    </Typography>
                    <p>{adminDetails.password}</p>
                  </div>
                </>
              )}
              <div>
                <Typography gutterBottom component="div">
                  Admin emails list:
                </Typography>
                <ol>
                  {adminDetails.email &&
                    adminDetails.email.map((email) => (
                      <li className="admin-list" key={email}>
                        {email}
                      </li>
                    ))}
                </ol>
              </div>
              <div>
                <Typography gutterBottom component="div">
                  Away Message:
                </Typography>
                <p>{row.AwayMessage}</p>
              </div>
              <div>
                <Typography gutterBottom component="div">
                  Want to Hide Away Message after admin join's the room?
                </Typography>
                <p>{row.isAdminAwayMessage ? "Yes" : "No"}</p>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default TableData;
