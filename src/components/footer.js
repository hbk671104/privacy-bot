import * as React from 'react'
import { Typography, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const Footer = ({ classes }) => {
    return (
        <Box alignSelf='center' mt={3} mb={3}>
            <Typography className={classes.copyright} variant="caption" align="center">
                {`@ ${new Date().getFullYear()} Privacy Gang. All rights reserved.`}
            </Typography>
        </Box>
    )
}

const styles = {
    copyright: {
        color: '#A9A9A9'
    }
}

export default withStyles(styles)(Footer)