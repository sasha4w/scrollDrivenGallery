class ScrollImages extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  // Méthode pour transformer les attributs en tableau d'objets
  parseImageData() {
    const sources = (this.getAttribute('sources') || '').split(',');
    const alts = (this.getAttribute('alts') || '').split(',');
    const captions = (this.getAttribute('captions') || '').split(',');

    // Utilise des valeurs par défaut si pas assez de données
    return sources.map((src, index) => ({
      src: src.trim(), 
      alt: alts[index] || 'Image', 
      caption: captions[index] || 'CJ le goat de ce jeu en fait'
    }));
  }

  render() {
    const images = this.parseImageData();
    
    this.innerHTML = images.map(img => `
      <figure>
        <img src="${img.src}" alt="${img.alt}" />
        <figcaption>${img.caption}</figcaption>
      </figure>
    `).join('');
  }
}

customElements.define('scroll-images', ScrollImages);
