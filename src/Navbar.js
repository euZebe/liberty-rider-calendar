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
        <div onClick={() => onPreviousClick()}>
          <span className="chevron left" />
          {prev}
        </div>
      ) : (
        <span />
      )}

      {showNextButton ? (
        <div onClick={() => onNextClick()}>
          {next}
          <span className="chevron right" />
        </div>
      ) : (
        <span />
      )}
    </div>
  );
}
