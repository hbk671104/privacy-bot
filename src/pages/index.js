// load init script
import '../utils/init'

import * as React from 'react'
import AV from 'leancloud-storage'
import { StaticImage } from "gatsby-plugin-image"
import Linkify from 'react-linkify';

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
  TableRow
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';

import Layout from '../components/layout'

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
    sheet: {
      header: [],
      data: []
    },
    page: 0,
    rowsPerPage: 5,
    email: '',
    notificationShown: false,
  }

  componentDidMount() {
    this.loadSheet()
  }

  loadSheet = async () => {
    const sheetId = '1WUDaK4WzIKCrmui27vmpko_yarxHCLVTT8LhmbYVmDg'
    const range = 'Index'
    const appKey = 'AIzaSyAyPQTKZvoTAsk4Y8vyrGpwJ13E6jKB7Os'
    try {
      const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${appKey}`)
      const { values } = await response.json()
      this.setState({
        sheet: {
          header: values[0],
          data: values.slice(1)
        }
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
        border='2px dashed white'
        borderRadius={6}
        paddingLeft={6}
        paddingRight={6}
        paddingTop={3}
        paddingBottom={3}
        ml={6}
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

  renderTable = () => {
    const { classes } = this.props
    const { sheet: { header, data }, page, rowsPerPage } = this.state
    return (
      <TableContainer className={classes.tableContainer}>
        <Table size='small' aria-label="target source sheet">
          <TableHead>
            <TableRow>
              {header.map(h => (
                <TableCell key={h} className={classes.tableHeadCell}>{h}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow style={{ wordBreak: "break-word" }} key={`${index}-${new Date()}`}>
                {row.map((cell, index) => (
                  <TableCell key={`${index}-${new Date()}`} className={classes.tableRowCell}>
                    <Linkify properties={{ target: '_blank', style: { color: '#df4b1d' } }}>
                      {cell}
                    </Linkify>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          className={classes.tableRowCell}
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
      <Layout title='PrivacyBot: Your privacy. Guaranteed.'>
        <Box className={classes.content}>
          {this.renderTable()}
          {this.renderForm()}
        </Box >
        {this.renderNotification()}
      </Layout >
    )
  }
}

const styles = {
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  tableContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'white',
    border: '2px dashed white',
    borderRadius: '12px'
  },
  tableHeadCell: {
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'underline'
  },
  tableRowCell: {
    color: 'white'
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
  }
}

export default withStyles(styles)(Index)