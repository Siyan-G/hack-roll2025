import React from "react";
import {
  Accordion,
  Box,
  Typography,
} from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Result() {
  const placeholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque accumsan nisi nunc. Quisque ut gravida odio, egestas convallis nunc. Etiam scelerisque in dolor eu lacinia. Curabitur odio dolor, lacinia a neque nec, condimentum cursus felis. Sed quis odio sit amet justo mollis rhoncus. Nam sit amet lorem vitae arcu tempus finibus. Integer vitae iaculis sem, et mollis augue. Nullam purus elit, aliquam in maximus eu, pulvinar quis diam. Integer eu mi vitae elit iaculis faucibus. Maecenas dapibus efficitur risus. Ut eget odio et nibh mollis accumsan id tincidunt ligula. Morbi facilisis nunc lacus, ac luctus justo consequat id. Maecenas fringilla.";
    return (
      <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', p: 2, overflow: "auto", }}>
        

        {/* Summary Section */}
        <Box sx={{ my: 3, p: 2, bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2 }}>
          <Typography variant="h6">
            Summary
          </Typography>
          <Typography variant="body1">{placeholder}</Typography>
        </Box>

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