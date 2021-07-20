export class Keyboard {
  constructor() {
    this.pressed = {};
  }

  watch(el) {
    el.addEventListener('keydown', (e) => {
      this.pressed[e.key] = true;
      console.log('this.pressed', this.pressed[e.key], e.key)
    });
    el.addEventListener('keyup', (e) => {
      this.pressed[e.key] = false;
      console.log('this.keyup', this.pressed[e.key], e.key)
    });
  }
};