// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { GuitarInstrument } from './instruments/Switch24-7-2';
import { WaveformVisualizer } from './visualizers/Waveform';
import { ColorSplashVisualizer } from './visualizers/Switch24-7-2';

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

const instruments = List([PianoInstrument, GuitarInstrument]);
const visualizers = List([WaveformVisualizer, ColorSplashVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
