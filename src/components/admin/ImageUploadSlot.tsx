"use client";

import { useState } from "react";

interface ImageUploadSlotProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUploadSlot({ label, value, onChange }: ImageUploadSlotProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-lg border border-border p-3 space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {value ? (
        <div className="relative group">
          <img src={value} alt={label} className="w-full h-24 object-cover rounded" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            &times;
          </button>
        </div>
      ) : (
        <label className={`flex items-center justify-center h-24 rounded border-2 border-dashed border-border cursor-pointer hover:border-primary/40 transition-colors ${uploading ? "opacity-50 pointer-events-none" : ""}`}>
          <span className="text-xs text-muted-foreground">
            {uploading ? "Uploading..." : "Click to upload"}
          </span>
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      )}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste URL"
        className="w-full rounded border border-border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary/20"
      />
    </div>
  );
}
