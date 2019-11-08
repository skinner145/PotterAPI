/**
 * @Author: Arthur Skinner
 * @Date:   2019-10-15T10:52:04+01:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-08T12:47:59+00:00
 */
 import React, {Component} from 'react';
 import SpellInfo from './SpellInfo';
 import Container from 'react-bootstrap/Container';
 import Row from 'react-bootstrap/Row';
 import Col from 'react-bootstrap/Col';
 import ListGroup from 'react-bootstrap/ListGroup';
 import Pagination from 'react-bootstrap/Pagination';
 import Form from 'react-bootstrap/Form';
 import { Ring } from 'react-awesome-spinners';

 class Spellbook extends Component {
 constructor(props){
   super(props);
   this.state = {
     spells: [], //empty array to store fetch results
     isLoaded: false,
     selectedSpellId: '', //spell Id will be stored when a spell is selected
     currentPage: 1, //starting page for pagination
     itemsPerPage: 15, //items per page
     search: '' //search bar starting value
   };

   this.spellToggle = this.spellToggle.bind(this); {/* binding member toggle event to member toggle */}
   this.handleClick = this.handleClick.bind(this); {/* binding handle click event to handle click*/}
 }

 updateSearch(ev){
   this.setState({search: ev.target.value}) //setting search to value in search bar
 }

 handleClick(event){
   this.setState({
     currentPage: Number(event.target.id) //setting current page to number selected by user
   });
 }
 componentDidMount(){
   this.fetchData();
 }

 fetchData(){
   //api key
   let myApi = '$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq';

   fetch(`https://www.potterapi.com/v1/spells/?key=${myApi}`)
   .then(res => res.json())
   .then(json => {
     this.setState({
       isLoaded: true,
       spells: json, //storing fetch results in spells array
     })
   });

 }

 spellToggle(e){
   {/* setting selectedSpellID to data id of selected spell */}
   this.setState({
     selectedSpellId: e.target.getAttribute("data-key")
   })
 }

 render(){
   {/* declaring variables to be used in render */}
   let{ isLoaded, spells, currentPage, itemsPerPage} = this.state;

   {/* filtering spells based on search input */}
   let filteredSpells = spells.filter(
     (spell) => {
       return spell.spell.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
     }
   )
{/* index of last item on page */}
   const indexOfLastItem = currentPage * itemsPerPage;

   {/* index of first item on page */}
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;

   {/* current items of page are all items between indexOfFirstItemand indexOfLastItem */}
   const currentItems = filteredSpells.slice(indexOfFirstItem, indexOfLastItem);

   {/* redndering items on page, loops through new array create using slice in const currentItems */}
   const renderItems = currentItems.map((spell) =>{
     return <ListGroup.Item onClick={this.spellToggle } style={{cursor:"pointer"}} key={spell._id} data-key={spell._id}>{spell.spell}</ListGroup.Item>
   });

   {/* page numbers for pagination, length of filteredMembers / items per page */}
   {/* for every page the number is pushed to pageNumbers array */}
   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(filteredSpells.length / itemsPerPage); i++){
     pageNumbers.push(i);
   }

   let active; {/* active page variable*/}
   {/* loops through pagenumbers array outputs the value as a Pasgination.Item */}
   const renderPageNumbers = pageNumbers.map(number => {
     return(
       <Pagination.Item key={number} id={number} onClick={this.handleClick} active={number === active}>{number}</Pagination.Item>
     );
   });

   if(!isLoaded){
          return(
            <Container>
            <Row>
              <Col md={{span:2, offset:5}}><Ring /></Col>
            </Row>
            </Container>
          )

      }
   else {
   return(
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
           <SpellInfo spellId={this.state.selectedSpellId} />
         </Col>
       </Row>
     </Container>

   )
 }
 }

 }

 export default Spellbook;
