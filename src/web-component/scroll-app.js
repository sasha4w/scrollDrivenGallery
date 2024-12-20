import "./scroll-driven-compatibility.js";
import "./scroll-images.js";
import "./code-viewer-component.js";
import "./browser-compatibility.js";
import "./scroll-column.js";
class ScrollDrivenApp extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <browser-compatibility-message></browser-compatibility-message>
      <div class="explanation">
        <div class="section">
          <h2>La Problématique des Animations Pilotées</h2>
          <p>
            Avant l'introduction de <b>scroll()</b> et <b>view()</b>, les développeurs devaient s'appuyer sur JavaScript 
            pour créer des animations synchronisées avec le défilement de la page ou l'apparition des éléments à l'écran. 
            Cela posait plusieurs problèmes :
          </p>
          <ul>
            <li>Complexité accrue du code et difficulté de maintenance.</li>
            <li>Impact négatif sur les performances, en particulier sur mobile.</li>
            <li>Incohérences entre navigateurs.</li>
          </ul>
          <p>
            Avec les propriétés CSS comme <b>scroll()</b> et <b>view()</b>, les animations peuvent désormais être 
            directement liées aux événements de défilement ou de visibilité, simplifiant leur gestion et améliorant les performances.
          </p>
        </div>

        <div class="section">
          <h2>Exemple Simple avec scroll()</h2>
          <p>
            La propriété <b>scroll()</b> permet de synchroniser une animation avec la progression du défilement d'un 
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
          <p>Ainsi la barre que vous voyez progresser au fil du défilement de la page utiliser le <b>scroll()</b></p>
        </div>

        <div class="section">
          <h2>Les Avancées Apportées par view()</h2>
          <p>
            La propriété <b>view()</b> va plus loin en permettant de déclencher des animations en fonction de 
            la visibilité des éléments dans le viewport. Elle prend en charge plusieurs modes :
          </p>
          <ul>
            <li><strong>Entry</strong> : Animation au moment où l'élément entre dans le viewport.</li>
            <li><strong>Exit</strong> : Animation lorsque l'élément quitte le viewport.</li>
            <li><strong>Discrete</strong> : Pour des changements d'état discrets à des seuils spécifiques.</li>
          </ul>
          <code-viewer>
/* Exemple CSS */
  /* Image apparition avec le fait d'entrée dans le viewport */

  figure > img {
    scale: 0.8;
    opacity: 0;
    animation: fade-in linear forwards;
    animation-timeline: view();
    animation-range: entry;
  }
  @keyframes fade-in {
    to {
      scale: 1;
      opacity: 1;
    }
  }
          </code-viewer>
          <p>Ainsi l'animation ci-dessous est enclenché uniquement quand l'élément est visible dans le viewport</p>
          <scroll-images
            sources="./src/img/sonic.jpg"
            alts="Cover"
            captions="Sonic"
          ></scroll-images>
        </div>

        <div class="section">
          <h2>Applications Avancées</h2>
          <p>Voici quelques cas d'usage pratiques :</p>
          <ul>
            <li>Les propriétés <b>view()</b> et <b>scroll()</b> peuvent être utiliser dans un scroll à l'intérieur d'un conteneur</li>
            <li>Le scroll horizontal peut aussi être utiliser pour mettre en place des animations</li>
            <li>Mise à jour discrète des états visuels d'éléments spécifiques.</li>
          </ul>
          <code-viewer>
.column-reverse {
  transform: translateY(calc(-100% + 400px));
  flex-direction: column-reverse;
  animation: adjust-position linear forwards;
  animation-timeline: scroll();
  animation-duration: 100%;
}

.column img {
  border-radius: 10px;
  padding: 5px;
}

@keyframes adjust-position {
  from {
    transform: translateY(-100%);
  }

  to {
    transform: translateY(0);
  }
}

.columns {
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

          </code-viewer>
          <p> voici une animation un peu plus complexe utilisant le scroll d'un conteneur</p>
          <scroll-columns></scroll-columns>
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
          De plus  il est important de ne pas oublier d’implémenter des media queries pour les utilisateurs sensibles au mouvement. 
          Cela permet de respecter leur préférence lorsqu'ils désactivent les animations à l’aide de la règle suivante :
          <b> @media (prefers-reduced-motion: no-preference)</b>
          </p>
          <code-viewer>
                        @media (prefers-reduced-motion: no-preference) {
                .scroller[data-animated="true"] .scroller__inner {
                  animation: bg-shift linear;
                  animation-timeline: scroll(inline);
                }
                .scroller[data-direction="right"] .scroller__inner {
                  animation-direction: reverse;
                }

                @keyframes bg-shift {
                  0% {
                    background-color: green;
                  }
                  80% {
                    background-color: red;
                  }
                  100% {
                    background-color: red;
                  }
                }
              }
            }
          </code-viewer>
        </div>
        <p>Voici une animation qui utilise <b>view()</b> qui modifie le fond de couleur pour indiqué les navigateurs compatibles utilisant le scroll horizontal</p>
        <scroll-driven-compatibility> </scroll-driven-compatibility>
      </div>
    `;
  }
}

customElements.define("scroll-app", ScrollDrivenApp);
