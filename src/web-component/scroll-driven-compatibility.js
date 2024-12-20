class ScrollDrivenCompatibility extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["browsers"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "browsers") {
      this.render();
    }
  }

  get defaultBrowsers() {
    return [
      { name: "Google Chrome", img: "./src/img/Chrome.svg", class: "icon" },
      { name: "Opera", img: "./src/img/Opera.svg", class: "icon" },
      { name: "Samsung Internet", img: "./src/img/Samsung.svg", class: "icon" },
      { name: "Microsoft Edge", img: "./src/img/Edge.svg", class: "icon" },
      { name: "Safari", img: "./src/img/Safari.svg", class: "icon" },
      { name: "Mozilla Firefox", img: "./src/img/Firefox.svg", class: "icon" },
      { name: "QQ Browser", img: "./src/img/QQ.svg", class: "icon" },
      { name: "Baidu Browser", img: "./src/img/Baidu.svg", class: "icon" },
    ];
  }

  parseJsonBrowsers() {
    const browsersAttr = this.getAttribute("browsers");
    try {
      return browsersAttr ? JSON.parse(browsersAttr) : this.defaultBrowsers;
    } catch (error) {
      console.error("Invalid browsers JSON", error);
      return this.defaultBrowsers;
    }
  }

  render() {
    const browsers = this.parseJsonBrowsers();

    this.innerHTML = `
 
      <div class="scroller" data-animated="true" data-direction="left">
        <div class="scroller__inner">
          ${browsers
            .map(
              (browser) => `
            <figure class="scroller-item">
              <img src="${browser.img}" alt="${browser.name}" />
              <figcaption>${browser.name}</figcaption>
            </figure>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }
}

customElements.define("scroll-driven-compatibility", ScrollDrivenCompatibility);
