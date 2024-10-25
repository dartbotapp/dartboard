import { expect } from '@open-wc/testing';
import { setContext } from './set-context';
import { Board } from '../utils';
import sinon, { assert } from 'sinon';

describe('setContext', () => {
  const translate = sinon.stub();
  const rotate = sinon.stub();
  const scale = sinon.stub();
  const radius = 100;
  const sectors = 20;
  const zoom = 0;
  const centerPoint = { radius: 0, angle: 0 };
  const canvas = { width: 200, height: 100 };
  const board = Board.create();
  const context = {
    canvas,
    translate,
    rotate,
    scale,
  } as unknown as CanvasRenderingContext2D;
  let params: any;

  beforeEach(() => {
    sinon.reset();
    params = { radius, sectors, zoom, centerPoint };
  });

  it('should set the context properties correctly', () => {
    setContext(board, params, context);
    assert.calledWith(translate, 100, 50);
    assert.calledWith(rotate, -1.7278759594743862);
    assert.calledWith(scale, 0.2222222222222222, 0.2222222222222222);
  });

  it('should translate the context to the center point', () => {
    params.centerPoint = { radius: 25, angle: 0 };
    setContext(board, params, context);
    assert.calledTwice(translate);
    expect(translate.getCall(0).args).eql([100, 50]);
    expect(translate.getCall(1).args).eql([-25, -0]);
  });

  it('should handle zoom correctly', () => {
    params.zoom = -1;
    setContext(board, params, context);
    expect(scale.getCall(0).args).eql([0.1111111111111111, 0.1111111111111111]);

    sinon.reset();
    params.zoom = 1;
    setContext(board, params, context);
    expect(scale.getCall(0).args).eql([0.4444444444444444, 0.4444444444444444]);
  });

  it('should handle zero radius correctly', () => {
    setContext(
      board,
      { ...params, centerPoint: { radius: 0, angle: 0 } },
      context,
    );
    expect(translate.getCall(0).args).eql([100, 50]);
  });

  it('should handle zero sectors correctly', () => {
    setContext(board, { ...params, sectors: 0 }, context);
    expect(rotate.getCall(0).args).eql([-1.7278759594743862]);
  });

  it('should handle defaults', () => {
    const p = { ...params };
    p.zoom = undefined;
    p.centerPoint = undefined;
    setContext(board, p, context);
    assert.calledOnce(translate);
    expect(translate.calledWith(100, 50)).to.be.true;
    expect(rotate.calledWith(-1.7278759594743862)).to.be.true;
    expect(scale.getCall(0).args).eql([0.2222222222222222, 0.2222222222222222]);
  });

  it('should return if context is null', () => {
    setContext(board, params, undefined as any);
    expect(translate.called).not.to.be.true;
    expect(rotate.called).not.to.be.true;
    expect(scale.called).not.to.be.true;
  });

  it('should handle missing width and height properties in canvas', () => {
    const canvas = {
      translate,
      rotate,
      scale,
    } as unknown as CanvasRenderingContext2D;
    const params: any = { radius, sectors, zoom, centerPoint };
    setContext(board, params, canvas);
    assert.calledOnce(translate);
    expect(translate.getCall(0).args).eql([NaN, NaN]);
    expect(scale.getCall(0).args).eql([NaN, NaN]);
  });
});
