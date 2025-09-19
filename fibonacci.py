"""
Fibonacci series generator with sum calculation.

Usage:
  python fibonacci.py --terms 10

Outputs the Fibonacci sequence and the sum of its terms.
"""

from __future__ import annotations

import argparse
from typing import List


def fibonacci_series(n_terms: int) -> List[int]:
    """Return the first n Fibonacci numbers (starting 0, 1).

    Args:
        n_terms: Number of terms to generate. Must be >= 0.

    Returns:
        A list of integers containing the Fibonacci sequence.
    """
    if n_terms < 0:
        raise ValueError("n_terms must be non-negative")
    if n_terms == 0:
        return []
    if n_terms == 1:
        return [0]

    seq = [0, 1]
    for _ in range(2, n_terms):
        seq.append(seq[-1] + seq[-2])
    return seq


def fibonacci_sum(n_terms: int) -> int:
    """Return the sum of the first n Fibonacci numbers."""
    return sum(fibonacci_series(n_terms))


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate Fibonacci series and its sum.")
    parser.add_argument(
        "-t",
        "--terms",
        type=int,
        required=True,
        help="Number of terms to generate (>= 0)",
    )
    args = parser.parse_args()

    seq = fibonacci_series(args.terms)
    total = sum(seq)

    print("Fibonacci sequence ({} terms):".format(args.terms))
    if seq:
        print(" ".join(str(x) for x in seq))
    else:
        print("<empty>")
    print("Sum:", total)


if __name__ == "__main__":
    main()

