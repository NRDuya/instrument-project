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
    let up = 0;
    let down = values.length;
    while(up < values.length){
      p5.fill(up*3,255,255);
      const upAmp = values[up] as number;
      const downAmp = values[down] as number;
      const uY = height + upAmp * height;
      const dY = height + downAmp * height;

      p5.rotate( p5.TWO_PI / values.length );
      // p5.rect(radius / 2, uY / 8, space_between_lines, height - uY);
      // p5.rect(radius, dY / 4, space_between_lines, height - dY);
      p5.stroke( 255, 0, 0 );
      p5.line( 10, radius, 0, height - uY );
    
      p5.stroke( 0 , 0, 255 );
      p5.line( -10, radius/2, 0, height - dY ); 
      down--;
      up++;
    }
  },
);