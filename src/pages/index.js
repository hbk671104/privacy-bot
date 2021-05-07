// load init script
import "../utils/init"

import * as React from "react"
import AV from "leancloud-storage"
// import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import {
  Typography,
  Box,
  Button,
  Snackbar,
  Dialog,
  // DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import Layout from "../components/layout"

class Index extends React.Component {
  state = {
    email: "",
    dialogOpen: false,
    notificationShown: false,
    submitting: false,
  }

  componentDidMount() {}

  toggleDialog = () => {
    this.setState(
      prevState => ({
        dialogOpen: !prevState.dialogOpen,
      }),
      () => {
        if (this.state.dialogOpen) {
          this.recordGetStartedClick()
        }
      }
    )
  }

  submitEmail = async email => {
    const entry = new AV.Object("MailingList")
    entry.set("email", email)
    this.setState({ submitting: true })
    try {
      await entry.save()
      this.setState({
        email: "",
        notificationShown: true,
        dialogOpen: false,
      })
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({
        submitting: false,
      })
    }
  }

  recordGetStartedClick = async () => {
    const click = new AV.Object("UserBehavior")
    click.set("event", "get_started_button_click")
    try {
      await click.save()
    } catch (error) {
      console.error(error)
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
      email: e.target.value,
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
        {/* <DialogTitle id="alert-dialog-title">Enter your email for an invite to our closed beta service.</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Enter your email for an invite to our closed beta service.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            // label="Email Address"
            type="email"
            fullWidth
            onChange={this.handleEmailChange}
            value={email}
          />
          <Box mt={3}>
            <DialogContentText id="alert-dialog-description">
              PrivacyBot will never sell or share your email.
            </DialogContentText>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            height={48}
            width={60}
            mr={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {submitting ? (
              <CircularProgress size={24} />
            ) : (
              <Button onClick={this.handleSubmit} color="primary">
                Submit
              </Button>
            )}
          </Box>
        </DialogActions>
      </Dialog>
    )
  }

  renderNotification = () => {
    const { notificationShown } = this.state
    return (
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={notificationShown}
        onClose={() => {
          this.setState({
            notificationShown: false,
          })
        }}
        message="Added to invitation list."
        autoHideDuration={3000}
      />
    )
  }

  renderProductMission = () => {
    const { classes } = this.props
    return (
      <Box
        className={classes.productMisson}
        display="flex"
        flexDirection="column"
      >
        <Box>
          <Typography className={classes.title} variant="h4">
            How PrivacyBot Can Help
          </Typography>
        </Box>
        <Box mt={2}>
          <Box display="flex" flexDirection="row" alignItems="center">
            <CheckCircleIcon color="primary" />
            <Box ml={1}>
              <Typography color="secondary">
                Instruct companies not to sell your info
              </Typography>
            </Box>
          </Box>
          <Box mt={1} display="flex" flexDirection="row" alignItems="center">
            <CheckCircleIcon color="primary" />
            <Box ml={1}>
              <Typography color="secondary">Access your info</Typography>
            </Box>
          </Box>
          <Box mt={1} display="flex" flexDirection="row" alignItems="center">
            <CheckCircleIcon color="primary" />
            <Box ml={1}>
              <Typography color="secondary">Delete your info</Typography>
            </Box>
          </Box>
          <Box mt={1} display="flex" flexDirection="row" alignItems="center">
            <CheckCircleIcon color="primary" />
            <Box ml={1}>
              <Typography color="secondary">
                Get our Personal Privacy Analysis (optional)
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
      <Box display="flex" flexDirection="column">
        <Box className={classes.faqTitle} alignSelf="center" mt={6}>
          <Typography variant="h4" align="center">
            <a id="faq">Frequently Asked Questions</a>
          </Typography>
        </Box>
        <Box mt={6}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Does PrivacyBot make money?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="secondary">
                Right now, we don’t. We’re donating our time because we believe
                this service should exist. If we grow to need funding, we will
                engage our users to figure out what they’re comfortable with.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                What would you do with my email if I provided it?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="secondary">
                We respect your inbox. If you sign up to receive emails from us,
                we will send very occasional communications, including early
                invitations to new products and brief user feedback surveys.
                Expect, at maximum, three such emails a month. If at any point
                you decide that you don’t want to receive any of these emails,
                simply click the unsubscribe link included at the bottom of all
                PrivacyBot emails.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Will PrivacyBot, now or in the future, sell or share any of my
                information with outside parties?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="secondary">
                No. That is the exact opposite of our purpose.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Does PrivacyBot use any ad tech, such as cookies or trackers?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="secondary">
                Of course not. You can verify this with services such as{" "}
                <a
                  href="https://themarkup.org/blacklight?url=privacybot.co"
                  target="_blank"
                  rel="noreferrer"
                >
                  Blacklight
                </a>
                .
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                What is PrivacyBot’s optional Personal Privacy Analysis?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="secondary">
                Companies are required to send a lot of information back to you,
                but they don’t have to make it easy to understand. Users who
                opt-in to receive the Personal Privacy Analysis can send us
                their data to summarize and present in a meaningful form.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Can I file personal data requests myself (without PrivacyBot)?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="secondary">
                Yes, but we make it much easier. PrivacyBot batches and
                automates requests to dozens of data holders to save you time.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Why am I able to file requests to access, delete, and opt-out of
                sale of my information?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="secondary">
                Legislation such as{" "}
                <a
                  href="https://gdpr-info.eu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  General Data Privacy Regulation (GDPR)
                </a>{" "}
                and{" "}
                <a
                  href="https://oag.ca.gov/privacy/ccpa"
                  target="_blank"
                  rel="noreferrer"
                >
                  California Consumer Privacy Act (CCPA)
                </a>{" "}
                are forcing major companies to provide more information and
                control to consumers. Many of the largest companies are
                providing these rights to all consumers in the US and in the EU.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon color="primary" />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                I have more questions. Can I talk to someone?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="secondary">
                We’d love to talk! You can reach us at{" "}
                <a href="mailto:info@privacybot.co">info@privacybot.co</a>.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <Layout title="PrivacyBot: Your privacy. Guaranteed.">
        <Box>
          <Box>
            <Box display="flex" flexDirection="row" pt={3}>
              <Box flex={1}>
                <Box>
                  <Typography
                    className={classes.title}
                    variant="h2"
                    gutterBottom
                  >
                    Take Back Control of Your Privacy
                  </Typography>
                  <Typography className={classes.title} variant="h5">
                    Big tech, banks, and data brokers can leave your personal
                    information exposed.
                  </Typography>
                </Box>
                <Box mt={6} mb={6} display="flex" justifyContent="center">
                  <Button
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={this.toggleDialog}
                  >
                    Get Started
                  </Button>
                </Box>
                {this.renderProductMission()}
              </Box>
              <Box
                className={classes.imageContainer}
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <StaticImage
                  className={classes.headline}
                  src="../images/chase.png"
                  placeholder="blurred"
                  alt="chase"
                />
                <StaticImage
                  className={classes.headline}
                  src="../images/facebook.jpeg"
                  placeholder="blurred"
                  alt="facebook"
                />
                <StaticImage
                  className={classes.headline}
                  src="../images/google.png"
                  placeholder="blurred"
                  alt="google"
                />
                <StaticImage
                  className={classes.headline}
                  src="../images/linkedin.png"
                  placeholder="blurred"
                  alt="linkedin"
                />
                <StaticImage
                  className={classes.headline}
                  src="../images/uber.jpeg"
                  placeholder="blurred"
                  alt="uber"
                />
                <StaticImage
                  className={classes.headline}
                  src="../images/ins-youtube-tiktok.png"
                  placeholder="blurred"
                  alt="youtube-tiktok-instagram"
                />
              </Box>
            </Box>
          </Box>
          <Box mt={6}>
            <Divider />
          </Box>
          {this.renderFAQ()}
        </Box>
        {this.renderDialog()}
        {this.renderNotification()}
      </Layout>
    )
  }
}

const styles = theme => ({
  imageContainer: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  button: {
    [theme.breakpoints.up("sm")]: {
      minWidth: "360px",
    },
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  headline: {
    maxWidth: "480px",
  },
  faqTitle: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  productMisson: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
})

export default withStyles(styles)(Index)
