// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List } from 'immutable';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';
import '../css/guitar.css';

function GuitarType({ title, onClick, active }: any): JSX.Element {
    return (
        <div
            onClick={onClick}
            className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
                'b--black black': active,
                'gray b--light-gray': !active,
            })}
        >
            {title}
        </div>
    );
}

function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
    const frets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const openFretNotes = List([
        { note: 'E', octave: '4' },
        { note: 'B', octave: '3' },
        { note: 'G', octave: '3' },
        { note: 'D', octave: '3' },
        { note: 'A', octave: '2' },
        { note: 'E', octave: '2' },
    ]);

    const setOscillator = (newType: Tone.ToneOscillatorType) => {
        setSynth(oldSynth => {
            oldSynth.disconnect();

            return new Tone.Synth({
                oscillator: { type: newType } as Tone.OmniOscillatorOptions
            }).toDestination();
        });
    };

    const oscillators: List<OscillatorType> = List([
        'sine',
        'sawtooth',
        'square',
        'triangle',
        'fmsine',
        'fmsawtooth',
        'fmtriangle',
        'amsine',
        'amsawtooth',
        'amtriangle',
    ]) as List<OscillatorType>;

    return (
        <div className="pv4">
            <div className="guitar-neck">
                <ul>
                    <div className="guitar-head" />
                    <div className='guitar-nut'>
                        {openFretNotes.map((fretNote) => {
                            const note = fretNote.note.concat(fretNote.octave);
                            return (
                                <span
                                    key={note}
                                    onMouseDown={(e) => synth?.triggerAttack(`${note}`)}
                                    onMouseUp={(e) => synth?.triggerRelease(`+0.25`)}
                                    className={'note open-note'}
                                >
                                    {note}
                                </span>
                            );
                        })}
                    </div>
                    {frets.map((fret, index) => {
                        const fretWidth = 7; // first fret is 7rem wide
                        const numOfOctaves = frets.length / 12;
                        const width = (24 * numOfOctaves - index) / (24 * numOfOctaves) * fretWidth;
                        const hasFretMark = checkFretMark(index + 1);
                        return (
                            <li
                                key={index}
                                className="guitar-fret"
                                style={{
                                    width: `${width}rem`
                                }}>
                                {hasFretMark ? <div className='single-fret-mark' /> : <></>}
                                {index === 11 ? <div className='double-fret-mark' ><span /><span /></div> : <></>}
                                {openFretNotes.map((fretNote) => {
                                    const note = transpose(fretNote.note, fretNote.octave, index + 1);
                                    return (
                                        <span
                                            key={note}
                                            onMouseDown={() => synth?.triggerAttack(`${note}`)}
                                            onMouseUp={() => synth?.triggerRelease(`+0.25`)}
                                            className={'note'}
                                        >
                                            {note}
                                        </span>
                                    )
                                })}
                            </li>
                        )
                    })}
                    <ul className="guitar-strings">
                        <li>
                            <span className="string first-string" />
                        </li>
                        <li>
                            <span className="string second-string" />
                        </li>
                        <li>
                            <span className="string third-string" />
                        </li>
                        <li>
                            <span className="string fourth-string" />
                        </li>
                        <li>
                            <span className="string fifth-string" />
                        </li>
                        <li>
                            <span className="string sixth-string" />
                        </li>
                    </ul>
                </ul>
            </div>
            <div className={'pl4 pt4 flex'}>
                {oscillators.map(o => (
                    <GuitarType
                        key={o}
                        title={o}
                        onClick={() => setOscillator(o)}
                        active={synth?.oscillator.type === o}
                    />
                ))}
            </div>
        </div>
    );
}

function transpose(note: string, octave: string, halfsteps: number): string {
    if (halfsteps <= 0) return note.concat(octave);
    const notes = [
        'C',
        'Db',
        'D',
        'Eb',
        'E',
        'F',
        'Gb',
        'G',
        'Ab',
        'A',
        'Bb',
        'B'
    ];
    const octaveAsNumber = Number(octave);
    let index = -1;
    let octaveIncrement = 0;

    // Check if octave parameter is valid
    if (isNaN(octaveAsNumber)) return note;

    for (let i = 0; i < notes.length; i++) {
        if (notes[i] === note) {
            index = i;
        }
    }

    // note parameter is not a valid note
    if (index < 0) return note;

    let counter = 0;
    while (counter < halfsteps) {
        index++;
        if (index >= notes.length) {
            index = 0;
            octaveIncrement++;
        }
        counter++;
    }

    return notes[index].concat((octaveAsNumber + octaveIncrement).toString());
}

function checkFretMark(fret: number): boolean {
    if (fret === 3 || fret === 5 || fret === 7 || fret === 9 || fret === 15) {
        return true;
    }
    return false;
}

export const GuitarInstrument = new Instrument('Guitar', Guitar);