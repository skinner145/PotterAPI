/**
 * @Author: Arthur Skinner
 * @Date:   2019-10-15T10:52:04+01:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-08T12:40:40+00:00
 */
import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Pagination from 'react-bootstrap/Pagination';
import MemberInfo from '../components/houses/houseInfo/MemberInfo';
import Form from 'react-bootstrap/Form';
import {Ring} from 'react-awesome-spinners';

class AllCharacters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [], //empty array to store fetch results
      isLoaded: false,
      currentPage: 1, //starting page of Pagination
      itemsPerPage: 15, //items per page
      search: '', //search bar starting value
      selectedMemberID: '' //member Id will be stored here when a member is selected
    }

    this.memberToggle = this.memberToggle.bind(this); {/* binding member toggle event to member toggle */}
    this.handleClick = this.handleClick.bind(this); {/* binding handle click event to handle click */}
  }

  updateSearch(ev) {
    this.setState({
      search: ev.target.value // setting search to value in search bar
    })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id) //setting current page to number selected by user
    });
  }
  componentDidMount() {
    this.fetchData(); {/* calling fetch data function */}
  }

  fetchData() {
    {/* api key */}
    let myApi = '$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq';

    {/* fetching characters from api */}
    fetch(`https://www.potterapi.com/v1/characters/?key=${myApi}`)
    .then(res => res.json()) // setting results to json
    .then(json => {
      this.setState({
        isLoaded: true, //content has now loaded
        characters: json //storing json in characters array
      })
    });

  }

  memberToggle(e) {
    this.setState({
      selectedMemberID: e.target.getAttribute("data-key") // setting selectedMemberID to data id of selected character
    })
  }

  render() {
    {/* declaring variables to be used in render */}
    let {isLoaded, characters, currentPage, itemsPerPage} = this.state;

    {/* filtering characters based on search input */}
    let filteredMembers = characters.filter((member) => {
      return member.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    })

    {/* index of last item on page */}
    const indexOfLastItem = currentPage * itemsPerPage;

    {/* index of first item on page */}
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    {/* current items of page are all items between indexOfFirstItemand indexOfLastItem */}
    const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);

    {/* redndering items on page, loops through new array create using slice in const currentItems */}
    const renderItems = currentItems.map((character) => {
      {/* when clicked member toggle will  be called*/}
      return <ListGroup.Item onClick={this.memberToggle}
         style={{
          cursor: "pointer"
        }} data-key={character._id} key={character._id}>{character.name}</ListGroup.Item>
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
      return (
      <Container>
        <Row>
          <Col md={{
              span: 2,
              offset: 5
            }}>
            <Ring />
          </Col>
        </Row>
      </Container>
    )

    } else {
      return (
      <Container>
        <Row>
          <Col sm={1}></Col>
          <Col sm={5}>
            {/* search bar, if the value is changed it will be stored in the search variable using updateSearch */}
            <Form>
              <Form.Control type="text" placeholder="Search..." value={this.state.search} onChange={this.updateSearch.bind(this)}/>
            </Form>
          </Col>
        </Row>

        <Row>
          <Col sm={1}></Col>
          <Col sm={5}>
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
      </Container>
    )
    }
  }

}

export default AllCharacters;
