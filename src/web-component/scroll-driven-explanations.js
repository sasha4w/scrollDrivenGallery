import "./scroll-driven-compatibility.js";
import "./scroll-images.js";
import "./code-viewer-component.js";
class ScrollDrivenExplanations extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="explanation">
        <div class="section">
          <h2>La Problématique des Animations Pilotées</h2>
          <p>
            Avant l'introduction de <code>scroll()</code> et <code>view()</code>, les développeurs devaient s'appuyer sur JavaScript 
            pour créer des animations synchronisées avec le défilement de la page ou l'apparition des éléments à l'écran. 
            Cela posait plusieurs problèmes :
          </p>
          <ul>
            <li>Complexité accrue du code et difficulté de maintenance.</li>
            <li>Impact négatif sur les performances, en particulier sur mobile.</li>
            <li>Incohérences entre navigateurs.</li>
          </ul>
          <p>
            Avec les propriétés CSS comme <code>scroll()</code> et <code>view()</code>, les animations peuvent désormais être 
            directement liées aux événements de défilement ou de visibilité, simplifiant leur gestion et améliorant les performances.
          </p>
        </div>

        <div class="section">
          <h2>Exemple Simple avec scroll()</h2>
          <p>
            La propriété <code>scroll()</code> permet de synchroniser une animation avec la progression du défilement d'un 
            élément ou de la page entière.
          </p>
          <code-viewer>
/* Exemple CSS */
.progress-bar {
  animation: progress linear;
  animation-timeline: scroll();
}

@keyframes progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
          </code-viewer>
          <div class="demo-box"></div>
        </div>

        <div class="section">
          <h2>Les Avancées Apportées par view()</h2>
          <p>
            La propriété <code>view()</code> va plus loin en permettant de déclencher des animations en fonction de 
            la visibilité des éléments dans le viewport. Elle prend en charge plusieurs modes :
          </p>
          <ul>
            <li><strong>Entry</strong> : Animation au moment où l'élément entre dans le viewport.</li>
            <li><strong>Exit</strong> : Animation lorsque l'élément quitte le viewport.</li>
            <li><strong>Discrete</strong> : Pour des changements d'état discrets à des seuils spécifiques.</li>
          </ul>
          <code-viewer>
/* Exemple CSS */
.fade-in {
  opacity: 0;
  animation: appear 1s ease-out;
  animation-timeline: view();
  animation-range: entry;
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
          </code-viewer>
          <scroll-images
            sources="./src/img/chinese_gopher.jpg"
            alts="Cover"
            captions="Mascotte"
          ></scroll-images>
        </div>

        <div class="section">
          <h2>Applications Avancées</h2>
          <p>Voici quelques cas d'usage pratiques :</p>
          <ul>
            <li>Animations parallaxes synchronisées avec le défilement.</li>
            <li>Transitions d'entrée/sortie pour des sections.</li>
            <li>Mise à jour discrète des états visuels d'éléments spécifiques.</li>
          </ul>
          <code-viewer>
/* Exemple CSS avancé */
.parallax-section {
  animation: parallax linear;
  animation-timeline: scroll();
  animation-range: entry 0 exit 100%;
}

.state-change {
  animation: change step-end;
  animation-timeline: view();
  animation-range: cover 0 cover 100%;
}
          </code-viewer>
        </div>

        <div class="section">
          <h2>Compatibilité et Limites</h2>
          <p>
            Bien que ces fonctionnalités soient puissantes, elles ne sont pas encore universellement supportées. 
            Voici un résumé :
          </p>
          <ul>
            <li><strong>Chrome</strong> : Supporté depuis la version 115.</li>
            <li><strong>Edge</strong> : Support complet.</li>
            <li><strong>Safari</strong> : Support partiel.</li>
            <li><strong>Firefox</strong> : En cours de développement.</li>
          </ul>
          <p>
            Pensez à fournir des fallbacks ou des alternatives basées sur JavaScript pour les navigateurs non compatibles.
          </p>
        </div>
        <scroll-driven-compatibility> </scroll-driven-compatibility>
      </div>
    `;
  }
}

customElements.define("scroll-driven-explanations", ScrollDrivenExplanations);
