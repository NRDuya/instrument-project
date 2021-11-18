// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';
import { NRDuya } from './visualizers/NRDuya-2'; 
import { XylophoneInstrument } from './instruments/NRDuya-2';

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

const instruments = List([PianoInstrument, XylophoneInstrument]);
const visualizers = List([WaveformVisualizer, NRDuya]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
