/**
 * @Author: Arthur Skinner
 * @Date:   2019-10-30T10:19:01+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-08T12:48:08+00:00
 */

import React from 'react';
import MemberInfo from './MemberInfo';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import {Ring} from 'react-awesome-spinners';

class MemberList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      members: [],  //empty array to store fetch results
      selectedMemberID: '', //member Id will be stored here when a member is selected
      currentPage: 1, //starting page of pagination
      itemsPerPage: 15, //items per page
      search: '', //search bar starting value
      isLoaded: ''
    };

    this.memberToggle = this.memberToggle.bind(this); {/* binding member toggle event to member toggle */}
    this.handleClick = this.handleClick.bind(this); {/* binding handle click event to handle click*/}
  }

  updateSearch(ev) {
    this.setState({
      search: ev.target.value //setting search to value in search bar
    })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id) //setting current page to number selected by user
    });
  }

  componentDidMount() {
    this.fetchData(); {/*calling fetch data function*/}
  }

  fetchData() {
    //api key
    let myApi = "$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq";
    let houseId = this.props.houseId;  //houseId passed as props
    fetch(`https://www.potterapi.com/v1/houses/${houseId}/?key=${myApi}`) //fetching data of selected house
    .then(res => res.json())
    .then(json => {
      this.setState({
        members: json[0].members, // storing members of house to empty members array
        isLoaded: true
      })
    });
  }

  memberToggle(e) {
    {/* setting selectedMemberID to data id of selected character */}
    this.setState({
      selectedMemberID: e.target.getAttribute("data-key")
    })
  }

  render() {
    {/* declaring variables to be used in render */}
    let {isLoaded, members, currentPage, itemsPerPage} = this.state;

    {/* filtering characters based on search input */}
    let filteredMembers = members.filter((member) => {
      return member.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    })

    {/* index of last item on page */}
    const indexOfLastItem = currentPage * itemsPerPage;

    {/* index of first item on page */}
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    {/* current items of page are all items between indexOfFirstItemand indexOfLastItem */}
    const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);

    {/* redndering items on page, loops through new array create using slice in const currentItems */}
    const renderItems = currentItems.map((member) => {
      return <ListGroup.Item style={{
          cursor: "pointer"
        }} onClick={this.memberToggle} data-key={member._id} key={member._id}>{member.name}</ListGroup.Item>
    });

    {/* page numbers for pagination, length of filteredMembers / items per page */}
    {/* for every page the number is pushed to pageNumbers array */}
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredMembers.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    let active; {/* active page variable*/}
    {/* loops through pagenumbers array outputs the value as a Pasgination.Item */}
    const renderPageNumbers = pageNumbers.map(number => {
      return (<Pagination.Item key={number} id={number} onClick={this.handleClick} active={number === active}>{number}</Pagination.Item>);
    });

    {/* loading screen */}
    if (!isLoaded) {
      return <Container>
        <Row>
          <Col md={{
              span: 2,
              offset: 5
            }}>
            <Ring/>
          </Col>
        </Row>
      </Container>

    }

    return (<Container>
      <Row>
        <Col sm={2}></Col>
        <Col sm={4}>
            {/* search bar, if the value is changed it will be stored in the search variable using updateSearch */}
          <Form>
            <Form.Control type="text" placeholder="Search..." value={this.state.search} onChange={this.updateSearch.bind(this)}/>
          </Form>

        </Col>
      </Row>
      <Row>
        <Col sm={2}></Col>
        <Col sm={4}>
          {/* loading characters using renderItems variable delcared earlier */}
          <ListGroup>
            {renderItems}
          </ListGroup>

          {/* loading page numbers using render declared earlier */}
          <Pagination id="page-numbers">
            {renderPageNumbers}
          </Pagination>
        </Col>

        {/* loading memberInfo component passing the if of selected character from the list */}
        <Col sm={4}>
          <MemberInfo memberId={this.state.selectedMemberID}/>
        </Col>
      </Row>
    </Container>);
  }
}
{/* prop type checking */}
MemberList.propTypes = {
  houseId: PropTypes.string
}

export default MemberList;
