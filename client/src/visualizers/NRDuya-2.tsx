// 3rd party library imports
import * as P5 from "p5"
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const NRDuya = new Visualizer(
  'NRDuya',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const space_between_lines = (width / 2) / 128;
    const radius = width / 10;

    p5.background(0, 0, 0, 255);



    p5.translate( width / 2.5, height / 2 );
 
    p5.stroke( 0, 0, 255 );
    p5.ellipse( 0, 0, radius );

    let values = analyzer.getValue();
    for(let i = 0; i < values.length; i++){
      const amp = values[i] as number;
      const spin = height + amp * height;
      p5.rotate( p5.TWO_PI / values.length );
      p5.stroke( 255, 0, 0 );
      p5.line( 10, radius, 100, height - spin );
    }
  },
);