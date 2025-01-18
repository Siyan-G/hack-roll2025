import React from "react";
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

export default function Result() {
    const placeholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan nisi nunc. Quisque ut gravida odio, egestas convallis nunc. Etiam scelerisque in dolor eu lacinia. Curabitur odio dolor, lacinia a neque nec, condimentum cursus felis. Sed quis odio sit amet justo mollis rhoncus. Nam sit amet lorem vitae arcu tempus finibus. Integer vitae iaculis sem, et mollis augue. Nullam purus elit, aliquam in maximus eu, pulvinar quis diam. Integer eu mi vitae elit iaculis faucibus. Maecenas dapibus efficitur risus. Ut eget odio et nibh mollis accumsan id tincidunt ligula. Morbi facilisis nunc lacus, ac luctus justo consequat id. Maecenas fringilla.";
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
      <Box sx={{
        width: '100%',
        maxWidth: 600,
        margin: '0 auto',
        p: 2,
        overflow: "auto",
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        
        {/* Summary Section */}
        <Button
          variant="contained"
          aria-label="outlined primary button group"
          component="label"
          tabIndex={-1}
          startIcon={<TextSnippetIcon />}
          sx={{ width: "200px", mb: "50px" }}
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
        <Box>
          <Typography variant="h6">
            Timestamps
          </Typography>
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography component="span">Accordion 1</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography component="span">Accordion 2</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </Box>
      </Box>
    );
}