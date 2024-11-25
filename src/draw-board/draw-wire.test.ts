import { expect } from 'chai';
import sinon from 'sinon';
import { drawWire } from './draw-wire';
import { createBoard } from './board';
import { Theme } from '../theme';

describe('drawWire', () => {
  const board = createBoard();
  const save = sinon.stub();
  const beginPath = sinon.stub();
  const arc = sinon.stub();
  const stroke = sinon.stub();
  const rotate = sinon.stub();
  const moveTo = sinon.stub();
  const lineTo = sinon.stub();
  const restore = sinon.stub();
  const c = { save, beginPath, arc, stroke, rotate, moveTo, lineTo, restore };
  const context = c as unknown as CanvasRenderingContext2D;

  beforeEach(() => {
    sinon.reset();
  });

  it('should draw the wire', () => {
    const stubs = [
      save,
      beginPath,
      arc,
      stroke,
      rotate,
      moveTo,
      lineTo,
      restore,
    ];
    const theme = { wireShow: false, numberShow: false } as unknown as Theme;

    drawWire(board, theme, context);
    stubs.forEach(fn => {
      expect(fn.called).to.equal(false);
    });

    sinon.reset();
    drawWire(
      board,
      { ...theme, numberShow: true, numberWireShow: false },
      context,
    );
    stubs.forEach(fn => {
      expect(fn.called).to.equal(false);
    });

    sinon.reset();
    drawWire(
      board,
      { ...theme, numberShow: false, numberWireShow: true },
      context,
    );
    stubs.forEach(fn => {
      expect(fn.called).to.equal(false);
    });
  });
});
