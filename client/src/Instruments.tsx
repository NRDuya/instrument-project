// 3rd party library imports
import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

// project imports
import { DispatchAction } from './Reducer';
import { AppState } from './State';

/** ------------------------------------------------------------------------ **
 * Contains implementation of an Instruments.
 ** ------------------------------------------------------------------------ */

export interface InstrumentProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  name: string;
  synth: Tone.Synth;
  setSynth: (f: (oldSynth: Tone.Synth) => Tone.Synth) => void;
  guitarSample: Tone.Sampler;
  xylophoneSample: Tone.Sampler;
}

export class Instrument {
  public readonly name: string;
  public readonly component: React.FC<InstrumentProps>;

  constructor(name: string, component: React.FC<InstrumentProps>) {
    this.name = name;
    this.component = component;
  }
}

function TopNav({ name }: { name: string }) {
  return (
    <div
      className={
        'w-100 h3 bb b--light-gray flex justify-between items-center ph4'
      }
    >
      <div>{name}</div>
    </div>
  );
}

interface InstrumentContainerProps {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
  instrument: Instrument;
}

export const InstrumentContainer: React.FC<InstrumentContainerProps> = ({
  instrument,
  state,
  dispatch,
}: InstrumentContainerProps) => {
  const InstrumentComponent = instrument.component;
  const [synth, setSynth] = useState(
    new Tone.Synth({
      oscillator: { type: 'sine' } as Tone.OmniOscillatorOptions,
    }).toDestination(),
  );

  const [guitarSample] = useState(
    new Tone.Sampler({
      urls: {
        A2: "A2.mp3",
        E2: "E2.mp3",
        B3: "B3.mp3",
        D3: "D3.mp3",
        E3: "E3.mp3",
        G3: "G3.mp3",
      },
      baseUrl: "./assets/samples/guitar/",
      onload: () => {
        console.log("Guitar samples loaded!");
      }
    }).toDestination(),
  );

  const [xylophoneSample] = useState(
    new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        B1: "B1.mp3",
        C1: "C1.mp3",
        C2: "C2.mp3",
        D1: "D1.mp3",
        E1: "E1.mp3",
        F1: "F1.mp3",
        G1: "G1.mp3",
      },
      baseUrl: "./assets/samples/xylophone/",
      onload: () => {
        console.log("Xylophone samples loaded!");
      }
    }).toDestination(),
  );

  const notes = state.get('notes');

  useEffect(() => {
    if (notes && synth) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        synth.triggerAttackRelease(value.note, '4n', time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    else if (notes && (guitarSample || xylophoneSample)) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        guitarSample.triggerAttackRelease(value.note, '4n', time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    return () => { };
  }, [notes, synth, guitarSample, xylophoneSample, dispatch]);


  return (
    <div>
      <TopNav name={instrument.name} />
      <div
        className={'bg-white absolute right-0 left-0'}
        style={{ top: '4rem' }}
      >
        <InstrumentComponent
          name={instrument.name}
          state={state}
          dispatch={dispatch}
          synth={synth}
          setSynth={setSynth}
          guitarSample={guitarSample}
          xylophoneSample={xylophoneSample}
        />
      </div>
    </div>
  );
};
