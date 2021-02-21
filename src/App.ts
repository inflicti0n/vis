/*
 * App.ts
 * ===========
 * Entry from Webpack, generates Three.js View
 */

import View from "./webgl/View";
import AudioHandler from "./audio/AudioHandler";

class App {
	private view: View;

	constructor() {
		const canvasBox = <HTMLCanvasElement>document.getElementById("webgl-canvas");
		this.view = new View(canvasBox);

		window.addEventListener("resize", this.resize);
		this.update(0);


		const audioCanvas = <HTMLCanvasElement>document.getElementById("audio-canvas");

		const fftText = <HTMLParagraphElement>document.getElementById("fastFourierTransform");
		const frequencyText = <HTMLParagraphElement>document.getElementById("frequency");
		

		const playButton = document.getElementById("playButton");
		playButton.addEventListener("click", play);

		const pauseButton = document.getElementById("pauseButton");
		pauseButton.addEventListener("click", pause);

		//const audioHandler = new AudioHandler();

		//const pauseButton = document.getElementById("pauseButton");
		//pauseButton.addEventListener("click", audioHandler.pause);

		var audioHandler : AudioHandler;

		function play() {
				audioHandler = new AudioHandler(audioCanvas,fftText,frequencyText);
		}
		function pause() {

			audioHandler.pause();
		}

		
	}
	

	private resize = (): void => {
		this.view.onWindowResize(window.innerWidth, window.innerHeight);
	}

	private update = (t: number): void => {
		this.view.update(t / 1000);
		requestAnimationFrame(this.update);
	}
}

const app = new App();
