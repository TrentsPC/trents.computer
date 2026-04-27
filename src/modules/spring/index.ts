import { Accessor, createEffect, createMemo, createSignal, untrack } from "solid-js";

export type CreateSpringOptions = {
  value: number;
  /**
   * The period of the spring in seconds.
   *
   * This is the time it takes for the spring to complete one full oscillation.
   * This is not the time it takes for the spring to reach its final value.
   *
   * For example, a spring with a damping of 0 will oscillate forever, no matter
   * the period. A spring with a period of 1 and a damping of 1 will animate
   * for about 1.5 seconds.
   */
  period?: number;
  /**
   * The damping ratio of the spring.
   *
   * A value of 1 will cause the spring to reach its final value as fast as possible without bouncing.
   *
   * Values less than 1 will be bouncy, and values greater than 1 will be sluggish.
   *
   * @default 1
   */
  damping?: number;
};

/**
 * Creates a readonly derived reactive springy signal
 */
export function createSpring(opts: Accessor<CreateSpringOptions>): Accessor<number> {
  const [value, setValue] = createSignal(opts().value);
  const [velocity, setVelocity] = createSignal(0);

  const equilibrium = createMemo(() => {
    return opts().value;
  });
  const period = createMemo(() => {
    return opts().period ?? 1;
  });
  const damping = createMemo(() => {
    return opts().damping ?? 1;
  });

  /**
   * The spring constant, k.
   */
  const springConstant = createMemo(() => {
    return (4 * Math.PI * Math.PI) / (period() * period());
  });

  /**
   * The viscous damping coefficient, c.
   */
  const dampingConstant = createMemo(() => {
    if (springConstant() === 0) return 0;
    return damping() * 2 * Math.sqrt(springConstant());
  });

  function step(millis: number): boolean {
    if (Math.abs(velocity()) < 0.001 && Math.abs(value() - equilibrium()) < 0.001) {
      setVelocity(0);
      setValue(equilibrium());
      return false;
    }

    const k = springConstant();
    const c = dampingConstant();
    const x0 = equilibrium();

    const stepSizeMillis = 1;
    const steps = millis / stepSizeMillis;
    let dt = stepSizeMillis / 1000;

    let x = value();
    let v = velocity();

    for (let i = 0; i < steps; i++) {
      // Force is equivalent to acceleration because I take mass to be 1kg.
      const F = -k * (x - x0) - c * v;

      const dx = v * dt;
      const dv = F * dt;

      x = x + dx;
      v = v + dv;
    }

    setValue(x);
    setVelocity(v);

    return true;
  }

  let isAnimating = false;
  function animate() {
    if (isAnimating) return;
    isAnimating = true;
    eachFrame(step, {
      onCompleted: () => {
        isAnimating = false;
      },
    });
  }

  createEffect(() => {
    equilibrium();
    untrack(() => {
      animate();
    });
  });

  return value;
}

/**
 * Calls a function on each frame, passing the time since the last frame in milliseconds.
 *
 * This will automatically stop when the function returns false.
 */
function eachFrame(fn: (ms: number) => boolean, { onCompleted = () => {} }) {
  let lastTime = 0;
  function loop(timeStamp: number) {
    const value = timeStamp - lastTime;
    let enabled = fn(value);
    lastTime = timeStamp;
    enabled ? requestAnimationFrame(loop) : onCompleted();
  }
  function firstFrame(timeStamp: number) {
    lastTime = timeStamp;
    loop(timeStamp);
  }
  requestAnimationFrame(firstFrame);
}
