// const setup_footer = () => {
  'use strict';
  /* global HTMLElement */
  class Footer extends HTMLElement {
    constructor() {
      super();
      
      let content = 'Stay awhile.';
      // Create a shadow root
      let shadow = this.attachShadow({mode: 'open'});
  
      // Create text node and add word count to it
      let text = document.createElement('div');
          text.textContent = content;
          text.setAttribute('class','footer');
      
      let style = document.createElement('style');
          style.textContent = `
            .footer {
              color: gray;
            }
          `;
  
      // attach the created elements to the shadow dom
      shadow.appendChild(style);
      // Append it to the shadow root
      shadow.appendChild(text);
    }
    
    // Fires when an instance of the element is created.
    createdCallback() {
  
    }
    // Fires when an instance was inserted into the document.
    attachedCallback() {
  
    }
    // Fires when an instance was removed from the document.
    detachedCallback() {
  
    }
    // Fires when an attribute was added, removed, or updated.
    attributeChangedCallback(attr, oldVal, newVal) {
  
    }
    
  }
  // Define the new element
  /* global customElements */
  customElements.define('foo-ter', Footer);
  
  const node = new Footer;
  console.assert(node.constructor === Footer);
// };

// export default setup_footer;