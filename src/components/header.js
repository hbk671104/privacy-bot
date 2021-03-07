import * as React from 'react'
import { StaticImage } from "gatsby-plugin-image"
import { Typography, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const Header = ({ classes }) => {
    return (
        <Box height={108} display='flex' flexDirection='row' alignItems='center'>
            <Box>
                <StaticImage
                    src="../images/logo-bot.png"
                    placeholder='blurred'
                    height={72}
                    width={72}
                    alt="the logo bot"
                />
            </Box>
            <Box ml={3}>
                <Typography className={classes.title} variant='h6'>
                    PrivacyBot
                </Typography>
                <Typography className={classes.subtitle} variant='body2'>
                    Your privacy. Guaranteed.
                </Typography>
            </Box>
        </Box>
    )
}

const styles = {
    title: {
        color: 'white',
        fontWeight: 'bold'
    },
    subtitle: {
        color: 'white'
    },
}

export default withStyles(styles)(Header)