// load init script
import '../utils/init'

import * as React from 'react'
import AV from 'leancloud-storage'
import { StaticImage } from "gatsby-plugin-image"
import {
  Typography,
  Box,
  Button,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress
} from '@material-ui/core'
import {
  withStyles
} from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import Layout from '../components/layout'

class Index extends React.Component {

  state = {
    email: '',
    dialogOpen: false,
    notificationShown: false,
    submitting: false
  }

  componentDidMount() {

  }

  toggleDialog = () => {
    this.setState((prevState) => ({
      dialogOpen: !prevState.dialogOpen
    }))
  }

  submitEmail = async email => {
    const entry = new AV.Object('MailingList');
    entry.set('email', email)
    this.setState({ submitting: true })
    try {
      await entry.save()
      this.setState({
        email: '',
        notificationShown: true,
        dialogOpen: false,
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        submitting: false
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const { email } = this.state
    if (email) {
      this.submitEmail(email)
    }
  }

  handleEmailChange = e => {
    e.preventDefault()
    this.setState({
      email: e.target.value
    })
  }

  renderDialog = () => {
    const { dialogOpen, email, submitting } = this.state
    return (
      <Dialog
        open={dialogOpen}
        onClose={this.toggleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Invitation Only</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This service is currently in closed beta. If you would like to receive an invitation, please enter your email. We will never sell or share your email with any third party.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={this.handleEmailChange}
            value={email}
          />
        </DialogContent>
        <DialogActions>
          <Box height={48} width={60} mr={1} display='flex' justifyContent='center' alignItems='center'>
            {
              submitting ?
                <CircularProgress size={24} />
                :
                <Button onClick={this.handleSubmit} color="primary">
                  Submit
                </Button>
            }
          </Box>
        </DialogActions>
      </Dialog>
    )
  }

  renderNotification = () => {
    const { notificationShown } = this.state
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={notificationShown}
        onClose={() => {
          this.setState({
            notificationShown: false
          })
        }}
        message="Added to mailing list."
        autoHideDuration={3000}
      />
    )
  }

  render() {
    const { classes } = this.props
    return (
      <Layout title='PrivacyBot: Your privacy. Guaranteed.'>
        <Box>
          <Box>
            <Box display='flex' flexDirection='row' pt={3}>
              <Box flex={1}>
                <Typography variant='h3' gutterBottom>
                  Did another data breach expose your personal information?
                  </Typography>
                <Typography className={classes.subtitle} variant='h6' color='secondary'>
                  PrivacyBot helps you take back control of your personal information held by social media, big tech companies, and data brokers.
                </Typography>
              </Box>
              <Box flex={1}>
                <StaticImage
                  src="../images/company-logos.png"
                  placeholder='blurred'
                  // height={300}
                  // width={500}
                  alt="rogue company logos"
                />
              </Box>
            </Box>
            <Box mt={3} display='flex' justifyContent='center'>
              <Button
                color='primary'
                variant="contained"
                size="large"
                onClick={this.toggleDialog}
              >
                Get Started
                  </Button>
            </Box>
          </Box>
          <Box display='flex' flexDirection='column' alignItems='center' mt={6}>
            <Box width='60%' mb={3}>
              <Typography variant='h5'>
                We facilitate the following personal data requests to social media, big tech companies, and data brokers:
                </Typography>
            </Box>
            <Box>
              <Box display='flex' flexDirection='row' alignItems='center'>
                <CheckCircleIcon color='primary' />
                <Box ml={1}>
                  <Typography color='secondary'>
                    Access your info
                  </Typography>
                </Box>
              </Box>
              <Box mt={1} display='flex' flexDirection='row' alignItems='center'>
                <CheckCircleIcon color='primary' />
                <Box ml={1}>
                  <Typography color='secondary'>
                    Delete your info
                  </Typography>
                </Box>
              </Box>
              <Box mt={1} display='flex' flexDirection='row' alignItems='center'>
                <CheckCircleIcon color='primary' />
                <Box ml={1}>
                  <Typography color='secondary'>
                    Tell them not to sell your info
                  </Typography>
                </Box>
              </Box>
              <Box mt={1} display='flex' flexDirection='row' alignItems='center'>
                <CheckCircleIcon color='primary' />
                <Box ml={1}>
                  <Typography color='secondary'>
                    Get a personalized privacy analysis (optional)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {this.renderDialog()}
        {this.renderNotification()}
      </Layout >
    )
  }
}

const styles = {
  subtitle: {
    fontWeight: 'normal'
  }
}

export default withStyles(styles)(Index)