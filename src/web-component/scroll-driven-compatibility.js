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
      { name: "Google Chrome", img: "./src/img/chrome.png" },
      { name: "Opera", img: "./src/img/cj.jpg" },
      { name: "Samsung Internet", img: "./src/img/cj.jpg" },
      { name: "Microsoft Edge", img: "./src/img/cj.jpg" },
      { name: "Safari", img: "./src/img/cj.jpg" },
      { name: "Mozilla Firefox", img: "./src/img/firefox.png" },
      { name: "QQ Browser", img: "./src/img/cj.jpg" },
      { name: "Baidu Browser", img: "./src/img/cj.jpg" },
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
