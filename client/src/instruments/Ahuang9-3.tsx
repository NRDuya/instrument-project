// 3rd party library imports
import * as Tone from 'tone';
import { List } from 'immutable';

// Project imports
import { Instrument, InstrumentProps } from '../Instruments';
import '../css/kalimba.css';

interface KalimbaKeyProps {
  note: string;
  duration?: string;
  index: number;
  kalimbaSample: Tone.Sampler;
}

export function KalimbaKey({
  note,
  index,
  kalimbaSample,
}: KalimbaKeyProps): JSX.Element {
  return (
    <div
      onMouseDown={() => kalimbaSample?.triggerAttack(`${note}`)}
      onMouseUp={() => kalimbaSample?.triggerRelease('+0.25')}
      className="kalimba-tab "
    >
      {note}
      {/* <div className="kalimba-container">
        <div className="kalimba-tab kalimba-tab-1">G4</div>
        <div className="kalimba-tab kalimba-tab-2">E5</div>
        <div className="kalimba-tab kalimba-tab-3">D4</div>
        <div className="kalimba-tab kalimba-tab-4">C5</div>
        <div className="kalimba-tab kalimba-tab-5">A3</div>
        <div className="kalimba-tab kalimba-tab-6">G3</div>
        <div className="kalimba-tab kalimba-tab-7">A4</div>
        <div className="kalimba-tab kalimba-tab-8">C4</div>
        <div className="kalimba-tab kalimba-tab-9">D5</div>
        <div className="kalimba-tab kalimba-tab-10">E4</div>
      </div> */}
    </div>
    
  );
}

// G4 E5 D4 C5 A3 G3 A4 C4 D5 E4
// 10 keys/tabs
function Kalimba({ kalimbaSample }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'G4', idx: 0 },
    { note: 'E5', idx: 1 },
    { note: 'D4', idx: 2 },
    { note: 'C5', idx: 3 },
    { note: 'A3', idx: 4 },
    { note: 'G3', idx: 5 },
    { note: 'A4', idx: 6 },
    { note: 'C4', idx: 7 },
    { note: 'D5', idx: 8 },
    { note: 'E4', idx: 9 },
  ]);


  return (
    <div className="pv4">
      <div className="kalimba-circle"></div>
      <div className="kalimba-container">
          {keys.map(key => {
            const note = `${key.note}`;
            return (
              <KalimbaKey
                key={note} //react key
                index={key.idx}
                note={note}
                kalimbaSample={kalimbaSample}
              />
            );
          })
          }
      </div>

    </div>
  );
}

export const KalimbaInstrument = new Instrument('Kalimba', Kalimba);
