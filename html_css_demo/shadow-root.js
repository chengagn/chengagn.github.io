// Use me as:
// <parent>
//   <shadow-root>Parent's shadow root</shadow-root>
//   Parent's other content
// </parent>
//
// Note: This would work better if it could extend <template> and be used
// as <template is=shadow-root>.
export class ShadowRoot extends HTMLElement {
  connectedCallback() {
    let shadow = this.parentElement.attachShadow({mode: 'open'});
    let nextChild = this.firstChild;
    while (nextChild != null) {
      let current = nextChild;
      nextChild = nextChild.nextSibling;
      shadow.appendChild(current);
    }
    this.remove();
  }
};

window.customElements.define('shadow-root', ShadowRoot);
