import { formatRelativeTime } from '../../lib/formatRelativeTime';

describe('formatRelativeTime', () => {
  const now = new Date();

  it('should return "Just now" for time differences less than 60 seconds', () => {
    const justNow = new Date(now.getTime() - 30 * 1000); // 30 seconds ago
    expect(formatRelativeTime(justNow)).toBe('Just now');
  });

  it('should return "X minutes ago" for time differences between 1 and 59 minutes', () => {
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000); // 5 minutes ago
    expect(formatRelativeTime(fiveMinutesAgo)).toBe('5 minutes ago');

    const oneMinuteAgo = new Date(now.getTime() - 1 * 60 * 1000);
    expect(formatRelativeTime(oneMinuteAgo)).toBe('1 minute ago');
  });

  it('should return "X hours ago" for time differences between 1 and 23 hours', () => {
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
    expect(formatRelativeTime(twoHoursAgo)).toBe('2 hours ago');

    const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);
    expect(formatRelativeTime(oneHourAgo)).toBe("1 hour ago");
  });

  it('should return "X days ago" for time differences between 1 and 6 days', () => {
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
    expect(formatRelativeTime(threeDaysAgo)).toBe('3 days ago');

    const oneDayAgo = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(oneDayAgo)).toBe("1 day ago");
  });

  it('should return "X weeks ago" for time differences between 1 and 3 weeks (less than 4)', () => {
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(oneWeekAgo)).toBe("1 week ago");

    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(twoWeeksAgo)).toBe("2 weeks ago");
  });

  it("should return 'X months ago' for time differences between 1 and 11 months (less than 12)", () => {
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(oneMonthAgo)).toBe("1 month ago");

    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(sixMonthsAgo)).toBe("6 months ago");
  })

  it("should return 'X years ago' for time differences greater than 1 year", () => {
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(oneYearAgo)).toBe("1 year ago");

    const fiveYearsAgo = new Date(now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(fiveYearsAgo)).toBe("5 years ago");
  })
});
