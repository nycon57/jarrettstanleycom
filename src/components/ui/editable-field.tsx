"use client";

import { useState, useEffect } from "react";
import { useTransition } from "react";
import { updateField } from "@/app/actions/update-field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { GenerationType } from "@/types/creations";

interface EditableFieldProps {
  type: GenerationType;
  creationId: string;
  field: string;
  initialValue: string;
  label?: string;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

export function EditableField({
  type,
  creationId,
  field,
  initialValue,
  label,
  multiline = false,
  className = "",
  placeholder,
}: EditableFieldProps) {
  const [value, setValue] = useState(initialValue);
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Reset local state when initialValue changes (e.g., after regeneration)
  useEffect(() => {
    setValue(initialValue);
    setHasChanges(false);
    setIsEditing(false);
  }, [initialValue]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!hasChanges) return;
    
    try {
      startTransition(async () => {
        await updateField({
          creationId,
          type,
          field,
          value,
        });
        setHasChanges(false);
        setIsEditing(false);
        toast.success("Changes saved successfully");
      });
    } catch (error) {
      console.error("Error saving:", error);
      toast.error("Failed to save changes");
    }
  };

  const handleCancel = () => {
    setValue(initialValue);
    setHasChanges(false);
    setIsEditing(false);
  };

  const InputComponent = multiline ? Textarea : Input;

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground">
            {label}
          </label>
          {isPending && (
            <span className="text-xs text-gray-500">Saving...</span>
          )}
        </div>
      )}
      <div className="relative">
        {isEditing ? (
          <div className="space-y-2">
            <InputComponent
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              className={`w-full text-gray-900 dark:text-gray-100 ${className}`}
              placeholder={placeholder}
              rows={multiline ? 4 : 1}
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isPending}
                className="text-gray-900 dark:text-gray-100"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!hasChanges || isPending}
                className="bg-orchid hover:bg-orchid/90 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={`group relative rounded-md border border-transparent hover:border-gray-300 dark:hover:border-gray-600 p-2 cursor-text text-gray-900 dark:text-gray-100 ${className}`}
            onClick={() => setIsEditing(true)}
          >
            <div className={`whitespace-pre-wrap ${multiline ? "" : "truncate"}`}>
              {value || placeholder}
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center opacity-0 group-hover:opacity-100">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                Edit
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
