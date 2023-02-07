type JSXElement = JSX.Element;

function ShowType<A, B extends A>(props: {
  value: A;
  isB: (a: A) => NonNullable<B> | undefined;
  asB: (i: NonNullable<B>) => JSXElement;
  fallback: JSXElement;
}) {
  return props.isB(props.value)
    ? props.asB(props.isB(props.value)!)
    : props.fallback;
}

type User =
  | { tag: "anonymous" }
  | { tag: "signedIn"; userName: string; avatar: string };

// Type checks and works fine on my computer and gives proper auto-complete for
// the asB function my computer
const Greeting1 = (s: User) =>
  ShowType({
    value: s,
    isB: (i) => (i.tag === "signedIn" ? i : undefined),
    asB: (b) => <div>Hi, ${b.userName}</div>,
    fallback: <div>Hello, stranger!</div>,
  });

// TypeScript error
const Greeting2 = (s: User) => (
  <ShowType
    value={s}
    isB={(i) => (i.tag === "signedIn" ? i : undefined)}
    asB={(b) => <div>Hi, ${b.userName}</div>}
    fallback={<div>Hello, stranger!</div>}
  />
);
