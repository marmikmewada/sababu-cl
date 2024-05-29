/* eslint-disable react/prop-types */
import { useState } from "react";

const firstParagraph = (
  <p>
    Sababu Fund Inc. was founded in March 2022 by seven exemplary figures, also
    refer to as the founding members, in the Sierra Leonean community in
    Northern Virginia, United States. Sababu Fund is a non-profit organization
    that provides moral and financial support for people that are grieving,
    depressed and underprivileged. The organization was formed to provide grief
    packages in support and services to families and members and assist in
    facilitating funeral proceedings for Sierra Leoneans that die in the United
    States of America.
  </p>
);

function TextExpander({
  className,
  buttonStyle,
  expanded = false,
  children,
  expandTextButton = "Show more",
  collapseTextButton = "Show less",
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const displayText = isExpanded ? children : firstParagraph;

  return (
    <div className={className}>
      <div>{displayText}</div>
      <button
        className={buttonStyle}
        onClick={() => setIsExpanded((expand) => !expand)}
      >
        {isExpanded ? collapseTextButton : expandTextButton}
      </button>
    </div>
  );
}

export default TextExpander;
