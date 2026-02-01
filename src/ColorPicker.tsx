type ColorPickerProps = {
    color: string;
    setColor: React.Dispatch<React.SetStateAction<string>>;
};
export default function ColorPicker({ color, setColor }: ColorPickerProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setColor(e.target.value);
    }
    return (
        <div className="bg-rounded border border-gray-400 flex rounded px-0.5 gap-0.5">
            <input
                type="color"
                value={color}
                onChange={handleChange}
                className="h-8 cursor-pointer"
            />
            <input
                type="text"
                required
                maxLength={7}
                pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                value={color}
                onChange={handleChange}
                className="
                    bg-gray-200 px-1 tracking-wider uppercase w-20 cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-blue-300
                    invalid:ring-2 invalid:ring-red-400!
                "
            />
        </div>
    );
}
