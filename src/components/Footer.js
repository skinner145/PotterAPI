/**
 * @Author: Arthur Skinner
 * @Date:   2019-11-08T12:06:31+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-08T12:18:00+00:00
 */
import React from 'react'
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar';

class Footer extends React.Component {
  render () {
    return(

      <Navbar bg="dark" variant="dark">
          <Navbar.Text>
          &copy; Arthur Skinner
          </Navbar.Text>
      </Navbar>
    )
  }
}

export default Footer;
