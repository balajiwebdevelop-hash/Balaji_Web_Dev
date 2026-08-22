'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2, Image as ImageIcon, Plus } from 'lucide-react';

interface ImageUploaderProps {
  bucket?: 'products' | 'projects' | 'services' | 'site-media';
  images: string[];
  onChange: (images: string[]) => void;
  multiple?: boolean;
  label?: string;
  maxFiles?: number;
}

export function ImageUploader({
  bucket = 'products',
  images = [],
  onChange,
  multiple = false,
  label = 'Upload Photos from Device',
  maxFiles = 10,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith('image/')) {
        setError(`"${file.name}" is not an image file.`);
        setUploading(false);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError(`"${file.name}" exceeds 10MB limit.`);
        setUploading(false);
        return;
      }
      validFiles.push(file);
    }

    const uploadedUrls: string[] = [];

    for (const file of validFiles) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucket', bucket);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (res.ok && data.success && data.url) {
          uploadedUrls.push(data.url);
        } else {
          setError(data.error || `Failed to upload ${file.name}`);
        }
      } catch (err: any) {
        setError(err.message || `Upload failed for ${file.name}`);
      }
    }

    if (uploadedUrls.length > 0) {
      if (multiple) {
        onChange([...images, ...uploadedUrls].slice(0, maxFiles));
      } else {
        onChange([uploadedUrls[0]]);
      }
    }

    setUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-xs uppercase tracking-wider text-champagne/90 font-medium block">
          {label}
        </label>
      )}

      {/* Drag & Drop Upload Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed transition-all p-6 text-center cursor-pointer flex flex-col items-center justify-center gap-2 rounded-sm ${
          dragActive
            ? 'border-champagne bg-champagne/10'
            : 'border-[#332821] hover:border-champagne/60 bg-[#16110E] hover:bg-[#1A1411]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
          multiple={multiple}
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <Loader2 className="w-7 h-7 text-champagne animate-spin" />
            <span className="text-xs text-champagne font-medium">
              Uploading high-resolution image to storage...
            </span>
          </div>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-[#201814] border border-[#3A2E25] flex items-center justify-center text-champagne shadow-xs">
              <Upload className="w-5 h-5 stroke-[1.5]" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-[#FCFAF6]">
                Click to browse device or drag and drop photos here
              </p>
              <p className="text-[10px] text-[#A89F91]">
                Supports JPG, PNG, WebP, AVIF up to 10MB each
              </p>
            </div>
          </>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-300 bg-red-950/40 p-2.5 border border-red-800/50 rounded-xs">{error}</p>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="relative aspect-square bg-[#16110E] border border-[#332821] overflow-hidden group rounded-xs shadow-xs"
            >
              <Image src={url} alt={`Upload preview ${idx + 1}`} fill className="object-cover" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage(idx);
                }}
                className="absolute top-1 right-1 bg-black/80 text-white p-1 rounded-full opacity-80 hover:opacity-100 hover:bg-red-700 transition-all shadow-xs"
                title="Remove photo"
              >
                <X className="w-3 h-3" />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-1 left-1 bg-black/80 text-champagne text-[8px] uppercase tracking-wider px-1.5 py-0.5 font-mono border border-champagne/30 rounded-2xs">
                  Primary
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
