import React from "react";
import { IInputProps } from "../../../shared/types/InputTypes";


export const InputElement = React.forwardRef<HTMLInputElement, IInputProps>(
  (props, ref) => {
    return (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            <span>{props.label}</span>
          </label>
          <input
            type={props.type}
            value={props.value}
            placeholder={props.placeholder}
            ref={ref}
            onChange={(e) => props.onChange(e.target.value)}
            required
            className="mt-2 p-2 w-full border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
        </div>
      </>
    );
  }
);
