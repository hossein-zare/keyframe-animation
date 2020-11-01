import Animations from './animations';

export default class KeyframeAnimation {
  constructor() {
    this.config = {};
    this.frames = {};
    this.steps = [];
    this.output = {};
    this.repeats = {};
    this.start = 0;
    this.end = 0;
    this.durations = {};
    this.iteratedFor = 1;
  }

  /**
   * Set the config.
   * @param {object} config 
   */
  set(config) {
    this.config = config;
    this.end = config.duration * config.fps;

    return this;
  }

  /**
   * The keyframes
   * @param {object} frames 
   */
  keyframes(frames) {
    this.frames = frames;
    this.getProps();

    return this;
  }

  /**
   * Get the keys of frames.
   * @returns {array}
   */
  getKeys() {
    return Object.keys(this.frames).map(item => Number(item)).sort((a, b) => a - b);
  }

  /**
   * Get the frame.
   * @param {float} percentage
   * @returns {object}
   */
  getFrame(percentage) {
    return this.frames[percentage];
  }

  /**
   * Get the step.
   * @param {number} index
   * @returns {object}
   */
  getStep(index) {
    return this.steps[index];
  }

  /**
   * Get animation properties.
   */
  getProps() {
    this.getKeys().forEach(percentage => {
      const frame = this.getFrame(percentage);

      for (let name in frame) {
        const index = this.getFrameIndex(name);

        if (index > -1) {
          this.steps[index].end = Number(percentage);
          this.steps[index].endValue = frame[name];
          this.steps[index].difference = frame[name] - this.getStep(index).startValue;
          this.steps[index].duration = ((
            this.getStep(index).end - this.getStep(index).start // frame percentage
          ) / 100) * this.config.duration;
        } else {
          // Get the last matching step
          const item = [...this.steps].reverse().find(item => item.name === name);

          if (! item) {
            this.steps.push({
              name,
              startValue: frame[name],
              endValue: null,
              start: Number(percentage),
              end: null,
              duration: null,
              id: Math.random()
            });
          } else {
            const duration = ((
              Number(percentage) - item.end // frame percentage
            ) / 100) * this.config.duration;
            this.steps.push({
              name,
              startValue: item.endValue,
              endValue: frame[name],
              start: item.end,
              end: Number(percentage),
              duration,
              id: Math.random()
            });
          }
        }
      }
    });

    // Remove endless steps
    this.steps = this.steps.filter(item => item.end !== null);
  }

  /**
   * Get index of the frame
   * @param {string} name
   * @return {number}
   */
  getFrameIndex(name) {
    return this.steps.findIndex(item => item.name === name && item.end === null);
  }

  /**
   * Get the progress.
   * @returns {number}
  */
  getProgress() {
    return (this.start / this.end) * 100;
  }

  /**
   * Animate.
   * @param {function} callback 
   * @param {boolean} resetIteration 
   */
  animate(callback, resetIteration = true) {
    // Reset the properties
    this.reset(resetIteration);

    this.interval = setInterval(() => {
      const progress = this.getProgress();

      this.steps.filter(item => item.start <= progress && item.end >= progress).forEach(frame => {
        // Create initial values for the frame
        if (! this.repeats.hasOwnProperty(frame.id)) {
          this.repeats[frame.id] = {
            start: 0,
            end: frame.duration * 60,
          }
          
          this.output[frame.name] = frame.startValue;
          this.durations[frame.id] = 0;
        }

        // Animation time
        this.durations[frame.id]+= 1 / this.config.fps;
        this.repeats[frame.id].start++;

        // Animation arguments
        const args = [this.durations[frame.id], frame.startValue, frame.endValue - frame.startValue, frame.duration];

        // Call the animation function
        this.output[frame.name] = Animations.call(this.config.animation, frame.start, frame.end, args);

        // Set the frame output to the given value
        if (this.repeats[frame.id].start === this.repeats[frame.id].end) {
          this.output[frame.name] = frame.endValue;
        }
      });

      // Call the callback
      callback(this.output);

      // Determine whether we've reached the end
      if (this.start + 1 === this.end) {
        clearInterval(this.interval);

        if (this.config.iterationCount === 'infinite') {
          this.animate(callback, true);
        } else if (this.iteratedFor < this.config.iterationCount) {
          this.iteratedFor++;
          this.animate(callback, false);
        }
      }

      this.start++;
    }, 1000 / this.config.fps);
  }

  /**
   * Stop the animation.
   */
  stop() {
    clearInterval(this.interval);
  }

  /**
   * Reset the properties.
   * @param {bool} resetIteration 
   */
  reset(resetIteration) {
    this.output = {};
    this.repeats = {};
    this.start = 0;
    this.durations = {};

    if (resetIteration)
      this.iteratedFor = 1;
  }
}
