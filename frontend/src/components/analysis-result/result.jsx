import React, { useContext } from "react";
import {
  Accordion,
  Box,
  Button,
  Modal,
  Typography,
} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { VideoContext } from "../../contexts/VideoContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const placeholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan nisi nunc. Quisque ut gravida odio, egestas convallis nunc. Etiam scelerisque in dolor eu lacinia. Curabitur odio dolor, lacinia a neque nec, condimentum cursus felis. Sed quis odio sit amet justo mollis rhoncus. Nam sit amet lorem vitae arcu tempus finibus. Integer vitae iaculis sem, et mollis augue. Nullam purus elit, aliquam in maximus eu, pulvinar quis diam. Integer eu mi vitae elit iaculis faucibus. Maecenas dapibus efficitur risus. Ut eget odio et nibh mollis accumsan id tincidunt ligula. Morbi facilisis nunc lacus, ac luctus justo consequat id.";

export default function Result() {
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { seekToTimestamp } = useContext(VideoContext);
    const handleSetTimestamp = (x) => {
      seekToTimestamp(x); // Seek to 10 seconds
    };
    const getStamp = (x) => {
      const hr = Math.floor(Math.floor(x / 60) / 60);
      const min = (Math.floor(x / 60) % 60).toString().padStart(2, '0');
      const sec = (x % 60).toString().padStart(2, '0');
      return "" + hr + ":" + min + ":" + sec;
    }

    return (
      <Box sx={{
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Summary Section */}
        <Typography variant="h6" mb="10px">
            Summary
        </Typography>
        <Button
          variant="contained"
          aria-label="outlined primary button group"
          component="label"
          tabIndex={-1}
          startIcon={<TextSnippetIcon />}
          sx={{ width: "200px", height: "50px", mb: "50px" }}
          onClick={handleOpen}
        >
          View Summary
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Video Summary
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {placeholder}
            </Typography>
          </Box>
        </Modal>

        {/* Timestamps List */}
        <Box sx={{
          width: '100%',
          maxWidth: 600,
          margin: '0 auto',
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <Typography variant="h6" mb="10px">
            Notable Timestamps
          </Typography>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">{getStamp(15)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button sx={{ textTransform: "none" }} onClick={() => handleSetTimestamp(15)}>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component="span">{getStamp(5286)}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Button sx={{ textTransform: "none" }} onClick={() => handleSetTimestamp(5286)}>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </Typography>
                </Button>
              </AccordionDetails>
            </Accordion>
          </div>
        </Box>
      </Box>
    );
}