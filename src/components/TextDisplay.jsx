function TextDisplay({ className, children }) {
  return (
    <section className={className}>
      <div className={`${"textDisplay"}`}>{children}</div>
    </section>
  );
}

export default TextDisplay;
