/**
 * A vanilla JS helper for creating state-based components
 * @param {String|Node} elem    The element to make into a component
 * @param {Object}      options The component options
 */
const Component = ((win, doc, log, si, ci, sto, loc) => {
	'use strict';
	/**
	 * Create the Component object
	 * @param {String|Node} elem    The element to make into a component
	 * @param {Object}      options The component options
	 */

  doc.componentRegistry = {};
  doc.nextId = 0;

	class Component {
    constructor(props) {
      if (!props.elem) throw 'Component: You did not provide an element to make into a component.';

      this._id = ++doc.nextId;
      doc.componentRegistry[this._id] = this;

      this.state = {
        elem: props.elem,
        data: props.data || null,
        // template: props.template || null
      };
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
      let temp = doc.createElement('div');
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
                    ? doc.querySelector(elem)
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
      if (typeof win.CustomEvent === 'function') {
        let event = new window.CustomEvent('render', {
          bubbles: true
        });
        _elem.dispatchEvent(event);
      }
      // Return the _elem for use elsewhere
      return _elem;
    } // render

  } // class Component

	return Component;

})(window, document, console, setInterval, clearInterval, setTimeout, window.location);

export default Component;