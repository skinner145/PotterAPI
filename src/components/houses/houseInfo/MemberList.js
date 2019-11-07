/**
 * @Author: Arthur Skinner
 * @Date:   2019-10-30T10:19:01+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-07T20:20:11+00:00
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
  import { Ring } from 'react-awesome-spinners';

   class MemberList extends React.Component{

     constructor(props) {
       super(props);
       this.state = {
         members: [],
         selectedMemberID: '',
         currentPage: 1,
         itemsPerPage: 10,
         search: '',
         isLoaded: '',
       };

       this.memberToggle = this.memberToggle.bind(this);
       this.handleClick = this.handleClick.bind(this);
     }



     updateSearch(ev){
       this.setState({search: ev.target.value})
     }

     handleClick(event){
       this.setState({
         currentPage: Number(event.target.id)
       });
     }

     componentDidMount() {
       this.fetchData();
     }

     fetchData() {
       let myApi = "$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq";
       let houseId = this.props.houseId;
       fetch(`https://www.potterapi.com/v1/houses/${houseId}/?key=${myApi}`)
         .then(res => res.json())
         .then(json => {

           this.setState({
             members: json[0].members,
             isLoaded: true
           })
         });
     }


     memberToggle(e){
       //console.log(e.target.getAttribute("data-key"));
       this.setState({
         selectedMemberID: e.target.getAttribute("data-key")
       })
     }

     render() {
       let { isLoaded, members, currentPage, itemsPerPage } = this.state;
       let filteredMembers = members.filter(
         (member) => {
           return member.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
         }
       )
       const indexOfLastItem = currentPage * itemsPerPage;
       const indexOfFirstItem = indexOfLastItem - itemsPerPage;
       const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);



       const renderItems = currentItems.map((member) =>{
         return <ListGroup.Item style={{cursor:"pointer"}} onClick={this.memberToggle } data-key={member._id} key={member._id}>{member.name}</ListGroup.Item>
       });

       const pageNumbers = [];
       for (let i = 1; i <= Math.ceil(filteredMembers.length / itemsPerPage); i++){
         pageNumbers.push(i);
       }
       let active;
       const renderPageNumbers = pageNumbers.map(number => {
         return(
           <Pagination.Item key={number} id={number} onClick={this.handleClick} active={number === active}>{number}</Pagination.Item>
         );
       });
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
             <Col sm={2}></Col>
             <Col sm={4}>
               <Form>
                 <Form.Control type="text" placeholder="Search..." value={this.state.search} onChange={this.updateSearch.bind(this)}/>
               </Form>


             </Col>
           </Row>
           <Row>
             <Col sm={2}></Col>
             <Col sm={4}>
                <ListGroup>
                  {renderItems}
                </ListGroup>
               <Pagination id="page-numbers">
                 {renderPageNumbers}
               </Pagination>
             </Col>
             <Col sm={4}>
               <MemberInfo memberId={this.state.selectedMemberID} />
             </Col>
           </Row>
         </Container>
       );
     }
 }
 MemberList.propTypes = {
   houseId: PropTypes.string
 }

  export default MemberList;
