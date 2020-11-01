# Keyframe Animation 1.x
Pure javascript animation manager similar to css animations with keyframes.

## Get Started
### Installation
via NPM
```bash
npm i keyframe-animation
```
via Yarn
```bash
yarn add keyframe-animation
```

### Basic Usage
```javascript
const KeyframeAnimation = require('keyframe-animation');

const myAnimation = new KeyframeAnimation();
myAnimation.set({
    fps: 60, // frames per second
    duration: 2, // seconds
    animation: 'linear', // linear, ease-out
    iterationCount: 'infinite' // 1, 2, ... , infinite
})
    // Similar to CSS Animations
    .keyframes({
        0: {
            width: 100,
        }
        50: {
            width: 150,
        },
        100: {
            width: 200
        }
    });

// Start the animation
myAnimation.animate(data => {
    document.getElementById('myBox').style.width = `${data.width}px`;
});

// Stop the animation
myAnimation.stop();

// HTML
<div id="myBox" style="width: 100px; height:2px; background-color: crimson;"></div>
```

### How to use Keyframe Animation in React/React Native?
```javascript
import KeyframeAnimation from 'keyframe-animation';

export default class MyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.width = 100;
    }

    startAnimation() {
        ...
        .animate(data => {
            this.width = data.width;
            this.forceUpdate(); // Important
        });
    }

    render() {
        return (
            ...
        );
    }
}
```
You can decrease the fps to improve the performance.

>(50 - 40) is recommended for React/React Native.