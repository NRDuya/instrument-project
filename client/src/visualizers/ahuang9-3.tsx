// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const TwoDimensionalVisualizer = new Visualizer(
  'Two Dimensional Shape',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);
    p5.stroke(255, 255, 255, 255);
    p5.noFill();


    p5.angleMode('degrees');    // Changes from radius to degrees
    p5.translate(width / 2, height / 2);   // Centers the circle

    const values = analyzer.getValue();
    p5.beginShape();
    // for (let i = 0; i < values.length; i++) {
    //   const amplitude = values[i] as number;
    //   const x = p5.map(i, 0, values.length - 1, 0, width);
    //   const y = height / 2 + amplitude * height;
    //   // Place vertex
    //   p5.vertex(x, y);
    // }
    for (let i = 0; i <= 180; i++) {
      const amplitude = values[i] as number;

      // const index = p5.map(i, 0, 180, 0, values.length -1);
      const r = p5.map(amplitude, -1, 1, 50, 250);
      const x = r * Math.sin(i);
      const y = r * Math.cos(i);
      // Place vertex
      p5.vertex(x, y);
    }
    p5.endShape();
  },
);
