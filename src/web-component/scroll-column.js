class ScrollColumns extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="columns">
      <div class="column column-reverse">
        <img src="./src/img/sonic.jpg" alt="Image 2" />
        <img src="./src/img/george.jpg" alt="Image 2" />
        <img src="./src/img/george.jpg" alt="Image 2" />
      </div>
      <div class="column">
        <img src="./src/img/george.jpg" alt="Image 2" />
        <img src="./src/img/sonic.jpg" alt="Image 2" />
        <img src="./src/img/george.jpg" alt="Image 2" />
      </div>
      <div class="column column-reverse">
        <img src="./src/img/george.jpg" alt="Image 2" />
        <img src="./src/img/george.jpg" alt="Image 2" />
        <img src="./src/img/sonic.jpg" alt="Image 9" />
      </div>
    </div>
    `;
  }
}

customElements.define("scroll-columns", ScrollColumns);
