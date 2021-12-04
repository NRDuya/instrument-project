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
  drumsetSample: Tone.Sampler;
  xylophoneSample: Tone.Sampler;
  kalimbaSample: Tone.Sampler;
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

  const [drumsetSample] = useState(
    new Tone.Sampler({
      urls: {
        A1: "snare-drum.mp3",
        B1: "tom-drum-1.mp3",
        C1: "tom-drum-2.mp3",
        D1: "tom-drum-3.mp3",
        E1: "kick-drum.mp3",
        F1: "hi-hat-cymbal.mp3",
        G1: "crash-cymbal.mp3",
        A2: "ride-cymbal.mp3",
      },
      baseUrl: "./assets/samples/drumset/"
    }).toDestination(),
  );

  const [xylophoneSample] = useState(
    new Tone.Sampler({
      urls: {
        A4: "A4.mp3",
        B4: "B4.mp3",
        C4: "C4.mp3",
        D4: "D4.mp3",
        E4: "E4.mp3",
        F4: "F4.mp3",
        G4: "G4.mp3",
      },
      baseUrl: "./assets/samples/xylophone/",
      onload: () => {
        console.log("Xylophone samples loaded!");
      }
    }).toDestination(),
  );

  const [kalimbaSample] = useState(
    new Tone.Sampler({
      urls: {
        A3: "A3.mp3",
        G3: "G3.mp3",

        A4: "A4.mp3",//
        // B4: "B4.mp3",
        C4: "C4.mp3",//
        D4: "D4.mp3",//
        E4: "E4.mp3",//
        // F4: "F4.mp3",
        G4: "G4.mp3",//
//A3 G3
        // A5: "A5.mp3",
        // B5: "B5.mp3",
        C5: "C5.mp3",//
        D5: "D5.mp3",//
        E5: "E5.mp3",//
        // F5: "F5.mp3",
        // G5: "G5.mp3",

        // C6: "C6.mp3",
        // D6: "D6.mp3",
        // E6: "E6.mp3",
      },
      baseUrl: "./assets/samples/kalimba/",
      onload: () => {
        console.log("Kalimba samples loaded!");
      }
    }).toDestination(),
  );

  const notes = state.get('notes');

  useEffect(() => {
    if (instrument.name === 'Guitar' && notes && guitarSample) {
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

    else if (instrument.name === 'Xylophone' && notes && xylophoneSample) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        xylophoneSample.triggerAttackRelease(value.note, '4n', time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    else if (instrument.name === 'Kalimba' && notes && kalimbaSample) {
      let eachNote = notes.split(' ');
      let noteObjs = eachNote.map((note: string, idx: number) => ({
        idx,
        time: `+${idx / 4}`,
        note,
        velocity: 1,
      }));

      new Tone.Part((time, value) => {
        // the value is an object which contains both the note and the velocity
        xylophoneSample.triggerAttackRelease(value.note, '4n', time, value.velocity);
        if (value.idx === eachNote.length - 1) {
          dispatch(new DispatchAction('STOP_SONG'));
        }
      }, noteObjs).start(0);

      Tone.Transport.start();

      return () => {
        Tone.Transport.cancel();
      };
    }

    else if (notes && synth) {
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
    return () => { };
  }, [notes, synth, guitarSample, drumsetSample, xylophoneSample, kalimbaSample, dispatch, instrument.name]);


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
          drumsetSample={drumsetSample}
          xylophoneSample={xylophoneSample}
          kalimbaSample={kalimbaSample}
        />
      </div>
    </div>
  );
};
