import { useState, useRef, useEffect } from 'react';
import DrawingCanvas from './components/DrawingCanvas';
import ResultsScreen from './components/ResultsScreen';

type Tool = 'pen' | 'eraser';
type Screen = 'draw' | 'results';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screen, setScreen] = useState<Screen>('draw');
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pen');
  const [brushSize, setBrushSize] = useState(3);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'pen' ? 'black' : 'white';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleGenerate = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    setIsLoading(true);
    setScreen('results');
  
    try {
      // Convert canvas to binary Blob
      const blob = await fetch(canvas.toDataURL('image/png')).then(res => res.blob());
  
      // Create form-data with binary file
      const form = new FormData();
      form.append('data', blob, 'sketch.png');
  
      // Send binary file to webhook
      const response = await fetch(
        'https://blythe-unfallowed-felicia.ngrok-free.dev/webhook-test/8011cfe3-1569-4254-a3e2-4932fb06ca29',
        {
          method: 'POST',
          body: form, // no headers — FormData handles it
        }
      );
  
      if (!response.ok) throw new Error('Failed to generate image');
  
      const data = await response.json();
      setGeneratedImage(data.image || data.url);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating image:', error);
      setIsLoading(false);
      alert('Failed to generate image. Please try again.');
      setScreen('draw');
    }
  };

  const handleNewSketch = () => {
    setScreen('draw');
    setGeneratedImage(null);
    clearCanvas();
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'generated-image.png';
    link.click();
  };

  if (screen === 'results') {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center p-8">
        <ResultsScreen
          imageUrl={generatedImage || ''}
          onNewSketch={handleNewSketch}
          onDownload={handleDownload}
          isLoading={isLoading}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center p-8">
      <DrawingCanvas
        canvasRef={canvasRef}
        tool={tool}
        brushSize={brushSize}
        isDrawing={isDrawing}
        onToolChange={setTool}
        onBrushSizeChange={setBrushSize}
        onClear={clearCanvas}
        onGenerate={handleGenerate}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
}

export default App;
