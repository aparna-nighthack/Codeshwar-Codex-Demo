#!/usr/bin/env python3
"""Prime checker CLI.

Usage:
  python prime_check.py 29
  # -> Prime
"""

from __future__ import annotations

import argparse


def is_prime(n: int) -> bool:
    """Return True if n is a prime number.

    Efficient 6k±1 trial division up to sqrt(n).
    """
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False

    i = 5
    step = 2  # alternates between +2 and +4 to hit 6k±1
    while i * i <= n:
        if n % i == 0:
            return False
        i += step
        step = 6 - step
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description="Check if a number is prime.")
    parser.add_argument("n", type=int, help="Integer to test for primality")
    args = parser.parse_args()
    print("Prime" if is_prime(args.n) else "Not prime")


if __name__ == "__main__":
    main()

