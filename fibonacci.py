#!/usr/bin/env python3
import argparse


def fibonacci_terms(n: int):
    seq = []
    a, b = 0, 1
    for _ in range(n):
        seq.append(a)
        a, b = b, a + b
    return seq


def fibonacci_upto(limit: int):
    seq = []
    a, b = 0, 1
    while a <= limit:
        seq.append(a)
        a, b = b, a + b
    return seq


def main():
    parser = argparse.ArgumentParser(description="Generate Fibonacci numbers.")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "-n",
        "--terms",
        type=int,
        help="Number of terms to generate (>= 0)",
    )
    group.add_argument(
        "-m",
        "--max",
        dest="max_value",
        type=int,
        help="Generate values up to and including this maximum",
    )
    parser.add_argument(
        "-s", "--sep", default=" ", help="Separator between numbers (default: space)"
    )

    args = parser.parse_args()

    if args.terms is not None:
        if args.terms < 0:
            parser.error("--terms must be >= 0")
        seq = fibonacci_terms(args.terms)
    else:
        limit = args.max_value
        seq = fibonacci_upto(limit)

    print(args.sep.join(map(str, seq)))


if __name__ == "__main__":
    main()

