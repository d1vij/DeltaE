import { convertRgbToLab, DeltaE94, hexToRGBArray } from "delta-e-ts";
import { useState, useRef, useEffect } from "react";
import "./App.css";
import ColorPicker from "./ColorPicker";

function App() {
    const [colorA, setColorA] = useState("#ff0000");
    const [colorB, setColorB] = useState("#00ff00");
    const [result, setResult] = useState("");

    const DE94 = useRef(new DeltaE94({ chroma: 1, lightness: 1, hue: 1 }));

    useEffect(() => {
        const labA = convertRgbToLab(hexToRGBArray(colorA));
        const labB = convertRgbToLab(hexToRGBArray(colorB));
        setResult(DE94.current.compute(labA, labB).toPrecision(4));
    }, [colorA, colorB]);

    return (
        <div className="flex flex-col gap-1 justify-center items-center size-full absolute font-mono">
            <ColorPicker color={colorA} setColor={setColorA} />
            <ColorPicker color={colorB} setColor={setColorB} />
            {/*results*/}
            <p className="text-center">
                CIE94 Delta-E for the two colors is <em>{result}</em>
            </p>

            <p>
                See source at{" "}
                <a
                    className="hover:underline active:underline decoration-2"
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/d1vij/DeltaE"
                >
                    Github
                </a>
            </p>
        </div>
    );
}

export default App;
