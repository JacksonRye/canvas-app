import { Pen, Eraser, Trash2 } from 'lucide-react';

type Tool = 'pen' | 'eraser';

interface DrawingCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  tool: Tool;
  brushSize: number;
  isDrawing: boolean;
  onToolChange: (tool: Tool) => void;
  onBrushSizeChange: (size: number) => void;
  onClear: () => void;
  onGenerate: () => void;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

export default function DrawingCanvas({
  canvasRef,
  tool,
  brushSize,
  onToolChange,
  onBrushSizeChange,
  onClear,
  onGenerate,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
}: DrawingCanvasProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full">
      <h1 className="text-center text-slate-700 text-lg mb-8">
        Draw your imagination and watch AI bring it to life
      </h1>

      <div className="bg-slate-50 rounded-2xl p-8 mb-6">
        <canvas
          ref={canvasRef}
          width={600}
          height={500}
          className="border border-slate-200 rounded-lg bg-white cursor-crosshair w-full"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onToolChange('pen')}
            className={`p-3 rounded-lg transition-all ${
              tool === 'pen'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
            title="Pen"
          >
            <Pen size={20} />
          </button>

          <button
            onClick={() => onToolChange('eraser')}
            className={`p-3 rounded-lg transition-all ${
              tool === 'eraser'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
            title="Eraser"
          >
            <Eraser size={20} />
          </button>

          <button
            onClick={onClear}
            className="p-3 rounded-lg bg-slate-200 text-slate-600 hover:bg-slate-300 transition-all"
            title="Clear"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 flex-1 max-w-xs">
          <span className="text-slate-600 text-sm font-medium">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={brushSize}
            onChange={(e) => onBrushSizeChange(Number(e.target.value))}
            className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-slate-600 text-sm font-medium w-6 text-right">
            {brushSize}
          </span>
        </div>

        <button
          onClick={onGenerate}
          className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl"
        >
          Generate Image
        </button>
      </div>

      <div className="mt-6 flex justify-end">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="font-semibold text-slate-900">Made in Bolt</span>
        </div>
      </div>
    </div>
  );
}
