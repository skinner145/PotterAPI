/**
 * @Author: Arthur Skinner
 * @Date:   2019-11-05T15:28:22+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-07T19:45:19+00:00
 */
 import React from 'react';
 import Card from 'react-bootstrap/Card';
 import Container from 'react-bootstrap/Container';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import PropTypes from 'prop-types';

class SpellInfo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      spells: [],
      spellId: this.props.spellId,
    }
  }

componentDidUpdate(prevProps){
  if(this.props.spellId !== prevProps.spellId){
    this.componentDidMount();
  }
}

componentDidMount(){
  let myApi = "$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq";
  let charId = this.props.spellId;
  fetch(`https://www.potterapi.com/v1/spells/${charId}/?key=${myApi}`)
    .then(res => res.json())
    .then(json => {

      this.setState({
         spells: json,
      })
    });
    }

  render () {
    let { spells } = this.state;

    let datas = Object.entries(spells)
    //console.log(this.props.spellId);
    return(
    <Container>
      <Row>
        <Col>
          {datas.map((data, i)=>{
            return <Card key={i} border="light">
              <Card.Header>{data[1].spell}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {data[1].type}
                </Card.Text>
                <Card.Text>
                  {data[1].effect}
                </Card.Text>
              </Card.Body>
            </Card>
          }
          )}
        </Col>
      </Row>
    </Container>
    )
  }
}
SpellInfo.propTypes = {
  charId: PropTypes.string
}
export default SpellInfo;
