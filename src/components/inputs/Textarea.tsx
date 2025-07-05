import { forwardRef, type TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  className?: string;
  resize?: "none" | "both" | "horizontal" | "vertical";
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", resize = "vertical", ...props }, ref) => {
    const resizeClasses = {
      none: "resize-none",
      both: "resize",
      horizontal: "resize-x",
      vertical: "resize-y",
    };

    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            className={`
              w-full px-4 py-2.5 rounded-lg border
              focus:ring-2 focus:ring-opacity-50 focus:outline-none
              transition-all duration-200
              ${resizeClasses[resize]}
              ${
                error
                  ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
              }
              disabled:bg-gray-100 disabled:cursor-not-allowed
              placeholder-gray-400
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;