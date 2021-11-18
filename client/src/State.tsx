// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { PianoInstrument2 } from './instruments/AnthonyJHizon-1';
import { AnthonyVisualizer } from './visualizers/AnthonyJHizon-1';
import { WaveformVisualizer } from './visualizers/Waveform';

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

const instruments = List([PianoInstrument, PianoInstrument2]);
const visualizers = List([WaveformVisualizer, AnthonyVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
