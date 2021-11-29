// 3rd party library imports
import * as Tone from 'tone';
import { List } from 'immutable';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import '../css/xylophone.css';

interface XylophoneKeyProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    xylophoneSample: Tone.Sampler; // Contains library code for making sound
    index: number; // octave + index together give a location for the piano key
}
  
export function XylophoneKey({
    note,
    xylophoneSample,
    index,
}: XylophoneKeyProps): JSX.Element {
    return (
      <div
        onMouseDown={() => xylophoneSample?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
        onMouseUp={() => xylophoneSample?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
        className="xylophoneKey"
        style={{
            left: `${index * 2}rem`,
            height: `${250 - (15 * index)}px`,
        }}
      >
        {note}
      </div>
    );
  }
  
function Xylophone({ xylophoneSample }: InstrumentProps): JSX.Element {
    const keys = List([
        { note: 'C4', idx: 0 },
        { note: 'D4', idx: 1 },
        { note: 'E4', idx: 2 },
        { note: 'F4', idx: 3 },
        { note: 'G4', idx: 4 },
        { note: 'A4', idx: 5 },
        { note: 'B4', idx: 6 },
        { note: 'C5', idx: 7 },
      ]);

    return (
    <div className="pv4">
        <div className="xylophone">
        {
            keys.map(key => {
            const note = `${key.note}`;
            return (
                <XylophoneKey
                key={note} //react key
                note={note}
                xylophoneSample={xylophoneSample}
                index={key.idx}
                />
            );
            })
        }
        </div>
    </div>
    );
}

export const XylophoneInstrument = new Instrument('Xylophone', Xylophone);
