// 3rd party library imports
import * as P5 from "p5"
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const Testform = new Visualizer(
  'Testform',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const space_between_lines = (width/2) / 64;

    p5.background(0, 0, 0, 255);

    let values = analyzer.getValue();
    for (let i = 0; i < values.length; i++) {
      p5.fill(i*3,255,255); //fill(i,255,255);
      const amp = values[i] as number;
      const y = height + amp * height;
      p5.rect((width/2) + (i * space_between_lines), y, space_between_lines, y);
      p5.rect((width/2) - (i * space_between_lines), y, space_between_lines, height - y);
    }
  },
);