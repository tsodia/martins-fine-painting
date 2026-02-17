"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface PhotoUploadProps {
  idPrefix: string;
  variant: "light" | "dark";
  compact?: boolean;
  onFilesChange: (files: File[]) => void;
}

const ACCEPTED_TYPES = ".jpg,.jpeg,.png,.webp,.heic,.heif";
const MAX_FILES = 3;
const MAX_FILE_SIZE_BYTES = 1024 * 1024; // 1MB

export default function PhotoUpload({
  idPrefix,
  variant,
  compact = false,
  onFilesChange,
}: PhotoUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const isLight = variant === "light";

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      previews.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      setError("");

      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      for (const file of Array.from(incoming)) {
        if (files.length + newFiles.length >= MAX_FILES) {
          setError(`You can upload up to ${MAX_FILES} photos.`);
          break;
        }

        if (file.size > MAX_FILE_SIZE_BYTES) {
          setError(`"${file.name}" exceeds 1MB and was not added.`);
          continue;
        }

        newFiles.push(file);

        if (
          file.type.startsWith("image/") &&
          !file.type.includes("heic") &&
          !file.type.includes("heif")
        ) {
          newPreviews.push(URL.createObjectURL(file));
        } else {
          newPreviews.push("");
        }
      }

      if (newFiles.length === 0) return;

      const updatedFiles = [...files, ...newFiles];
      const updatedPreviews = [...previews, ...newPreviews];
      setFiles(updatedFiles);
      setPreviews(updatedPreviews);
      onFilesChange(updatedFiles);

      if (inputRef.current) inputRef.current.value = "";
    },
    [files, previews, onFilesChange]
  );

  const removeFile = useCallback(
    (index: number) => {
      if (previews[index]) URL.revokeObjectURL(previews[index]);

      const updatedFiles = files.filter((_, i) => i !== index);
      const updatedPreviews = previews.filter((_, i) => i !== index);
      setFiles(updatedFiles);
      setPreviews(updatedPreviews);
      onFilesChange(updatedFiles);
    },
    [files, previews, onFilesChange]
  );

  return (
    <div>
      <label
        className={`block text-sm font-medium mb-1.5 ${
          isLight ? "text-gray-700" : "text-white/70"
        }`}
      >
        Project Photos{" "}
        <span className={isLight ? "text-gray-400" : "text-white/40"}>
          (optional, up to 3)
        </span>
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          if (files.length < MAX_FILES)
            e.currentTarget.classList.add("border-gold");
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove("border-gold");
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("border-gold");
          if (files.length < MAX_FILES) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => files.length < MAX_FILES && inputRef.current?.click()}
        className={`
          relative rounded-lg border-2 border-dashed transition-colors cursor-pointer
          ${compact ? "p-4" : "p-6"}
          ${
            isLight
              ? "border-gray-300 hover:border-gold bg-gray-50/50"
              : "border-white/20 hover:border-gold bg-white/5"
          }
          ${files.length >= MAX_FILES ? "opacity-60 cursor-not-allowed" : ""}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          id={`${idPrefix}-photos`}
          accept={ACCEPTED_TYPES}
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {files.length === 0 ? (
          <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 mx-auto mb-2 text-gold"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <p
              className={`text-sm ${
                isLight ? "text-gray-500" : "text-white/50"
              }`}
            >
              <span className="text-gold font-medium">Click to upload</span> or
              drag photos here
            </p>
            <p
              className={`text-xs mt-1 ${
                isLight ? "text-gray-400" : "text-white/30"
              }`}
            >
              JPG, PNG, or WebP &middot; Up to 1MB each
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {files.map((file, i) => (
              <div
                key={`${file.name}-${i}`}
                className="relative group aspect-square rounded-lg overflow-hidden bg-gray-200"
              >
                {previews[i] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previews[i]}
                    alt={`Upload preview ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-xs text-gray-400 uppercase">
                      {file.name.split(".").pop()}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                  aria-label={`Remove ${file.name}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="w-3 h-3"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
            {files.length < MAX_FILES && (
              <div
                className={`aspect-square rounded-lg border-2 border-dashed flex items-center justify-center ${
                  isLight ? "border-gray-300" : "border-white/20"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="w-6 h-6 text-gold"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <p
          className={`text-sm mt-1.5 ${
            isLight ? "text-red-600" : "text-red-400"
          }`}
        >
          {error}
        </p>
      )}
    </div>
  );
}
