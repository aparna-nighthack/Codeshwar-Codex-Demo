"""
Fibonacci series generator that prints only even numbers and their sum.

Usage:
  python fibonacci.py --terms 10

Outputs only the even Fibonacci numbers (from the first N terms) and their sum.
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
    parser = argparse.ArgumentParser(
        description="Generate even Fibonacci numbers and their sum."
    )
    parser.add_argument(
        "-t",
        "--terms",
        type=int,
        required=True,
        help="Number of terms to generate (>= 0)",
    )
    args = parser.parse_args()

    seq = fibonacci_series(args.terms)
    even_seq = [x for x in seq if x % 2 == 0]
    total = sum(even_seq)

    print("Even Fibonacci numbers (from {} terms):".format(args.terms))
    if even_seq:
        print(" ".join(str(x) for x in even_seq))
    else:
        print("<empty>")
    print("Sum:", total)


if __name__ == "__main__":
    main()
