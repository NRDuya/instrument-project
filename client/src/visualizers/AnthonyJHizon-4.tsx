// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

let angle = 0;

export const AnthonyVisualizer = new Visualizer(
  'AnthonyVisualizer',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.strokeWeight(dim *.01);
    p5.angleMode(p5.DEGREES);
    

    p5.translate(width/2,height/2)
    p5.rotate(angle);
    p5.rectMode(p5.CENTER);

    const values = analyzer.getValue();

    p5.beginShape();
    for (let i = 0; i < values.length; i++) {
      var amplitude = values[i] as number;
      const side_length = (100 + amplitude * 250) * 2;

      p5.square(0, 0, side_length);

      if(amplitude > 0)
      {
        const x = Math.random() * 255;
        const y = Math.random() * 255;
        const z = Math.random() * 255;
        const k = Math.random() * 255;

        p5.fill(x,y,z,k);
        p5.stroke(x,y,z,k);
      }
      else
      {
        p5.fill(0,0,0);
        p5.stroke(255, 255, 255, 255);
      }

      p5.background(0,0,0,0);

      if(angle >= 360)
      {
        angle = 0;
      }
      else
      {
        angle += Math.abs(amplitude)/75;
      }  
    }
    p5.endShape();

  },
);