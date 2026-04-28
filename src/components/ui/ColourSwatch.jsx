import { COLOUR_MAP } from '../../data/products';
import './ColourSwatch.css';

export default function ColourSwatch({ colours, selected, onSelect, size = 'md' }) {
  return (
    <div className={`swatch-group swatch-${size}`}>
      {colours.map(colour => {
        const hex = COLOUR_MAP[colour] || '#ccc';
        const isSelected = selected === colour;
        return (
          <button
            key={colour}
            className={`swatch ${isSelected ? 'selected' : ''}`}
            style={{ background: hex }}
            title={colour}
            onClick={() => onSelect(colour)}
            aria-label={colour}
            aria-pressed={isSelected}
          />
        );
      })}
    </div>
  );
}
