/**
* A vanilla JS helper for creating state-based components
* @param {String|Node} elem    The element to make into a component
* @param {Object}      options The component options
*/

/**
 * Create the Component object
 * @param {String|Node} elem    The element to make into a component
 * @param {Object}      options The component options
 */
'use strict';

document.componentRegistry = {};
document.nextId = 0;

class Component {
  constructor(props) {
    console.log(props);
    if (!props.elem) throw 'Component: You did not provide an element to make into a component.';

    this._id = ++document.nextId;
    document.componentRegistry[this._id] = this;

    this.state = {
      elem: props.elem,
      data: props.data || null,
      // template: props.template || null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    
    document.addEventListener('DOMContentLoaded', () => this.componentDidMount());
    window.onbeforeunload = () => this.componentWillUnmount();
  }
  
  // Add the `setState()` method
  setState(props) {
    // Shallow merge new properties into state object
    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        this.state.data[key] = props[key];
      }
    }
    // re-render
    this.render();
  }
  /**
   * Sanitize and encode all HTML in a user-submitted string
   * @param  {String} str  The user-submitted string
   * @return {String}      The sanitized string
   */
  sanitize(str) {
    let temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  template(props) {
    let template = `
      <div>Hello</div>
    `;
    return template ? template : null;
  }
  /**
   * Render a template into the DOM
   * @return {[type]}                   The element
   */
  render() {

    const { elem, data } = this.state;

    // Make sure there's a template
    if (!this.template) throw 'ComponentJS: No template was provided.';

    // If elem is an element, use it.
    // If it's a selector, get it.
    let _elem = typeof elem === 'string' 
                  ? document.querySelector(elem)
                  : elem;

    if (!elem) return;

    // Get the template, data will be passed as props to the template.
    let _template = typeof this.template === 'function'
                      ? this.template(data) 
                      : this.template;

    // array indexOf === -1 true if index value is not found.
    if (['string', 'number'].indexOf(typeof _template) === -1) return; 

    // Render the template into the element
    if (_elem.innerHTML === _template) return; // if they're the same, do nothing
    _elem.innerHTML = _template; // else update with new template

    // Dispatch a render event -> https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent
    if (typeof window.CustomEvent === 'function') {
      let event = new window.CustomEvent('render', {
        bubbles: true
      });
      _elem.dispatchEvent(event);
    }
    // Return the _elem for use elsewhere
    return _elem;
  } // render
  
  // lifecycle methods
  componentDidMount() {
    
  }
  
  componentWillUnmount() {
    
  }

} // class Component


// return Component;

export default Component;