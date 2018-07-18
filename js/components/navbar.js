import Component from '../component-helper/Component.js';

/**
 * Setup the navbar on page load
 */
const setup_navbar = () => {
  // Create the stopwatch
	class Navbar extends Component {
    constructor(props) {
      super(props);
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
  }

  const INITIAL_STATE = {
    elem: '#navbar',
    data: {
      heading: 'Welcome to my stopwatch bro.'
		}
  };

  let navbar = new Navbar(INITIAL_STATE);
  navbar.render();
};

export default setup_navbar;