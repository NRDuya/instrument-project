// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
interface XylophoneKeyProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    sampler: Tone.Sampler; // Contains library code for making sound
    index: number; // octave + index together give a location for the piano key
}
  
export function XylophoneKey({
    note,
    sampler,
    index,
}: XylophoneKeyProps): JSX.Element {
    return (
      <div
        onMouseDown={() => sampler?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
        onMouseUp={() => sampler?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
        className={classNames('ba pointer absolute dim', 'black bg-white h4')}
        style={{
            left: `${index * 2}rem`,
            borderRadius: '5px',
            height: `${200 - (15 * index)}px`,
            padding: '.75rem',
            marginRight: '1rem'
        }}
      ></div>
    );
  }
  
function Xylophone({ sampler, setSampler }: InstrumentProps): JSX.Element {
    const keys = List([
        { note: 'C', idx: 0 },
        { note: 'D', idx: 1 },
        { note: 'E', idx: 2 },
        { note: 'F', idx: 3 },
        { note: 'G', idx: 4 },
        { note: 'A', idx: 5 },
        { note: 'B', idx: 6 },
        { note: 'C', idx: 7 },
      ]);

    return (
    <div className="pv4">
        <div className="relative dib h4 w-100 ml4">
        {
            keys.map(key => {
            const note = `${key.note}`;
            return (
                <XylophoneKey
                key={note} //react key
                note={note}
                sampler={sampler}
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
