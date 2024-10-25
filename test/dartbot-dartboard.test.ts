import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { Dartboard } from '../src/Dartboard.js';
import '../src/dartbot-dartboard.js';

describe('DartbotDartboard', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<Dartboard>(
      html`<dartbot-dartboard></dartbot-dartboard>`,
    );

    expect(el.board).to.exist;
  });
});
