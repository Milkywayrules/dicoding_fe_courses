// @ts-check

/**
 *
 * describe_something_here
 *
 */
export default class Homepage extends HTMLElement {
  // An instance of the element is created or upgraded.
  // Useful for initializing state, setting up event listeners,
  // or creating a shadow dom. See the spec for restrictions
  // on what you can do in the constructor.
  constructor() {
    super();
  }

  eventHandler1(ev) {}

  // Called every time the element is inserted into the DOM.
  // Useful for running setup code, such as fetching resources or rendering.
  // Generally, you should try to delay work until this time.
  connectedCallback() {
    // this.emptyAppBody();
    this.render();
  }

  // Array of attributes to be watched by attributeChangedCallback()
  static get observedAttributes() {
    return [];
  }

  // Called when an observed attribute has been
  // added, removed, updated, or replaced.
  // Also called for initial values when
  // an element is created by the parser, or upgraded.
  // Note: only attributes listed in the observedAttributes property
  // will receive this callback.
  attributeChangedCallback(name, oldVal, newVal) {}

  // Rendering HTML template string defined per component.
  render() {
    this.innerHTML = htmlTemplate;
  }

  emptyAppBody() {
    return (document.querySelector('#app-body').innerHTML = null);
  }

  // Called every time the element is removed from the DOM.
  // Useful for running clean up code.
  disconnectedCallback() {}
}

// ------------------------------------------ Custom vars & props -------

const props = {};

// ------------------------------------------------ HTML template -------
// !TODO: kerjain ini bikin halaman detail anime dan hapus search form.
// !TODO: minimalisir fitur yg penting selesai dulu dan requirements-nya terpenuhi semua.
const htmlTemplate = `
  <section id="app-mainTitle">
    <af-mainTitle></af-mainTitle>
  </section>

  <!--
  <section id="app-searchform">
    <af-searchform></af-searchform>
  </section>
  -->

  <section id="app-homepage">
    <!-- horizontal cards -->
    <div class="cards-x-container">
      <af-xcardsheader textTitle="Most Popular"></af-xcardsheader>
      <div id="top-popular" class="cards-x">
        <af-xlistanime type="top-popular"></af-xlistanime>
      </div>
    </div>

    <!-- horizontal cards -->
    <div class="cards-x-container">
      <af-xcardsheader textTitle="Top Trending"></af-xcardsheader>
      <div id="top-trending" class="cards-x">
        <af-xlistanime type="top-trending"></af-xlistanime>
      </div>
    </div>
  </section>
`;
