// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

type NoteVisual = {
    x: number,
    y: number,
    color: P5.Color,
    diameter: number,
    decay: number
};

let noteVisuals: NoteVisual[] = [];

export const ColorSplashVisualizer = new Visualizer(
    'ColorSplash',
    (p5: P5, analyzer: Tone.Analyser) => {
        let noiseIsPlaying = false;
        const values = analyzer.getValue();
        for (let i = 0; i < values.length; i++) {
            if (values[i] !== 0) {
                noiseIsPlaying = true;
                break;
            }
        }

        p5.angleMode(p5.DEGREES);
        p5.background(0, 0, 0, 255);

        if (noiseIsPlaying && values.length >= 256) {
            const colors: P5.Color[] = [
                p5.color(255, 0, 0, 255),   //red
                p5.color(255, 106, 5, 255), //orange
                p5.color(255, 230, 0, 255), //yellow
                p5.color(0, 255, 0, 255),   //green
                p5.color(0, 0, 255, 255),   //blue
                p5.color(149, 0, 255, 255)  //purple
            ];
            const width = window.innerWidth;
            const height = window.innerHeight / 2;
            const x = Math.floor(Math.random() * width);
            const y = Math.floor(Math.random() * height);
            const c = colors[Math.floor(Math.random() * colors.length)];
            const analyzerValues: number[] = [];
            let maxAmplitude: number = 0;

            values.forEach((value) => {
                if (typeof value === 'number') {
                    analyzerValues.push(value);
                    if (value > maxAmplitude) {
                        maxAmplitude = value;
                    }
                }
            })

            const radius = (maxAmplitude * 1000) / 2;

            p5.fill(c);
            p5.beginShape();
            for (let angle = 0; angle <= 360; angle++) {
                const valuesIndex = Math.floor(angle * values.length / 360);
                let amplitude = values[valuesIndex] as number;
                let amp = p5.map(amplitude, -1, 1, -50, 50);

                let myX = ((radius + amp) * p5.cos(angle)) + x;
                let myY = ((radius + amp) * p5.sin(angle)) + y;
                p5.vertex(myX, myY);
            }
            p5.endShape();

            noteVisuals.push({
                x: x,
                y: y,
                color: c,
                diameter: maxAmplitude * 1000,
                decay: maxAmplitude
            });
        }

        const newNoteVisuals: NoteVisual[] = [];
        noteVisuals.forEach((noteVisual) => {
            noteVisual.diameter -= noteVisual.decay;
            noteVisual.decay += 0.1;
            if (noteVisual.diameter > 0) {
                const radius = noteVisual.diameter / 2;

                p5.stroke(p5.color(255, 255, 255, 255));
                p5.strokeWeight(4);
                p5.fill(noteVisual.color);
                p5.beginShape();
                for (let angle = 0; angle <= 360; angle++) {
                    const valuesIndex = Math.floor(angle * values.length / 360);
                    let amplitude = values[valuesIndex] as number;
                    let amp = p5.map(amplitude, -1, 1, -50, 50);

                    let myX = ((radius + amp) * p5.cos(angle)) + noteVisual.x;
                    let myY = ((radius + amp) * p5.sin(angle)) + noteVisual.y;
                    p5.vertex(myX, myY);
                }
                p5.endShape();

                newNoteVisuals.push(noteVisual);
            }
        });
        noteVisuals = newNoteVisuals;
    },
);