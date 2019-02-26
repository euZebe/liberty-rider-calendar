import { isEventPendingOrFuture, getDates } from "./date-utils";

test("isEventPendingOrFuture should be valid for a today event", () => {
  expect(isEventPendingOrFuture({ dateFrom: new Date() })).toBe(true);
});

test("isEventPendingOrFuture should be valid for a future event", () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  expect(isEventPendingOrFuture({ dateFrom: tomorrow })).toBe(true);
});

test("isEventPendingOrFuture should not be valid for a past event", () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  console.log(yesterday);
  expect(isEventPendingOrFuture({ dateFrom: yesterday })).toBe(false);
});

test("getDates should return every day between both dates, bounds included", () => {
  const from = new Date(2018, 1, 14);
  const to = new Date(2018, 1, 24);
  expect(getDates(from, to).length).toEqual(11);
});
