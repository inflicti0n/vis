

export default class AudioHandler{

    
    //public audioContext : AudioContext;

    //public analyser : AnalyserNode;

    public audio = new Audio('LK - Oolong.mp3');

    public audioCanvas : HTMLCanvasElement;

    

    //public isAudioPlaying : boolean ;

    constructor(audioCanvas: HTMLCanvasElement){

        this.audioCanvas=audioCanvas;

        var canvasCtx = audioCanvas.getContext("2d");
        //var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
        //var audio = new Audio('LK - Oolong.mp3');
        //audio.play;
        //var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
        
        var audioCtx = new (AudioContext)();
        var analyser = audioCtx.createAnalyser();

        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        var source = audioCtx.createMediaElementSource(this.audio);

        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        this.audio.play();

        var width = 300;
        var height = 150;

        canvasCtx.clearRect(0, 0, width, height);

        function draw() {

            var drawVisual = requestAnimationFrame(draw);
            analyser.getByteTimeDomainData(dataArray);
            canvasCtx.fillStyle = 'rgb(200, 200, 200)';
            canvasCtx.fillRect(0, 0, width, height);
            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
            canvasCtx.beginPath();

            var sliceWidth = width * 1.0 / bufferLength;
            var x = 0;

            for(var i = 0; i < bufferLength; i++) {

                var v = dataArray[i] / 128.0;
                var y = v * height/2;
        
                if(i === 0) {
                  canvasCtx.moveTo(x, y);
                } else {
                  canvasCtx.lineTo(x, y);
                }
        
                x += sliceWidth;
            }
              canvasCtx.lineTo(audioCanvas.width, audioCanvas.height/2);
              canvasCtx.stroke();
        }

        draw();
		
    }

    public play() : void{

        //if(!this.isAudioPlaying){
            this.audio.play();

            //this.isAudioPlaying=true;
        //}
        //else{
        //    return;
        //}
        
    }   
    public pause() : void{

        this.audio.pause();
        
    }

    
}