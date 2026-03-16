import { useRef, useState, useEffect, useMemo } from 'react';

/**
 * Minimals-style file upload: dashed drop zone, drag-and-drop, click to browse.
 * Single: shows image preview with X button (top-right) or file name + Remove.
 * Multiple: shows "Drop or select files", then row of thumbnails with X each + "Remove all".
 * @param {string} [accept] - e.g. "image/*", "video/*"
 * @param {boolean} [multiple] - Allow multiple files
 * @param {File|null} [file] - Controlled selected file (single mode)
 * @param {File[]} [files] - Controlled selected files (multiple mode)
 * @param {function(File|null)} [onFileChange] - Single mode
 * @param {function(File[])} [onFilesChange] - Multiple mode
 * @param {string} [label] - Optional label above the zone
 * @param {string} [className] - Wrapper class
 * @param {string} [existingUrl] - When editing: URL of existing file to show (image or video)
 * @param {boolean} [required] - If true, shows * after label (like Input)
 * @param {string} [error] - Error message to display under the control
 */
export default function Upload({
  accept,
  multiple = false,
  file,
  files = [],
  onFileChange,
  onFilesChange,
  label,
  className = '',
  existingUrl,
  required = false,
  error,
}) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [existingVideoLoadError, setExistingVideoLoadError] = useState(false);

  // console.log('onFileChange :', onFileChange);
  // console.log('onFilesChange :', onFilesChange);
  // console.log('files :', files);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const dropped = e.dataTransfer?.files;
    if (!dropped?.length) return;
    if (multiple) {
      const next = [...(files || []), ...Array.from(dropped)];
      onFilesChange?.(next);
    } else {
      onFileChange?.(dropped[0]);
    }
  };

  const handleChange = (e) => {
    const selected = e.target.files;
    if (!selected?.length) return;
    const fileToPass = selected[0];
    const filesToPass = Array.from(selected);
    e.target.value = '';
    if (multiple) {
      onFilesChange?.([...(files || []), ...filesToPass]);
    } else {
      onFileChange?.(fileToPass);
    }
  };

  const handleClick = () => inputRef.current?.click();

  const clearFile = (e) => {
    e.stopPropagation();
    onFileChange?.(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const removeOne = (e, index) => {
    e.stopPropagation();
    const next = files.filter((_, i) => i !== index);
    onFilesChange?.(next);
  };

  const removeAll = (e) => {
    e.stopPropagation();
    onFilesChange?.([]);
    if (inputRef.current) inputRef.current.value = '';
  };

  const isSingle = !multiple;
  const singleFile = isSingle ? file : null;
  const fileList = isSingle ? (singleFile ? [singleFile] : []) : (files || []);
  const hasFiles = isSingle ? !!singleFile : fileList.length > 0;
  const isImageFile = (f) => f?.type?.startsWith('image/') || (accept && accept.includes('image'));

  const hasError = !!(error && String(error).trim());

  const showSingleImagePreview = isSingle && singleFile && isImageFile(singleFile);
  const existingUrlTrimmed = typeof existingUrl === 'string' ? existingUrl.trim() : '';
  const hasValidExistingUrl = isSingle && !singleFile && existingUrlTrimmed.length > 0;
  const isExistingVideo = hasValidExistingUrl && accept?.includes('video');
  const hasExistingUrl = hasValidExistingUrl && (!isExistingVideo || !existingVideoLoadError);

  // Reset video load error when existingUrl changes
  useEffect(() => {
    setExistingVideoLoadError(false);
  }, [existingUrlTrimmed]);
  const showBigDropZone = !(multiple && fileList.length > 0) && !showSingleImagePreview && !hasExistingUrl;

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        tabIndex={-1}
        onChange={handleChange}
        className="absolute h-px w-px -m-px overflow-hidden whitespace-nowrap border-0 p-0 opacity-0 [clip-path:inset(50%)]"
        aria-hidden
      />

      {label && (
        <label className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-gray-400">
          {label}
          {required && <span className="text-error ml-0.5" aria-hidden="true">*</span>}
        </label>
      )}

      {/* Single mode: after image selected, show preview with X (like reference) */}
      {showSingleImagePreview ? (
        <div className="relative inline-block rounded-xl overflow-hidden border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-800/50 shadow-sm">
          <SingleImagePreview key={singleFile.name + singleFile.size} file={singleFile} />
          <button
            type="button"
            onClick={clearFile}
            aria-label="Remove"
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            <span className="icon-[mdi--close] text-lg" aria-hidden />
          </button>
        </div>
      ) : hasExistingUrl ? (
        <div className="space-y-3">
          <p className="text-xs font-medium text-slate-500 dark:text-gray-400">Current file</p>
          {accept && accept.includes('image') ? (
            <div className="relative inline-block rounded-xl overflow-hidden border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-800/50 shadow-sm">
              <img src={existingUrlTrimmed} alt="Current" className="h-48 w-auto max-w-full object-contain block" />
            </div>
          ) : accept && accept.includes('video') ? (
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-800/50 shadow-sm">
              <video
                src={existingUrlTrimmed}
                controls
                className="w-full max-h-48"
                onError={() => setExistingVideoLoadError(true)}
              />
              <a href={existingUrlTrimmed} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-primary hover:underline dark:text-secondary">
                Open in new tab
              </a>
            </div>
          ) : (
            <a href={existingUrlTrimmed} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline dark:text-secondary">
              {existingUrlTrimmed.replace(/^.*[/\\]/, '')}
            </a>
          )}
          <div
            role="presentation"
            tabIndex={0}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
            className={`flex min-h-[80px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-slate-50/80 dark:bg-gray-800/50 transition-colors py-4 px-4 ${
              hasError
                ? 'border-error dark:border-error'
                : 'border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500'
            }`}
          >
            <p className="text-xs text-slate-500 dark:text-gray-400">
              Drop or select a file to replace
            </p>
          </div>
        </div>
      ) : (
        <>
          {showBigDropZone && (
            <div
              role="presentation"
              tabIndex={0}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={handleClick}
              className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-slate-50/80 dark:bg-gray-800/50 transition-colors ${
                dragActive
                  ? 'border-primary bg-primary/5 dark:border-secondary dark:bg-secondary/10'
                  : hasError
                    ? 'border-error dark:border-error'
                    : 'border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500'
              } ${hasFiles && isSingle ? 'py-4' : 'py-8 px-6'}`}
            >
              {hasFiles && isSingle && !isImageFile(singleFile) ? (
                <div className="flex flex-col items-center gap-2 text-center" onClick={handleClick}>
                  <span className="text-sm font-medium text-slate-700 dark:text-gray-200">{singleFile.name}</span>
                  <span className="text-xs text-slate-500 dark:text-gray-400">
                    {(singleFile.size / 1024).toFixed(1)} KB
                  </span>
                  <button
                    type="button"
                    onClick={clearFile}
                    className="text-sm font-medium text-primary hover:underline dark:text-secondary"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <UploadIcon className="mb-4 h-24 w-auto text-slate-400 dark:text-gray-500" />
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-700 dark:text-gray-200">
                      {multiple ? 'Drop or select files' : 'Drop or select a file'}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">
                      Drag {multiple ? 'files' : 'a file'} here, or{' '}
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => { e.stopPropagation(); handleClick(); }}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); } }}
                        className="font-medium text-primary hover:underline dark:text-secondary"
                      >
                        browse
                      </span>
                      {' '}your device.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Multiple: thumbnails row + Remove all + small add-more zone */}
          {multiple && fileList.length > 0 && (
            <>
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium text-slate-500 dark:text-gray-400">
                  {fileList.length} image{fileList.length !== 1 ? 's' : ''} selected · Click × on a thumbnail to remove one
                </p>
                <div className="flex flex-wrap gap-4">
                  {fileList.map((f, index) => (
                    <div key={`${f.name}-${f.size}-${index}`} className="relative group">
                      {isImageFile(f) ? (
                        <div className="relative h-24 w-24 rounded-xl overflow-hidden border-2 border-slate-200 dark:border-gray-600 bg-slate-100 dark:bg-gray-700 shrink-0 shadow-sm">
                          <ThumbnailImage file={f} className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => removeOne(e, index)}
                            aria-label={`Remove image ${index + 1}`}
                            title="Remove this image"
                            className="absolute top-1 right-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 hover:scale-110 transition-all shadow-md"
                          >
                            <span className="icon-[mdi--close] text-sm" aria-hidden />
                          </button>
                        </div>
                      ) : (
                        <div className="relative h-24 w-24 rounded-xl border-2 border-slate-200 dark:border-gray-600 bg-slate-100 dark:bg-gray-700 flex items-center justify-center shrink-0">
                          <span className="icon-[mdi--file] text-2xl text-slate-500 dark:text-gray-400" aria-hidden />
                          <button
                            type="button"
                            onClick={(e) => removeOne(e, index)}
                            aria-label={`Remove file ${index + 1}`}
                            title="Remove this file"
                            className="absolute top-1 right-1 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 hover:scale-110 transition-all shadow-md"
                          >
                            <span className="icon-[mdi--close] text-sm" aria-hidden />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={removeAll}
                  className="mt-3 text-sm font-medium text-slate-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
                >
                  Remove all
                </button>
              </div>
              <div
                role="presentation"
                tabIndex={0}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleClick}
                className={`mt-3 flex min-h-[100px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-slate-50/80 dark:bg-gray-800/50 transition-colors py-6 px-4 ${
                  hasError
                    ? 'border-error dark:border-error'
                    : 'border-slate-200 dark:border-gray-600 hover:border-slate-300 dark:hover:border-gray-500'
                }`}
              >
                <p className="text-xs text-slate-500 dark:text-gray-400">
                  Drop or select files, or <span className="font-medium text-primary dark:text-secondary">browse</span> to add more.
                </p>
              </div>
            </>
          )}
        </>
      )}

      {hasError && (
        <p className="mt-1 text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function SingleImagePreview({ file }) {
  const [error, setError] = useState(false);
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    setError(false);
  }, [file]);

  useEffect(() => {
    const u = url;
    return () => {
      if (u) setTimeout(() => URL.revokeObjectURL(u), 100);
    };
  }, [url]);

  if (!url) {
    return (
      <div className="flex h-48 min-w-[200px] items-center justify-center bg-slate-200 dark:bg-gray-700 text-slate-500 dark:text-gray-400 text-sm">
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-48 min-w-[200px] items-center justify-center bg-slate-200 dark:bg-gray-700 text-slate-500 dark:text-gray-400 text-sm">
        Preview unavailable
      </div>
    );
  }
  return (
    <img
      src={url}
      alt="Preview"
      className="h-48 w-auto max-w-full object-contain block"
      decoding="async"
      onError={() => setError(true)}
    />
  );
}

function ThumbnailImage({ file, className = '' }) {
  const url = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);
  useEffect(() => {
    const u = url;
    return () => {
      if (u) setTimeout(() => URL.revokeObjectURL(u), 100);
    };
  }, [url]);
  if (!url) return <div className={className + ' bg-slate-200 dark:bg-gray-700 animate-pulse'} />;
  return <img src={url} alt="" className={className} decoding="async" />;
}

function UploadIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        fill="currentColor"
        fillOpacity="0.24"
        fillRule="nonzero"
        d="M232.679 225.726l-20.294 7.851-29.661 11.466c-1.121-2.093-2.771-4.921-4.813-8.297-7.026-11.642-18.65-29.75-29.001-45.665-11.66-17.938-21.696-33.075-21.696-33.075l7.265-2.093 59.346-17.23 38.854 87.043z"
      />
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M247.777 220.841s-31.526 18.65-78.596 14.432l-37.525-91.486 17.984-3.091 62.168-10.677 35.279 89.043.69 1.779z"
      />
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M269.277 168.76l-45.767.493a3.127 3.127 0 00-3.094 3.125v3.782a3.127 3.127 0 01-3.05 3.124l-33.024.792a3.124 3.124 0 01-3.095-2.308l-1.551-5.701a3.124 3.124 0 00-3.053-2.308l-44.113.475a3.125 3.125 0 00-3.05 3.648l17.747 104.449a3.129 3.129 0 003.071 2.604l139.363.598a3.129 3.129 0 003.082-3.714l-20.366-106.521a3.125 3.125 0 00-3.1-2.538z"
      />
      <circle cx="206.029" cy="224.351" r="14.44" fill="currentColor" fillOpacity="0.48" />
      <path
        fill="currentColor"
        fillRule="nonzero"
        d="M200.058 225.406l-.699-.681a.721.721 0 010-1.065l6.127-5.984a.753.753 0 01.546-.231c.206 0 .404.083.545.231l6.127 5.978a.733.733 0 010 1.065l-.699.682a.768.768 0 01-1.091 0l-3.622-3.727v8.843a.725.725 0 01-.219.523.76.76 0 01-.534.217h-1.009a.75.75 0 01-.759-.74v-8.832l-3.622 3.726a.768.768 0 01-1.091-.005z"
      />
    </svg>
  );
}
