import Component from '../component-helper/Component.js';

const setup_navbar = () => {
  'use strict';
  // Create the stopwatch
	class Navbar extends Component {
    constructor(props) {
      super(props); // calling super() so that the correct prototype chain is established.
      this.state = {...props};
    }
    
    template(props) {
      const { heading } = props;
			let template = `
        <div class="nav">
          ${heading}
        </div>
      `;
  		return template;
  	}
  	
  	componentDidMount() {
  	  console.log('navbar mounted', this);
  	}
  }

  const INITIAL_STATE = {
    elem: '#navbar',
    data: {
      heading: 'Welcome.'
		}
  };
  
  // Define the new element
  let navbar = new Navbar(INITIAL_STATE);
  navbar.render();
};

export default setup_navbar;