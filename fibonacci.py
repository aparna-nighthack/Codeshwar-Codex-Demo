import argparse


def fibonacci_terms(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b


def fibonacci_upto(max_value):
    a, b = 0, 1
    while a <= max_value:
        yield a
        a, b = b, a + b


def main():
    parser = argparse.ArgumentParser(description="Generate Fibonacci series.")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument(
        "--terms",
        type=int,
        help="Number of terms to generate (>= 1)",
    )
    group.add_argument(
        "--max",
        dest="max_value",
        type=int,
        help="Generate all terms <= max value (>= 0)",
    )
    parser.add_argument(
        "--sep",
        default=" ",
        help="Separator between numbers (default: space)",
    )

    args = parser.parse_args()

    if args.terms is not None:
        if args.terms < 1:
            raise SystemExit("--terms must be >= 1")
        seq = list(fibonacci_terms(args.terms))
    else:
        if args.max_value < 0:
            raise SystemExit("--max must be >= 0")
        seq = list(fibonacci_upto(args.max_value))

    print(args.sep.join(str(x) for x in seq))
    print(f"Sum: {sum(seq)}")


if __name__ == "__main__":
    main()
