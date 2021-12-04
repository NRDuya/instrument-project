// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { TwoDimensionalVisualizer } from './visualizers/ahuang9-3';
import { KalimbaInstrument } from './instruments/Ahuang9-3';
import { WaveformVisualizer } from './visualizers/Waveform';
import { GuitarInstrument } from './instruments/Switch24-7-1';
import { ColorSplashVisualizer } from './visualizers/Switch24-7-1';
import { NRDuya } from './visualizers/NRDuya-2';
import { DrumsetInstrument } from './instruments/AnthonyJHizon-4';
import { XylophoneInstrument } from './instruments/NRDuya-2';
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

const instruments = List([PianoInstrument, GuitarInstrument, XylophoneInstrument, DrumsetInstrument, KalimbaInstrument]);
const visualizers = List([WaveformVisualizer, AnthonyVisualizer, ColorSplashVisualizer, NRDuya, TwoDimensionalVisualizer]);
export const defaultState: AppState = Map<string, any>({
  instruments,
  visualizers,
});
