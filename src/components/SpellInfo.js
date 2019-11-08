/**
 * @Author: Arthur Skinner
 * @Date:   2019-11-05T15:28:22+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-08T12:57:24+00:00
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
      spells: [], //empty array to store fetch results
      spellId: this.props.spellId, //spellId is equal to props passed
    }
  }

//if previous props isnt the same as current props componentDidMount will be called
componentDidUpdate(prevProps){
  if(this.props.spellId !== prevProps.spellId){
    this.componentDidMount();
  }
}

componentDidMount(){
  //api key
  let myApi = "$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq";
  let charId = this.props.spellId; //iD of selected spell
  fetch(`https://www.potterapi.com/v1/spells/${charId}/?key=${myApi}`) //fetching data of selected spell
    .then(res => res.json())
    .then(json => {

      this.setState({
         spells: json,
      })
    });
    }

  render () {
    let { spells } = this.state; {/* declaring variables for render method*/}
    let a = this.props.spellId;
    let datas = Object.entries(spells); {/* converting spells to array*/}

    {/* if spellId has been passed return this */}
    if(a != 0){
      return(
      <Container>
        <Row>
          {/* Lists members data */}
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
    else{
      {/* if memberId hasn't been passed through return this*/}
      return(
        <></>
      )
    }
  }
}

{/* prop type checking */}
SpellInfo.propTypes = {
  charId: PropTypes.string
}
export default SpellInfo;
