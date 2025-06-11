import Typography from "@/components/ui/Typography";
import React from "react";

interface CustomTestInputProps {
  form: React.ReactNode;
  result?: string | null;
}

export default function CustomTestInput(props: CustomTestInputProps) {
  return (
    <div className="mt-8 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-lg p-6">
      <Typography
        variant="h3"
        className="text-xl font-medium text-slate-100 mb-6"
      >
        Test with your own input:
      </Typography>
      {props.form}
      {props.result !== null && props.result !== undefined && (
        <div className="mt-6 p-4 bg-gradient-to-br from-slate-700/30 to-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-600/50">
          <div className="flex items-center gap-3">
            <Typography className="text-lg font-medium text-slate-200">
              Result: {props.result}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}
