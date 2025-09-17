"""
Fibonacci series generator.

Usage examples:
  - First N numbers:    python fibonacci.py --count 10
  - Up to max value:    python fibonacci.py --max 1000

By default, prints the first 10 numbers if no option is provided.
"""

from __future__ import annotations

import argparse
from typing import Iterator, List


def fib_count(n: int) -> Iterator[int]:
    """Yield the first n Fibonacci numbers (starting at 0).

    Example: n=5 -> 0, 1, 1, 2, 3
    """
    if n < 0:
        raise ValueError("count must be non-negative")
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b


def fib_upto(max_value: int) -> Iterator[int]:
    """Yield Fibonacci numbers up to and including max_value.

    Example: max_value=10 -> 0, 1, 1, 2, 3, 5, 8
    """
    a, b = 0, 1
    while a <= max_value:
        yield a
        a, b = b, a + b


def parse_args(argv: List[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate Fibonacci numbers.",
    )
    group = parser.add_mutually_exclusive_group()
    group.add_argument(
        "--count",
        type=int,
        help="number of Fibonacci terms to generate (starting at 0)",
    )
    group.add_argument(
        "--max",
        dest="max_value",
        type=int,
        help="generate all Fibonacci numbers up to this value",
    )
    parser.add_argument(
        "--sep",
        default=", ",
        help="separator for output (default: ', ')",
    )
    return parser.parse_args(argv)


def main(argv: List[str] | None = None) -> int:
    args = parse_args(argv)

    if args.count is None and args.max_value is None:
        # Default behavior: first 10 numbers
        args.count = 10

    if args.count is not None:
        if args.count < 0:
            raise SystemExit("--count must be non-negative")
        seq = list(fib_count(args.count))
    else:
        # args.max_value is not None
        seq = list(fib_upto(args.max_value))

    print(*seq, sep=args.sep)
    return 0


if __name__ == "__main__":  # pragma: no cover
    raise SystemExit(main())

