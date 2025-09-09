#!/usr/bin/env python3
"""
Fibonacci series generator with a tiny CLI.

Usage examples:
  - First 10 terms (default):
      python3 fibonacci.py
  - First N terms:
      python3 fibonacci.py --terms 15
  - Up to a maximum value:
      python3 fibonacci.py --max 1000
  - Custom separator (comma):
      python3 fibonacci.py --terms 10 --sep ","
"""

from __future__ import annotations

import argparse
import sys
from typing import Iterable, Iterator


def fib_terms(n: int) -> Iterator[int]:
    """Yield the first n Fibonacci numbers (starting from 0).

    Example for n=7 -> 0, 1, 1, 2, 3, 5, 8
    """
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b


def fib_upto(limit: int) -> Iterator[int]:
    """Yield Fibonacci numbers up to and including 'limit'."""
    a, b = 0, 1
    while a <= limit:
        yield a
        a, b = b, a + b


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate a Fibonacci series.")
    group = parser.add_mutually_exclusive_group()
    group.add_argument(
        "-t",
        "--terms",
        type=int,
        help="Number of terms to generate (starting at 0).",
    )
    group.add_argument(
        "-m",
        "--max",
        type=int,
        help="Generate terms up to and including this maximum value.",
    )
    parser.add_argument(
        "-s",
        "--sep",
        default=" ",
        help="Separator between numbers (default: space).",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    if argv is None:
        argv = sys.argv[1:]
    args = parse_args(argv)

    # Default behavior: 10 terms if neither option provided
    if args.terms is None and args.max is None:
        args.terms = 10

    if args.terms is not None:
        if args.terms < 0:
            print("--terms must be non-negative", file=sys.stderr)
            return 2
        seq: Iterable[int] = fib_terms(args.terms)
    else:
        if args.max < 0:  # type: ignore[operator]
            # For negative max, there is no value >= 0 to emit.
            seq = []
        else:
            seq = fib_upto(args.max)  # type: ignore[arg-type]

    out = args.sep.join(str(x) for x in seq)
    print(out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

