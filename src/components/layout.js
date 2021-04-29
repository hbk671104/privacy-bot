import * as React from "react"
import { Helmet } from "react-helmet"
import { Container, Box } from "@material-ui/core"
import {
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles"

// local import
import Header from "./header"
import Footer from "./footer"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#df4b1d",
    },
    secondary: {
      main: "rgba(0, 0, 0, 0.5)",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
  // spacing: 6,
})

const Layout = ({ children, classes, title }) => {
  return (
    <Container className={classes.root} maxWidth={false}>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>{title}</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Comfortaa|Poppins"
        />
        {/* <script type="text/javascript">
          {`window.$crisp=[];window.CRISP_WEBSITE_ID="cc421c66-baa6-48dc-89c9-a7dda04473e1";
                    (function(){d = document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";
                    s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
                    `}
        </script> */}
      </Helmet>
      <ThemeProvider theme={theme}>
        <Box className={classes.container}>
          <Box pl={3} pr={3}>
            <Header />
            {children}
          </Box>
          <Footer />
        </Box>
      </ThemeProvider>
    </Container>
  )
}

const styles = theme => ({
  root: {
    backgroundColor: "white",
    minHeight: "100vh",
    width: "72vw",
    [theme.breakpoints.down("md")]: {
      width: "100vw",
    },
  },
  particles: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
})

export default withStyles(styles)(Layout)
