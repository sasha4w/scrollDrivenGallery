class CodeViewer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  // Fonction pour échapper les caractères HTML spéciaux
  escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Fonction pour coloriser le code CSS
  highlightCSS(code) {
    return code
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>') // Commentaires
      .replace(/@[\w-]+/g, '<span class="at-rule">$&</span>') // @-rules
      .replace(/([{};])/g, '<span class="punctuation">$1</span>') // Ponctuation
      .replace(/([^:\s{]*):/g, '<span class="property">$1</span>:') // Propriétés
      .replace(/:\s*([^;}{]*)/g, ': <span class="value">$1</span>') // Valeurs
      .replace(/(\.[^\s{},]+)/g, '<span class="selector">$1</span>'); // Classes
  }

  connectedCallback() {
    const style = `
      :host {
        display: block;
        font-family: 'Consolas', 'Courier New', monospace;
        font-size: 14px;
      }

      .container {
        background-color: #1e1e1e;
        border-radius: 6px;
        overflow: hidden;
        margin: 1em 0;
      }

      .titlebar {
        background-color: #2d2d2d;
        padding: 8px;
        border-bottom: 1px solid #404040;
        display: flex;
        align-items: center;
      }

      .buttons {
        display: flex;
        gap: 8px;
      }

      .button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }

      .close { background-color: #ff5f56; }
      .minimize { background-color: #ffbd2e; }
      .maximize { background-color: #27c93f; }

      .code-content {
        padding: 16px;
        margin: 0;
        color: #d4d4d4;
        overflow-x: auto;
        line-height: 1.5;
      }

      .comment { color: #608b4e; }
      .selector { color: #9cdcfe; }
      .property { color: #9cdcfe; }
      .value { color: #ce9178; }
      .punctuation { color: #d4d4d4; }
      .at-rule { color: #c586c0; }
    `;

    // Récupérer le contenu entre les balises
    const code = this.innerHTML;
    
    const html = `
      <div class="container">
        <div class="titlebar">
          <div class="buttons">
            <div class="button close"></div>
            <div class="button minimize"></div>
            <div class="button maximize"></div>
          </div>
        </div>
        <pre class="code-content"><code>${this.highlightCSS(this.escapeHtml(code))}</code></pre>
      </div>
    `;

    this.shadowRoot.innerHTML = `<style>${style}</style>${html}`;
  }
}

customElements.define('code-viewer', CodeViewer);
