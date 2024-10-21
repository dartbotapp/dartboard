import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { Dartboard } from '../src/Dartboard.js';
import '../src/dartbot-dartboard.js';

describe('DartbotDartboard', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<Dartboard>(
      html`<dartbot-dartboard></dartbot-dartboard>`,
    );

    expect(el.board).to.equal('Hey there');
    expect(el.board).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<Dartboard>(
      html`<dartbot-dartboard></dartbot-dartboard>`,
    );
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.board).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<Dartboard>(
      html`<dartbot-dartboard header="attribute header"></dartbot-dartboard>`,
    );

    expect(el.board).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<Dartboard>(
      html`<dartbot-dartboard></dartbot-dartboard>`,
    );

    await expect(el).shadowDom.to.be.accessible();
  });
});
