#!/usr/bin/env python3
"""
Fibonacci sequence generator with sum output.

Usage:
  - By number of terms:    python fibonacci.py 10

Prints the generated sequence and the sum of its terms.
"""

from __future__ import annotations

import argparse
from typing import List


def fibonacci_terms(n: int) -> List[int]:
    """Return the first n terms of the Fibonacci sequence starting at 0, 1.

    Examples:
        n=1 -> [0]
        n=2 -> [0, 1]
        n=5 -> [0, 1, 1, 2, 3]
    """
    if n <= 0:
        return []
    if n == 1:
        return [0]

    seq = [0, 1]
    for _ in range(2, n):
        seq.append(seq[-1] + seq[-2])
    return seq


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate Fibonacci sequence and its sum.")
    parser.add_argument(
        "n",
        type=int,
        help="Number of terms to generate (positive integer)",
    )
    args = parser.parse_args()

    n = args.n
    if n < 0:
        raise SystemExit("n must be a non-negative integer")

    sequence = fibonacci_terms(n)
    total = sum(sequence)

    print(f"Fibonacci sequence (n={n}): {sequence}")
    print(f"Sum: {total}")


if __name__ == "__main__":
    main()

