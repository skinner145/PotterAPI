/**
 * @Author: Arthur Skinner
 * @Date:   2019-10-15T10:52:04+01:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-08T11:23:14+00:00
 */
import React, {Component} from 'react';
import MemberList from './houseInfo/MemberList';

class Slytherin extends Component {
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
    let myApi = '$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq';
    fetch(`https://www.potterapi.com/v1/houses/?key=${myApi}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        isLoaded: true,
        houses: json[2]._id
      })
    });

  }

  render() {
    let slyId = "5a05dc8cd45bd0a11bd5e071";

    return (<div>
      <MemberList houseId={slyId}/>
    </div>)
  }
}

export default Slytherin;
