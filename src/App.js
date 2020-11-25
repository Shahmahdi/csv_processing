import "./App.css";
import { Tabs, Tab, makeStyles, Box } from "@material-ui/core";
import { FileUpload } from "./components/FileUpload";
import { useState } from "react";
import { MakeCsv } from "./components/MakeCsv";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function App() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Upload CSV" {...a11yProps(0)} />
        <Tab label="Make CSV" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FileUpload />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MakeCsv />
      </TabPanel>
    </div>
  );
}

export default App;
