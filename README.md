# delta-e

Library to calculate DeltaE from any two CIE-Lab colors. Also includes utils to convert hex string to RGB and RGB to CIE-Lab color space

Currently only supports the DeltaE94 Algorithm

## Installation

```bash
bun add delta-e
```

## Usage

```typescript
import { DeltaE94 } from "delta-e";

const weights: DeltaE94_Weights = { lightness: 1, chroma: 1, hue: 1 };

const DE94 = new DeltaE94(weights);

const delta_e = DE94.compute([255, 0, 0], [0, 255, 0]);
```

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines.

## License
