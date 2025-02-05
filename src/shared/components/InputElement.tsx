import React from "react";
import { IInputProps } from "../types/InputTypes";

export const InputElement = React.forwardRef<HTMLInputElement, IInputProps>(
  (props, ref) => {
    return (
      <>
        <div>
          {props.withLabel && (
            <label className="sr-only">
              <span>{props.label}</span>
            </label>
          )}
          <input
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            ref={ref}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </div>
      </>
    );
  }
);
