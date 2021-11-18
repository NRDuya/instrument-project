// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
//import { WaveformVisualizer } from './visualizers/ahuang9-3';
import { WaveformVisualizer } from './visualizers/Waveform';
import { GuitarInstrument } from './instruments/Switch24-7-1';
import { ColorSplashVisualizer } from './visualizers/Switch24-7-1';
import { NRDuya } from './visualizers/NRDuya-2'; 
import { XylophoneInstrument } from './instruments/NRDuya-2';
import { PianoInstrument2 } from './instruments/AnthonyJHizon-4';
import { AnthonyVisualizer } from './visualizers/AnthonyJHizon-4';

/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */

/**
 * Observation: pure map (compare and contrast with impure map)
 *
 * 'instrument': Instrument
 * 'visualizer': Visualizer
 */
export type AppState = Map<string, any>;

const instruments = List([PianoInstrument, PianoInstrument2, GuitarInstrument, XylophoneInstrument]);
const visualizers = List([WaveformVisualizer, AnthonyVisualizer, ColorSplashVisualizer, NRDuya]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
