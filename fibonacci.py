"""Fibonacci series CLI.

Usage examples:

- First N terms:        python3 fibonacci.py --terms 10
- Up to max value:      python3 fibonacci.py --upto 100
- Nth number (0-index): python3 fibonacci.py --nth 25

Notes:
- Series starts at 0, 1, 1, 2, 3, 5, ...
- "Nth" is 0-indexed: nth=0 -> 0, nth=1 -> 1, nth=2 -> 1, etc.
"""

from __future__ import annotations

import argparse
from typing import Generator, Iterable, List


def _non_negative_int(value: str) -> int:
    i = int(value)
    if i < 0:
        raise argparse.ArgumentTypeError("value must be non-negative")
    return i


def _positive_int(value: str) -> int:
    i = int(value)
    if i <= 0:
        raise argparse.ArgumentTypeError("value must be a positive integer")
    return i


def fib_generator() -> Generator[int, None, None]:
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


def fib_terms(n: int) -> Iterable[int]:
    if n < 0:
        raise ValueError("n must be non-negative")
    gen = fib_generator()
    for _ in range(n):
        yield next(gen)


def fib_upto(max_value: int) -> Iterable[int]:
    if max_value < 0:
        return []
    a, b = 0, 1
    while a <= max_value:
        yield a
        a, b = b, a + b


def fib_nth(k: int) -> int:
    if k < 0:
        raise ValueError("k must be non-negative")
    a, b = 0, 1
    for _ in range(k):
        a, b = b, a + b
    return a


def main(argv: List[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Print Fibonacci series or specific terms.")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--terms", type=_positive_int, help="print the first N terms of the series")
    group.add_argument("--upto", type=_non_negative_int, help="print all terms <= MAX")
    group.add_argument("--nth", type=_non_negative_int, help="print the 0-indexed nth term only")
    parser.add_argument("--sep", default=" ", help="separator for output list (default: space)")

    args = parser.parse_args(argv)

    if args.nth is not None:
        print(fib_nth(args.nth))
        return 0

    items: Iterable[int]
    if args.terms is not None:
        items = fib_terms(args.terms)
    else:
        items = fib_upto(args.upto)

    print(args.sep.join(str(x) for x in items))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

