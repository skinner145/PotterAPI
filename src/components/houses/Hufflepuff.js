/**
 * @Author: Arthur Skinner
 * @Date:   2019-10-15T10:52:04+01:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-07T16:37:38+00:00
 */
import React, { Component } from "react";
import MemberList from './houseInfo/MemberList';

class Hufflepuff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houseId: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let myApi = "$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq";
    fetch(`https://www.potterapi.com/v1/houses/?key=${myApi}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          houses: json[3]._id,
        })
      });
  }

  render() {
    let hufId = "5a05dc58d45bd0a11bd5e070";

      return (
        <div>
          <div>
            <MemberList houseId={hufId} />
          </div>
        </div>

      );
    }
  }


export default Hufflepuff;
