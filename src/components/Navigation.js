/**
 * @Author: Arthur Skinner
 * @Date:   2019-10-15T10:57:42+01:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-07T19:57:48+00:00
 */
 import React from 'react';
 import Navbar from 'react-bootstrap/Navbar';
 import Nav from 'react-bootstrap/Nav';

  class Navigation extends React.Component{
    render(){
      return(
        <>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href='/home'>Harry Potter API</Navbar.Brand>
            <Nav>
              <Nav.Link href="/gryffindor">Gryffindor |</Nav.Link>

              <Nav.Link href="/ravenclaw">Ravenclaw |</Nav.Link>

              <Nav.Link href="/slytherin">Slytherin |</Nav.Link>

              <Nav.Link href="/hufflepuff">Hufflepuff |</Nav.Link>

              <Nav.Link href="/allcharacters">All Characters |</Nav.Link>

              <Nav.Link href="/spellbook">Spellbook |</Nav.Link>


            </Nav>


          </Navbar>
          <br />
        </>
      );
    }
}

 export default Navigation;
