/**
 * @Author: Arthur Skinner
 * @Date:   2019-11-07T13:45:21+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-07T20:18:03+00:00
 */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import { Ring } from 'react-awesome-spinners';

//homepage
class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      houses: [],   //will be used to fetch data
      cardColours: ['danger', 'primary', 'success', 'warning'], //loop through this array for backgrond colour
      isLoaded: false, //used for Loadingscreen
    }
  }

   componentDidMount(){
     this.fetchData();  //fetches data
   }

   fetchData(){
     //fetching data from myApi
     //api key
     let myApi = '$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq';
     fetch(`https://www.potterapi.com/v1/houses/?key=${myApi}`)
     .then(res => res.json())//changes the results to json
     .then(json => {
       this.setState({
         isLoaded: true,//content is now loaded
         houses: json,//json is now stored in houses array
       })
     });

   }



  render () {
    //declaring variables to be used in render
    let { isLoaded, houses, cardColours} = this.state;

    if(!isLoaded){
      return <Container>
        <Row>
          <Col md={{span:2, offset:5}}><Ring /></Col>
        </Row>
        </Container>
    }
    return(
      <Container>
        <Row>

              {houses.map((house, i) =>{
                return <Col sm={6} key={house._id}>
                  <Card
                    bg= {cardColours[i]}
                     text="white">
                    <Card.Body>
                  <Card.Title>

                    {house.name}

                  </Card.Title>
                  <p>Founder: {house.founder}</p>
                  <p>Head of House: {house.headOfHouse}</p>
                  <p>Mascot: {house.mascot}</p>
                  <p>House Ghost: {house.houseGhost}</p>
                  <p>Values: {house.values.map((value) =>{
                    return value + ", "
                  })}</p>
                <p>Colours: {house.colors.map((color) =>{
                      return color + ", "
                    })}</p>
                  <Navbar>

                  <Navbar.Text>
                    <a  href={"/" + house.name.toLowerCase()}>Members List</a>
                  </Navbar.Text>
                  </Navbar>

                </Card.Body>
                </Card>
                </Col>

              })}
        </Row>
      </Container>
    )
  }
}

export default Home;
