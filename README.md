# Fascia Math

Fascia and soffit arithmetic. The run of 120 ft takes 8 boards of 16 ft, leaving 8 ft of the last one.

## What it computes

- **The fascia truth** - boards: the eave run (1 to 10000 ft) divided by the board length (1 to 24 ft), rounded up, and what is left of the last one.
- **The soffit truth** - soffit: the run times the depth (1 to 120 inches), in square feet.
- **The panels truth** - panels: the area (1 to 10000000 sq ft) divided by one panel's coverage (1 to 100 sq ft), rounded up.
- **The cost truth** - cost: the boards (1 to 100000) and panels (1 to 1000000) at their prices (0.01 to 10000 dollars), and what that is per foot of run.

## Boundary

Arithmetic only. Counting applied as written. It has not seen any roof and does not know the overhang framing, the vent needs, the waste, the moisture or the local building rules, and it gives no verdict that an eave is sound. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/fasciamath/
Repo: https://github.com/iLanis-agent/fasciamath
