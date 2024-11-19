import { setContext } from './set-context';
import sinon, { assert } from 'sinon';

describe('setContext', () => {
  const translate = sinon.stub();
  const scale = sinon.stub();
  const radius = 225;
  const fit = 'contain';
  const zoom = 1;
  const center = { radius: 0, angle: 0 };
  const canvas = { width: 200, height: 100 };
  const context = {
    canvas,
    translate,
    scale,
  } as unknown as CanvasRenderingContext2D;

  beforeEach(() => {
    sinon.reset();
  });

  it('should set the context properties correctly', () => {
    setContext(radius, zoom, center, fit, context);
    assert.calledOnce(translate);
    assert.calledWith(translate.firstCall, 100, 50);
    assert.calledTwice(scale);
    assert.calledWith(scale.firstCall, 1, -1);
    assert.calledWith(scale.secondCall, 0.2222222222222222, 0.2222222222222222);
  });

  it('should translate the context to the center point', () => {
    setContext(radius, zoom, { radius: 25, angle: 0 }, fit, context);
    assert.calledTwice(translate);
    assert.calledWith(translate.firstCall, 100, 50);
    assert.calledWith(translate.secondCall, -25, -0);
  });

  it('should handle zoom correctly', () => {
    setContext(radius, 0.5, center, fit, context);
    assert.calledThrice(scale);
    assert.calledWith(scale.firstCall, 1, -1);
    assert.calledWith(scale.secondCall, 0.2222222222222222, 0.2222222222222222);
    assert.calledWith(scale.thirdCall, 0.5, 0.5);

    sinon.reset();
    setContext(radius, 2, center, fit, context);
    assert.calledThrice(scale);
    assert.calledWith(scale.firstCall, 1, -1);
    assert.calledWith(scale.secondCall, 0.2222222222222222, 0.2222222222222222);
    assert.calledWith(scale.thirdCall, 2, 2);

    sinon.reset();
    setContext(radius, 1, center, fit, context);
    assert.calledTwice(scale);

    sinon.reset();
    setContext(radius, 0, center, fit, context);
    assert.calledTwice(scale);

    sinon.reset();
    setContext(radius, -1, center, fit, context);
    assert.calledTwice(scale);
  });

  it('should handle zero radius correctly', () => {
    setContext(0, zoom, center, fit, context);
    assert.calledWith(scale.secondCall, Infinity, Infinity);
  });

  it('should return if context is null', () => {
    setContext(radius, 1, center, fit, null as any);
    assert.notCalled(translate);
    assert.notCalled(scale);
  });
});
