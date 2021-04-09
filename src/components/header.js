import * as React from 'react'
import { StaticImage } from "gatsby-plugin-image"
import { Box, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const Header = ({ classes }) => {
    return (
        <Box height={108} display='flex' flexDirection='row' alignItems='center'>
            <Box display='flex' flexDirection='row' alignItems='flex-end'>
                <StaticImage
                    src="../images/logo-bot.png"
                    placeholder='blurred'
                    height={72}
                    width={72}
                    alt="the logo bot"
                />
                <Box ml={1}>
                    <Typography variant='h5' style={{ fontFamily: 'Comfortaa', fontWeight: 'bold' }}>
                        PrivacyBot
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

const styles = {}

export default withStyles(styles)(Header)