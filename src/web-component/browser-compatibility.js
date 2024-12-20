class BrowserCompatibilityMessage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.checkCompatibility();
  }

  checkCompatibility() {
    // Détection de la compatibilité scroll() et view()
    const isCompatible =
      CSS.supports("animation-timeline: scroll()") &&
      CSS.supports("animation-timeline: view()");

    // Création du message de compatibilité
    const messageElement = document.createElement("div");
    messageElement.style.padding = "1rem";
    messageElement.style.marginBottom = "1rem";
    messageElement.style.borderRadius = "8px";
    messageElement.style.display = "flex";
    messageElement.style.alignItems = "center";
    messageElement.style.gap = "1rem";

    if (isCompatible) {
      messageElement.style.border = "1px solid green";
      messageElement.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
        <div>
          <strong style="color: aliceblue">Votre navigateur est compatible !</strong>
          <p style="margin: 0.5rem 0 0 0">Les animations scroll() et view() fonctionneront correctement.</p>
        </div>
      `;
    } else {
      messageElement.style.border = "1px solid red";
      messageElement.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
        <div>
          <strong style="color: red">Attention : Navigateur non compatible</strong>
          <p style="margin: 0.5rem 0 0 0">Votre navigateur ne supporte pas encore les animations scroll() et view(). 
             Nous vous recommandons d'utiliser Chrome 115+ ou Edge pour une expérience optimale.</p>
        </div>
      `;
    }

    this.appendChild(messageElement);
  }
}

customElements.define(
  "browser-compatibility-message",
  BrowserCompatibilityMessage
);
