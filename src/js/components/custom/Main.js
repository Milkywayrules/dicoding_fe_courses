// @ts-check
//
export default class Main extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = 'asdwq';
  }
}
