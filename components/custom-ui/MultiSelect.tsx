"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  categories: CategoryType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  categories,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  console.log("value", value);

  let selected: CategoryType[];
  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      categories.find((category) => category._id === id)
    ) as CategoryType[];
  }

  const selectables = categories.filter(
    (category) => !selected.includes(category)
  );

  return (
    <Command className="overflow-visible bg-white">
      <div className="flex gap-1 flex-wrap border rounded-md">
        {selected.map((category) => (
          <Badge key={category._id}>
            {category.title}
            <button
              className="ml-1 hover:text-red-1"
              onClick={() => onRemove(category._id)}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={() => setOpen(false)}
          onFocus={() => setOpen(true)}
        />
      </div>
      <div className="mt-2 relative">
        {open && (
          <CommandGroup className="absolute w-full x-10 top-0 overflow-auto border rounded-md shawdow-md">
            {selectables.map((category) => (
              <CommandItem
                key={category._id}
                onMouseDown={(e) => e.preventDefault()}
                onSelect={() => {
                  onChange(category._id);
                  setInputValue("");
                }}
                className="hover:bg-grey-2 cursor-pointer"
              >
                {category.title}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
