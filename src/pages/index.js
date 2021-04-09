// load init script
import '../utils/init'

import * as React from 'react'
import AV from 'leancloud-storage'
import { Link } from 'gatsby'
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
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from '@material-ui/core'
import {
  withStyles
} from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

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

  renderProductMission = () => {
    return (
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
    )
  }

  renderFAQ = () => {
    const { classes } = this.props
    return (
      <Box display='flex' flexDirection='column'>
        <Box alignSelf='center'>
          <Typography variant='h4'>
            <Link id='faq'>Frequently Asked Questions</Link>
          </Typography>
        </Box>
        <Box mt={6}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Who built and runs this service?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color='secondary'>
                The PrivacyGang is a group of four students at Cornell Tech who want to make privacy convenient.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Why am I able to file requests to access, delete, and opt-out of sale of my information?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color='secondary'>
                <a href='https://gdpr-info.eu/' target='_blank' rel="noreferrer">General Data Privacy Regulation</a>, <a href='https://oag.ca.gov/privacy/ccpa' target='_blank' rel="noreferrer">California Consumer Privacy Act</a>, and other similar legislation are forcing internet companies to provide more information and control to consumers.  Many of the largest companies are providing these rights to all consumers in the US and in the EU.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Do I need PrivacyBot to file these requests?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color='secondary'>
                No. We just make it easier.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>How does PrivacyBot make money?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color='secondary'>
                Right now we don’t. We’re just a bunch of graduate students trying to see if anyone wants a service like this. If people do and we need to scale, we plan to engage our users and the broader privacy community while figuring out where money would come from.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Will PrivacyBot, now or in the future, sell or share any of my information with outside parties?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color='secondary'>
                No. That is the exact opposite of our purpose.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Does PrivacyBot collect or retain any of my information?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color='secondary'>
                If you sign up to receive emails from us, we will retain and use that email to send you email communications.  (We do not use this email to create profiles or otherwise). You can unsubscribe using the link at the bottom of all PrivacyBot emails. We will only use this email. Otherwise, no, we do not collect or retain your information.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color='primary' />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Does PrivacyBot use any ad tech, such as cookies or trackers?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color='secondary'>
                Of course not. You can verify this with services such as <a href='https://disconnect.me/disconnect' target='_blank' rel="noreferrer">Disconnect.</a>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box >
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
          {this.renderProductMission()}
          <Box mt={6} mb={6}>
            <Divider />
          </Box>
          {this.renderFAQ()}
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