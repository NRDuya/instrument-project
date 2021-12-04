// 3rd party library imports

import '../css/drumset.css';
// project imports
import { Instrument, InstrumentProps } from '../Instruments';


function Drumset({ drumsetSample }: InstrumentProps): JSX.Element {
  return (
    <div className = "container">
          <div className = "drumset">
              <div className = "first-cymbal"
              onMouseDown={() => drumsetSample?.triggerAttack(`G1`)} 
              onMouseUp={() => drumsetSample?.triggerRelease('+0.25')}></div>
              <div className = "second-cymbal"
              onMouseDown={() => drumsetSample?.triggerAttack(`F1`)} 
              onMouseUp={() => drumsetSample?.triggerRelease('+0.25')}></div>
              <div className = "third-cymbal"
              onMouseDown={() => drumsetSample?.triggerAttack(`A2`)} 
              onMouseUp={() => drumsetSample?.triggerRelease('+0.25')}></div>
              <div className = "first-drum"
              onMouseDown={() => drumsetSample?.triggerAttack(`D1`)} 
              onMouseUp={() => drumsetSample?.triggerRelease('+0.25')}></div>
              <div className = "second-drum"
              onMouseDown={() => drumsetSample?.triggerAttack(`C1`)} 
              onMouseUp={() => drumsetSample?.triggerRelease('+0.25')}></div>
              <div className = "third-drum"
              onMouseDown={() => drumsetSample?.triggerAttack(`B1`)} 
              onMouseUp={() => drumsetSample?.triggerRelease('+0.25')}
              ></div>
              <div className = "fourth-drum"              
              onMouseDown={() => drumsetSample?.triggerAttack(`A1`)} 
              onMouseUp={() => drumsetSample?.triggerRelease('+0.25')}></div>
              <div className = "kick-drum"
              onMouseDown={() => drumsetSample?.triggerAttack(`E1`)} 
              onMouseUp={() => drumsetSample?.triggerRelease('+0.25')}></div>
          </div>
    </div>
  );
}

export const DrumsetInstrument= new Instrument('Drumset', Drumset);