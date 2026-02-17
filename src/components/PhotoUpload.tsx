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
const MAX_INPUT_SIZE_BYTES = 10 * 1024 * 1024; // 10MB input (before compression)
const MAX_DIMENSION = 2048;
const JPEG_QUALITY = 0.85;

function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    // HEIC/HEIF can't be decoded by canvas in most browsers — pass through
    if (file.type.includes("heic") || file.type.includes("heif")) {
      resolve(file);
      return;
    }

    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      let { width, height } = img;

      // Only resize if larger than max dimension
      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file); // fallback to original
            return;
          }
          const compressed = new File([blob], file.name.replace(/\.\w+$/, ".jpg"), {
            type: "image/jpeg",
          });
          resolve(compressed);
        },
        "image/jpeg",
        JPEG_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file); // fallback to original
    };

    img.src = url;
  });
}

export default function PhotoUpload({
  idPrefix,
  variant,
  compact = false,
  onFilesChange,
}: PhotoUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
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
    async (incoming: FileList | null) => {
      if (!incoming) return;
      setError("");
      setProcessing(true);

      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      for (const file of Array.from(incoming)) {
        if (files.length + newFiles.length >= MAX_FILES) {
          setError(`You can upload up to ${MAX_FILES} photos.`);
          break;
        }

        if (file.size > MAX_INPUT_SIZE_BYTES) {
          setError(`"${file.name}" exceeds 10MB and was not added.`);
          continue;
        }

        const compressed = await compressImage(file);
        newFiles.push(compressed);

        if (
          compressed.type.startsWith("image/") &&
          !compressed.type.includes("heic") &&
          !compressed.type.includes("heif")
        ) {
          newPreviews.push(URL.createObjectURL(compressed));
        } else {
          newPreviews.push("");
        }
      }

      setProcessing(false);

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
        onClick={() =>
          !processing && files.length < MAX_FILES && inputRef.current?.click()
        }
        className={`
          relative rounded-lg border-2 border-dashed transition-colors cursor-pointer
          ${compact ? "p-4" : "p-6"}
          ${
            isLight
              ? "border-gray-300 hover:border-gold bg-gray-50/50"
              : "border-white/20 hover:border-gold bg-white/5"
          }
          ${files.length >= MAX_FILES || processing ? "opacity-60 cursor-not-allowed" : ""}
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

        {processing ? (
          <div className="text-center">
            <div
              className="w-8 h-8 mx-auto mb-2 border-2 border-gold border-t-transparent rounded-full animate-spin"
            />
            <p
              className={`text-sm ${
                isLight ? "text-gray-500" : "text-white/50"
              }`}
            >
              Optimizing photos...
            </p>
          </div>
        ) : files.length === 0 ? (
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
              JPG, PNG, WebP, or HEIC &middot; Photos are auto-optimized
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
