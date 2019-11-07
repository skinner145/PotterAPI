/**
 * @Author: Arthur Skinner
 * @Date:   2019-10-15T10:52:04+01:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-07T20:20:14+00:00
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
     spells: [],
     isLoaded: false,
     selectedSpellId: '',
     currentPage: 1,
     itemsPerPage: 15,
     search: ''
   };

   this.spellToggle = this.spellToggle.bind(this);
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
 componentDidMount(){
   this.fetchData();
 }

 fetchData(){
   let myApi = '$2a$10$phKCUKjEKrGWjuxBlCexR.uVvll8QAx78SysZ8KOacxvIXF1XP2Kq';

   fetch(`https://www.potterapi.com/v1/spells/?key=${myApi}`)
   .then(res => res.json())
   .then(json => {
     this.setState({
       isLoaded: true,
       spells: json,
     })
   });

 }

 spellToggle(e){
   //console.log(e.target.getAttribute("data-key"));
   this.setState({
     selectedSpellId: e.target.getAttribute("data-key")
   })
 }

 render(){
   let{ isLoaded, spells, currentPage, itemsPerPage} = this.state;

   let filteredSpells = spells.filter(
     (spell) => {
       return spell.spell.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
     }
   )

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = filteredSpells.slice(indexOfFirstItem, indexOfLastItem);

   const renderItems = currentItems.map((spell) =>{
     return <ListGroup.Item onClick={this.spellToggle } style={{cursor:"pointer"}} key={spell._id} data-key={spell._id}>{spell.spell}</ListGroup.Item>
   });

   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(filteredSpells.length / itemsPerPage); i++){
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
   else {
   return(
     <Container>
       <Row>
         <Col sm={1}></Col>
         <Col sm={5}>
           <Form>
             <Form.Control type="text" placeholder="Search..." value={this.state.search} onChange={this.updateSearch.bind(this)}/>
           </Form>


         </Col>
       </Row>
       <Row>
         <Col sm={1}></Col>
         <Col sm={5}>
            <ListGroup>
              {renderItems}
            </ListGroup>
           <Pagination id="page-numbers">
             {renderPageNumbers}
           </Pagination>
         </Col>
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
