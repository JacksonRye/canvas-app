import { Download, PenTool, Loader } from 'lucide-react';

interface ResultsScreenProps {
  imageUrl: string;
  onNewSketch: () => void;
  onDownload: () => void;
  isLoading?: boolean;
}

export default function ResultsScreen({
  imageUrl,
  onNewSketch,
  onDownload,
  isLoading = false,
}: ResultsScreenProps) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full">
      <h1 className="text-center text-slate-700 text-lg mb-8">
        Draw your imagination and watch AI bring it to life
      </h1>

      <div className="bg-slate-50 rounded-2xl p-8 mb-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center gap-4">
              <Loader size={40} className="text-blue-500 animate-spin" />
              <p className="text-slate-600 font-medium">Generating your image...</p>
            </div>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt="Generated"
            className="border border-slate-200 rounded-lg w-full"
          />
        )}
      </div>

      {!isLoading && (
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl"
          >
            <Download size={20} />
            Download
          </button>

          <button
            onClick={onNewSketch}
            className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg shadow-lg transition-all hover:shadow-xl"
          >
            <PenTool size={20} />
            New Sketch
          </button>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="font-semibold text-slate-900">Made in Bolt</span>
        </div>
      </div>
    </div>
  );
}
