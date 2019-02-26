import React from "react";

export default function Navbar({
  nextMonth,
  previousMonth,
  onPreviousClick,
  onNextClick,
  className,
  localeUtils,
  showPreviousButton,
  showNextButton,
  locale
}) {
  const months = localeUtils.getMonths(locale);
  const prev = months[previousMonth.getMonth()];
  const next = months[nextMonth.getMonth()];

  return (
    <div className={className}>
      {showPreviousButton ? (
        <span onClick={() => onPreviousClick()}>&lt; {prev}</span>
      ) : (
        <span />
      )}
      {showNextButton && <span onClick={() => onNextClick()}>{next} &gt;</span>}
    </div>
  );
}
