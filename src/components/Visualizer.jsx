import React, { useEffect, useRef } from "react";

import useSize from "./useSize";

function drawWaveform(analyser, canvas, canvasCtx, dataArray, bufferLength) {
  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  canvasCtx.lineWidth = 5;
  const gradient = canvasCtx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "#ff00ff");
  gradient.addColorStop(0.5, "#00ffff");
  gradient.addColorStop(1, "#ff00ff");
  canvasCtx.strokeStyle = gradient;

  const sliceWidth = canvas.width / bufferLength;
  let x = 0;

  canvasCtx.beginPath();

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = (v * canvas.height) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.stroke();
}

const Visualizer = ({ analyzerData }) => {
  const { dataArray, analyzer, bufferLength } = analyzerData;

  const [width, height] = useSize();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  const draw = (dataArray, analyzer, bufferLength) => {
    const canvas = canvasRef.current;
    if (!canvas || !analyzer) return;
    const canvasCtx = canvas.getContext("2d");

    drawWaveform(analyzer, canvas, canvasCtx, dataArray, bufferLength);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      draw(dataArray, analyzer, bufferLength);
    };

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [dataArray, analyzer, bufferLength]);

  return (
    <canvas className="canvas" ref={canvasRef} width={width} height={height} />
  );
};

export default Visualizer;
