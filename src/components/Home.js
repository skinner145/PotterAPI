/**
 * @Author: Arthur Skinner
 * @Date:   2019-11-07T13:45:21+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-08T13:06:25+00:00
 */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Navbar from 'react-bootstrap/Navbar';
import {Ring} from 'react-awesome-spinners';


//Homepage
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [], //houses array will be used to store fetched data
      cardColours: [
        'danger', 'primary', 'success', 'warning' //storing styling colours to be used later
      ],
      isLoaded: false, //if loading is false, loading screen will appear
    }
  }

  componentDidMount() {
    this.fetchData(); //calling fetch data function
  }

  fetchData() {
    //api key
    let myApi = '$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq';
    fetch(`https://www.potterapi.com/v1/houses/?key=${myApi}`) //fetching houses data from api
    .then(res => res.json()) //setting results to json
    .then(json => {
      this.setState({
        isLoaded: true, //loading screen will stop
        houses: json, //storing json in houses array
      })
    });
  }

  render() {
    let {isLoaded, houses, cardColours} = this.state; {/* declaring varaibles to use in render*/}

    {/* if content hasn't loaded*/}
    if (!isLoaded) {
      return <Container>
        <Row>
          <Col md={{
              span: 2,
              offset: 5
            }}>
            <Ring/> {/* loading animation */}
          </Col>
        </Row>
      </Container>
    }
    {/* if content has loaded */}
    return (
    <Container>
      <Row>
        {/* loops through houses array outputting the data */}
        {
          houses.map((house, i) => {
            return <Col sm={6} key={house._id}>
              {/* loops through colour array to style each component */}
              <Card
                bg={cardColours[i]}
                text="white">
                <Card.Body>
                  <Card.Title>

                    {house.name}

                  </Card.Title>
                  <p>Founder: {house.founder}</p>
                  <p>Head of House: {house.headOfHouse}</p>
                  <p>Mascot: {house.mascot}</p>
                  <p>House Ghost: {house.houseGhost}</p>
                  {/* loops through each house value */}
                  <p>Values: {
                      house.values.map((value) => {
                        return value + ", "
                      })
                    }</p>

                  {/* loops through each house colour */}
                  <p>Colours: {
                      house.colors.map((color) => {
                        return color + ", "
                      })
                    }</p>

                  {/* Link to the memberlist of each house  */}
                  <Navbar>
                    <Navbar.Text>
                      <a href={"/" + house.name.toLowerCase()}>Members List</a>
                    </Navbar.Text>
                  </Navbar>

                </Card.Body>
              </Card>
            </Col>

          })
        }
      </Row>
    </Container>
  )
  }
}

export default Home;
