import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Loader2, CheckCircle2 } from 'lucide-react';
import { uploadImage } from '../utils/api.js';

export default function DragDropUploader({
  value,
  onChange,
  token,
  folder = 'packages',
  label = 'Upload Image',
}) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (JPEG, PNG, WebP, AVIF).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const res = await uploadImage(token, file, folder);
      if (res && res.url) {
        onChange(res.url);
      } else {
        setError('Upload failed: No URL returned');
      }
    } catch (err) {
      setError(err.message || 'File upload failed');
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setDragging(false);
  }

  return (
    <div className="w-full">
      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
        {label}
      </label>

      {value ? (
        <div className="relative group border-2 border-slate-200 rounded-lg overflow-hidden bg-slate-50">
          <img
            src={value}
            alt="Uploaded preview"
            className="w-full h-48 object-cover rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/og-image.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-navy font-bold text-xs rounded shadow hover:bg-slate-100"
            >
              Replace Image
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 bg-red-600 text-white rounded shadow hover:bg-red-700"
              title="Remove image"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-2 text-xs text-slate-500 truncate flex items-center gap-1.5 bg-white border-t border-slate-100">
            <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
            <span className="truncate">{value}</span>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragging
              ? 'border-sky bg-sky/5'
              : 'border-slate-300 hover:border-sky/60 bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-4">
              <Loader2 className="w-8 h-8 text-sky animate-spin mb-2" />
              <p className="text-sm font-semibold text-slate-700">Uploading image...</p>
              <p className="text-xs text-slate-400 mt-1">Please wait a moment</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-2">
              <div className="w-12 h-12 rounded-full bg-sky/10 text-sky-dark flex items-center justify-center mb-3">
                {dragging ? <UploadCloud size={24} /> : <ImageIcon size={24} />}
              </div>
              <p className="text-sm font-bold text-slate-800">
                Drag and drop image here, or <span className="text-sky font-extrabold underline">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, WebP, AVIF up to 5MB</p>
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-1.5 text-xs text-red-600 font-semibold">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}
