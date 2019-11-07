/**
 * @Author: Arthur Skinner
 * @Date:   2019-10-30T11:49:05+00:00
 * @Last modified by:   Arthur Skinner
 * @Last modified time: 2019-11-07T18:38:00+00:00
 */
import React from 'react';
import Gryffindor from './houses/Gryffindor';
import Slytherin from './houses/Slytherin';
import Hufflepuff from './houses/Hufflepuff';
import Spellbook from './Spellbook';
import Ravenclaw from '../components/houses/Ravenclaw';
import AllCharacters from './AllCharacters';
import Home from './Home';

class House extends React.Component {
  render () {
    //receives name passed through from app
    let whichHouse = this.props.match.params.name;

    //whatever name is passed through willl result
    //in the correct component rendering
    if(whichHouse === 'home'){
      return(
        <div>
          <Home />
        </div>
      )
    }

    else if(whichHouse === 'gryffindor'){
      return(
      <div>
        <Gryffindor />
      </div>
    )}
    else if(whichHouse === 'slytherin') {
      return(
        <div>
          <Slytherin />
        </div>
      )
    }
    else if(whichHouse === 'hufflepuff'){
      return(
        <div>
          <Hufflepuff />
        </div>
      )
    }
    else if(whichHouse === 'ravenclaw'){
      return(
        <div>
          <Ravenclaw />
        </div>
      )
    }
    else if(whichHouse === 'spellbook'){
      return(
        <div>
          <Spellbook />
        </div>
      )
    }
    else if(whichHouse === 'allcharacters'){
      return(
        <div>
          <AllCharacters />
        </div>
      )
    }
    else{
      return(
        <div>
          <Home />
        </div>
      )
    }
  }
}

export default House;
