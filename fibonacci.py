#!/usr/bin/env python3
"""
Fibonacci series generator.

Usage examples:
  - First N terms:   python fibonacci.py --count 10
  - Up to a max N:   python fibonacci.py --max 1000

If no option is provided, defaults to --count 10.
"""

from __future__ import annotations

import argparse


def fibonacci_count(n: int) -> list[int]:
    """Return the first n Fibonacci numbers (n >= 0).

    Sequence starts at 0, 1, 1, 2, 3, 5, ...
    """
    if n < 0:
        raise ValueError("count must be >= 0")
    a, b = 0, 1
    out: list[int] = []
    for _ in range(n):
        out.append(a)
        a, b = b, a + b
    return out


def fibonacci_upto(limit: int) -> list[int]:
    """Return Fibonacci numbers not exceeding limit (limit >= 0)."""
    if limit < 0:
        raise ValueError("max must be >= 0")
    out: list[int] = []
    a, b = 0, 1
    while a <= limit:
        out.append(a)
        a, b = b, a + b
    return out


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate Fibonacci series by count or up to a maximum value.",
    )
    group = parser.add_mutually_exclusive_group()
    group.add_argument(
        "-n",
        "--count",
        type=int,
        help="Number of terms to generate (>= 0)",
    )
    group.add_argument(
        "-m",
        "--max",
        dest="max_value",
        type=int,
        help="Generate terms up to this maximum value (>= 0)",
    )

    args = parser.parse_args()

    # Default behavior: first 10 terms if no option is provided
    if args.count is None and args.max_value is None:
        args.count = 10

    try:
        if args.count is not None:
            seq = fibonacci_count(args.count)
        else:
            seq = fibonacci_upto(args.max_value)  # type: ignore[arg-type]
    except ValueError as e:
        parser.error(str(e))
        return

    print(" ".join(map(str, seq)))


if __name__ == "__main__":
    main()

