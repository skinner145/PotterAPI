/**
 * @Author: Arthur Skinner
 * @Date:   2019-11-05T10:52:31+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-08T12:53:37+00:00
 */
import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

class MemberInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [], //empty array to store fetch results
      memberId: this.props.memberId //memebrId is equal to props passed
    }

  }

//if previous props isnt the same as current props componentDidMount will be called
  componentDidUpdate(prevProps) {
    if (this.props.memberId !== prevProps.memberId) {
      this.componentDidMount();
    }
  }

  componentDidMount() {
    //api key
    let myApi = "$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq";
    let charId = this.props.memberId; //iD of memeber selected
    fetch(`https://www.potterapi.com/v1/characters/${charId}/?key=${myApi}`) //fetch data of selected character
    .then(res => res.json())
    .then(json => {
      this.setState({
        members: json
      })
    });
  }

  render() {
    let {members} = this.state; {/* declaring variables for render method*/}

    {/* if memberId has been passed return this */}
    let a = this.props.memberId;;
    if (a != 0) {
      return (<Container>
        <Row>
          <Col>
            {/* Lists members data */}
            <Card border="light" style={{
                width: '18rem'
              }}>
              <Card.Header>{members.name}</Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{members.alias}</Card.Subtitle>
                <Card.Text>
                  {members.house}
                </Card.Text>
                <Card.Text>
                  {members.role}
                </Card.Text>
                <Card.Text>
                  {members.school}
                </Card.Text>
                <Card.Text>
                  {members.species}
                </Card.Text>
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>)
    } else {
      {/* if memberId hasn't been passed through return this*/}
      return (
        <></>
    )
    }
  }
}

{/* prop type checking */}
MemberInfo.propTypes = {
  memebrId: PropTypes.string
}
export default MemberInfo;
