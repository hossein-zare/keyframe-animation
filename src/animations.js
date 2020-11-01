export default class Animations {
  static easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
  }

  static easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  }

  static easeLinear(t, b, c, d) {
    return c * t / d + b;
  }

  static call(name, start, end, args) {
    switch (name) {
      case 'ease-out':
        if (start === 0 && end === 100) {
          return Animations['easeOutQuad'](...args);
        } else if (start !== 0 && end === 100) {
          return Animations['easeInOutQuad'](...args);
        } else {
          return Animations['easeLinear'](...args);
        }

      case 'linear':
        return Animations['easeLinear'](...args);
    }
  }
}