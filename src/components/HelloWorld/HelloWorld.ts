export interface HelloWorldProps {
}

export class HelloWorld extends HTMLElement {

  // connect component
  connectedCallback() {
    this.textContent = 'Hello World!';
  }

}

customElements.define( 'hello-world', HelloWorld );
