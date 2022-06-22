import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Countries from "../../Assets/country.json";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  dialogTitleRoot: {
    fontSize: "20px",
  },
  dialog: {
    position: "absolute",
    // left: 10,
    top: 50,
  },
});

const AdminDetailsDialog = (props) => {
  const classes = useStyles();
  const { onClose, open, title } = props;

  const [countries, setCountries] = React.useState(Countries);
  const [searchText, setSearchText] = React.useState("");

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      classes={{
        paper: classes.dialog,
      }}
    >
      <DialogTitle classes={{ root: classes.dialogTitleRoot }}>
        {title}
      </DialogTitle>
      <List>
        <ListItem>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="outlined"
            style={{
              width: "450px",
            }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
              if (!event.target.value) {
                setCountries(Countries);
              } else {
                setCountries(
                  countries.filter((country) =>
                    (country.name + " ( +" + country.country_code + " )")
                      .toLowerCase()
                      .includes(event.target.value.toLowerCase())
                  )
                );
              }
            }}
            placeholder="Search Country"
          />
        </ListItem>
        {countries.map((country) => (
          <>
            <ListItem
              button
              onClick={() => handleListItemClick(country)}
              key={country}
            >
              <ListItemText
                primary={country.name + " ( +" + country.country_code + " )"}
              />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Dialog>
  );
};

export default AdminDetailsDialog;
