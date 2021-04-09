import * as React from 'react'
import { Typography, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const Footer = () => {
    return (
        <Box alignSelf='center' mt={6} mb={6}>
            <Typography variant="caption" align="center">
                {`@ ${new Date().getFullYear()} Privacy Gang. All rights reserved.`}
            </Typography>
        </Box>
    )
}

const styles = {}

export default withStyles(styles)(Footer)