// load init script
import '../utils/init'

import * as React from 'react'
import AV from 'leancloud-storage'
import { StaticImage } from "gatsby-plugin-image"
import { Helmet } from "react-helmet"
import Particles from "react-tsparticles";
import particleConfig from '../configs/particles'

import {
  Typography,
  Box,
  Container,
  TextField,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Paper,
  TableFooter
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: '#df4b1d',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#df4b1d',
      },
    },
  },
})(TextField);

class Index extends React.Component {

  state = {
    data: [],
    page: 0,
    rowsPerPage: 5,
    email: '',
    notificationShown: false,
  }

  componentDidMount() {
    this.loadSheet()
  }

  loadSheet = async () => {
    try {
      const response = await fetch('https://api.sheety.co/e95da1588864ac0980b6d7551a96ad4e/privacyBot/index')
      const { index } = await response.json()
      console.log(index)
      this.setState({
        data: index
      })
    } catch (error) {
      console.error(error)
    }
  }

  submitEmail = async email => {
    const entry = new AV.Object('MailingList');
    entry.set('email', email)
    try {
      await entry.save()
      this.setState({
        email: '',
        notificationShown: true
      })
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
      email: e.target.value
    })
  }

  renderForm = () => {
    const { classes } = this.props
    const { email } = this.state
    return (
      <Box borderColor='white'
        border={1}
        borderRadius={6}
        paddingLeft={6}
        paddingRight={6}
        paddingTop={3}
        paddingBottom={3}
      >
        <form style={{ marginBottom: 0 }} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <Box mb={3}>
            <Typography style={{ color: 'white', fontWeight: 'bold', textDecoration: 'underline' }} variant='body1'>
              Mailing List
            </Typography>
          </Box>
          <Box mb={2}>
            <CssTextField inputProps={{
              style: {
                color: 'white',
                fontSize: 14
              }
            }}
              id="email"
              label="Email Address"
              InputLabelProps={{
                style: {
                  color: '#A9A9A9',
                }
              }}
              variant="outlined"
              fullWidth
              required
              onChange={this.handleEmailChange}
              value={email}
            />
          </Box>
          <Box mt={3}>
            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Join!
            </Button>
          </Box>
        </form>
      </Box>
    )
  }

  renderCopyright = () => {
    const { classes } = this.props
    return (
      <Box alignSelf='center' mb={3}>
        <Typography className={classes.copyright} variant="caption" align="center">
          {`@ ${new Date().getFullYear()} Privacy Gang. All right reserved.`}
        </Typography>
      </Box>
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

  renderHeader = () => {
    const { classes } = this.props
    return (
      <Box height={108} display='flex' pl={3} pr={3} flexDirection='row' alignItems='center'>
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

  renderTable = () => {
    const { classes } = this.props
    const { data, page, rowsPerPage } = this.state
    return (
      <TableContainer style={{ width: '60vw' }} component={Paper}>
        <Table size='small' aria-label="target source sheet">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold' }}>Business</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>View</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Delete</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Opt-Out of Sale</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Feedback</TableCell>
              <TableCell style={{ fontWeight: 'bold' }}>Other</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow style={{ wordBreak: "break-word" }} row={`${row.id}`}>
                <TableCell width='10%' component="th" scope="row">
                  {row.business}
                </TableCell>
                <TableCell width='20%'>{row.view}</TableCell>
                <TableCell width='20%'>{row.delete}</TableCell>
                <TableCell width='15%'>{row.optOutOfSale}</TableCell>
                <TableCell width='15%'>{row.feedback}</TableCell>
                <TableCell width='20%'>{row.other}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(e, newPage) => {
            this.setState({ page: newPage })
          }}
        />
      </TableContainer>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <Container className={classes.root} maxWidth={false}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>PrivacyBot: Your privacy. Guaranteed.</title>
        </Helmet>
        <Particles id="tsparticles" className={classes.particles} options={particleConfig} />
        {this.renderHeader()}
        <Box className={classes.container} p={3}>
          {this.renderTable()}
          {this.renderForm()}
        </Box >
        {this.renderCopyright()}
        {this.renderNotification()}
      </Container>
    )
  }
}

const styles = {
  root: {
    backgroundColor: '#180D1F',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column'
  },
  particles: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  table: {
    maxWidth: '80vw'
  },
  title: {
    color: 'white',
    fontWeight: 'bold'
  },
  subtitle: {
    color: 'white'
  },
  emailField: {
    color: 'white'
  },
  submit: {
    backgroundColor: '#df4b1d',
    fontSize: 16,
    fontWeight: 'bold'
  },
  copyright: {
    color: '#A9A9A9'
  }
}

export default withStyles(styles)(Index)