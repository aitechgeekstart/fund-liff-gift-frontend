import Link from "next/link";

export default function LegacyNextLink(props) {
  const { href, style, canShow = true, ...others } = props;

  if (!canShow) {
    return <></>;
  }

  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
        ...style,
      }}
      {...others}
    />
  );
}
