#!/usr/bin/env python3
"""
Fibonacci series generator.

Usage:
  python3 fibonacci.py            # prints first 10 terms
  python3 fibonacci.py 15         # prints first 15 terms

The series starts at 0, 1, 1, 2, 3, ...
"""

from __future__ import annotations

import argparse
import sys


def fibonacci(n: int) -> list[int]:
    """Return the first n Fibonacci numbers as a list.

    The sequence starts at 0, 1, 1, 2, ...
    """
    if n < 0:
        raise ValueError("n must be non-negative")

    a, b = 0, 1
    seq: list[int] = []
    for _ in range(n):
        seq.append(a)
        a, b = b, a + b
    return seq


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Print Fibonacci series")
    parser.add_argument(
        "terms",
        nargs="?",
        type=int,
        default=10,
        help="Number of terms to print (default: 10)",
    )
    args = parser.parse_args(argv)

    try:
        seq = fibonacci(args.terms)
    except ValueError:
        print("Error: terms must be a non-negative integer.", file=sys.stderr)
        return 2

    print(" ".join(map(str, seq)))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

