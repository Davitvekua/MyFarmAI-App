import { Check, ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxProps = {
  label: string
  placeholder: string
  searchPlaceholder: string
  emptyMessage: string
  value: string
  options: string[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onValueChange: (value: string) => void
}

function Combobox({
  label,
  placeholder,
  searchPlaceholder,
  emptyMessage,
  value,
  options,
  open,
  onOpenChange,
  onValueChange,
}: ComboboxProps) {
  return (
    <div>
      <label className="mb-2 block font-semibold text-gray-800">{label}</label>

      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="h-12 w-full justify-between rounded-lg border! border-gray-300! bg-white px-4 text-left font-normal text-gray-700 shadow-none hover:bg-white focus-visible:ring-2 focus-visible:ring-green-100"
          >
            <span className={value ? "text-gray-700" : "text-gray-400"}>
              {value || placeholder}
            </span>

            <ChevronsUpDown className="h-4 w-4 shrink-0 text-gray-500" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-(--radix-popover-trigger-width) overflow-hidden rounded-xl border! border-green-200! bg-[linear-gradient(180deg,#ffffff_0%,#f7f8ef_100%)] p-0 text-gray-900 shadow-xl">
          <Command shouldFilter className="bg-transparent text-gray-900">
            <CommandInput
              placeholder={searchPlaceholder}
              value={value}
              onValueChange={onValueChange}
              className="h-12 border-b border-green-100 bg-white/90 text-gray-900 placeholder:text-gray-400"
            />

            <CommandList className="max-h-64 bg-transparent px-2 py-2">
              <CommandEmpty className="px-4 py-5 text-center text-sm text-gray-500">
                {emptyMessage}
              </CommandEmpty>

              <CommandGroup className="space-y-1">
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={(selectedValue) => {
                      onValueChange(selectedValue)
                      onOpenChange(false)
                    }}
                    className="cursor-pointer rounded-lg px-3 py-2.5 text-gray-700 transition data-[selected=true]:bg-green-100 data-[selected=true]:text-green-950"
                  >
                    <Check
                      className={`mr-2 h-4 w-4 text-green-800 ${
                        value === option ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    {option}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Combobox
