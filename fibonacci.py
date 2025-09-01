#!/usr/bin/env python3

"""Simple Fibonacci sequence generator.

Provides a `fibonacci(n)` function that returns the first `n` numbers
of the Fibonacci sequence, and a small CLI to print them.
"""

from typing import List


def fibonacci(n: int) -> List[int]:
    """Return a list with the first `n` Fibonacci numbers.

    Sequence starts at 0, 1, ...
    """
    if n <= 0:
        return []
    if n == 1:
        return [0]

    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq


def main() -> None:
    import argparse

    parser = argparse.ArgumentParser(description="Print the first N Fibonacci numbers.")
    parser.add_argument(
        "n",
        type=int,
        nargs="?",
        default=10,
        help="How many Fibonacci numbers to print (default: 10)",
    )
    args = parser.parse_args()

    seq = fibonacci(args.n)
    print(" ".join(map(str, seq)))


if __name__ == "__main__":
    main()

