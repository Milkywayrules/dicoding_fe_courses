// @ts-check
//

const t = `
<template>
  <h1>ini dinamis loh</h1>
</template>
`;

export default class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = t;
  }
}
