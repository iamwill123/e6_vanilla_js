import Component from '../component-helper/Component.js';
/**
 * Setup the stopwatch on page load
 */
const setup_stopwatch = () => {
  let timer;
  // Create the stopwatch
	class Stopwatch extends Component {
    constructor(props) {
      super(props);
      this.state = { ...props };
      this.formatTime = this.formatTime.bind(this);
      this.start = this.start.bind(this);
      this.stop = this.stop.bind(this);
      this.reset = this.reset.bind(this);
      this.clickHandler = this.clickHandler.bind(this);

      let app = document.getElementById('app');
      app.addEventListener('click', this.clickHandler, false);
    }
    
    componentDidMount() {
  	  console.log('stopwatch mounted', this);
  	}
    /**
     * Format the time in seconds into hours, minutes, and seconds
     * @param  {Number} time The time in seconds
     * @return {String}      The time in hours, minutes, and seconds
    */
    formatTime(time) {
      let minutes = parseInt(time / 60, 10);
      let hours = parseInt(minutes / 60, 10);
      if (minutes > 59) {
        minutes = minutes % 60;
      }
      return (hours > 0 ? hours + 'h ' : '') + (minutes > 0 || hours > 0 ? minutes + 'm ' : '') + (time % 60) + 's';
    }
    /**
     * Start the stopwatch
    */
    start() {
      let { data: { time } } = this.state;
      // Start the timer
      timer = setInterval(() => { update_timer() }, 1000);
      // Update the timer
      let update_timer = () => this.setState({ time: ++time }); // we need access to the current state of time
      this.setState({ running: true });
    }
    /**
     * Stop the stopwatch
    */
    stop() {
      this.setState({ running: false });
      clearInterval(timer);
    }
    /**
     * Reset the stopwatch
    */
    reset() {
      this.setState({ time: 0, running: false });
      clearInterval(timer);
    }
    
    clickHandler(event) {
      event.preventDefault();
      // Check if a stopwatch action button was clicked
      let action = event.target.getAttribute('data-stopwatch');
      console.warn(`click action: ${action}`);

      switch(action) {
        case 'start': // If it's the start button, start
          this.start();
          break;
        case 'stop': // If it's the stop button, stop
          this.stop();
          break;
        case 'reset': // If it's the stopwatch button, reset
          this.reset();
          break;
        default:
          return;
      }
    }

    template(props) {
      const { time, running } = props;
      console.warn(props);
			let template = `
        <div class="timer">
          <div id="stopwatch">
            ${this.formatTime(time)}
          </div>
          <div class="stopwatch_content">
            <button 
              data-stopwatch="${ running ? 'stop' : 'start' }"
            > 
              ${ running ? 'Stop' : 'Start' } 
            </button>
            <button data-stopwatch="reset">
              Reset
            </button>
          </div>
        </div>
      `;
			return template;
		}
		
  }

  const INITIAL_STATE = {
    elem: '#app',
    data: {
			time: 0,
			running: false
		}
  };

  let stopwatch = new Stopwatch(INITIAL_STATE);
  stopwatch.render();

};

export default setup_stopwatch;