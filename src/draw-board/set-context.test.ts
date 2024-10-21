import { setContext } from './set-context';

describe('setContext', () => {
  const translate = jest.fn();
  const rotate = jest.fn();
  const scale = jest.fn();
  const radius = 100;
  const sectors = 20;
  const zoom = 0;
  const centerPoint = { radius: 0, angle: 0 };
  const canvas = { width: 200, height: 100 };
  const context = {
    canvas,
    translate,
    rotate,
    scale,
  } as unknown as CanvasRenderingContext2D;
  let params: any;

  beforeEach(() => {
    jest.resetAllMocks();
    params = { radius, sectors, zoom, centerPoint };
  });

  it('should set the context properties correctly', () => {
    setContext(params, context);
    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith(100, 50);
    expect(rotate).toHaveBeenCalledWith(-1.7278759594743862);
    expect(scale).toHaveBeenCalledWith(0.5, 0.5);
  });

  it('should translate the context to the center point', () => {
    params.centerPoint = { radius: 25, angle: 0 };
    setContext(params, context);
    expect(translate).toHaveBeenCalledTimes(2);
    expect(translate.mock.calls[0]).toEqual([100, 50]);
    expect(translate.mock.calls[1]).toEqual([-25, -0]);
  });

  it('should handle zoom correctly', () => {
    params.zoom = -1;
    setContext(params, context);
    expect(scale).toHaveBeenCalledWith(0.25, 0.25);

    jest.clearAllMocks();
    params.zoom = 1;
    setContext(params, context);
    expect(scale).toHaveBeenCalledWith(1, 1);
  });

  it('should handle zero radius correctly', () => {
    setContext({ ...params, centerPoint: { radius: 0, angle: 0 } }, context);
    expect(translate).toHaveBeenCalledWith(100, 50);
  });

  it('should handle zero sectors correctly', () => {
    setContext({ ...params, sectors: 0 }, context);
    expect(rotate).toHaveBeenCalledWith(-Math.PI / 2);
  });

  it('should handle defaults', () => {
    const p = { ...params };
    p.zoom = undefined;
    p.centerPoint = undefined;
    setContext(p, context);
    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith(100, 50);
    expect(rotate).toHaveBeenCalledWith(-1.7278759594743862);
    expect(scale).toHaveBeenCalledWith(0.5, 0.5);

    jest.clearAllMocks();
    const p1 = { ...params };
    p1.centerPoint = {} as any;
    setContext(p1, context);
    expect(scale).toHaveBeenCalledWith(0.5, 0.5);
  });

  it('should return if context is null', () => {
    setContext(params, undefined as any);
    expect(translate).not.toHaveBeenCalled();
    expect(rotate).not.toHaveBeenCalled();
    expect(scale).not.toHaveBeenCalled();
  });

  it('should handle missing width and height properties in canvas', () => {
    const canvas = {
      translate,
      rotate,
      scale,
    } as unknown as CanvasRenderingContext2D;
    const params: any = { radius, sectors, zoom, centerPoint };
    setContext(params, canvas);
    expect(translate).toHaveBeenCalledTimes(1);
    expect(translate).toHaveBeenCalledWith(NaN, NaN);
    expect(scale).toHaveBeenCalledWith(NaN, NaN);
  });
});
