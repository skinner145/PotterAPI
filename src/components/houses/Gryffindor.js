/**
 * @Author: Arthur Skinner
 * @Date:   2019-10-15T10:52:04+01:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-08T11:19:10+00:00
 */
import React, {Component} from 'react';
import MemberList from './houseInfo/MemberList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Gryffindor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseId: ''
    }
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    let myApi = '$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq'
    fetch(`https://www.potterapi.com/v1/houses/?key=${myApi}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        houseId: json[0]._id,
        houseName: json[0].name
      })
    })
  }

  render() {
    let gryfId = "5a05e2b252f721a3cf2ea33f";

    return (<Container>
      <Row>
        <Col>
          <MemberList houseId={gryfId}/>
        </Col>
      </Row>
    </Container>)

  }

}

export default Gryffindor;
