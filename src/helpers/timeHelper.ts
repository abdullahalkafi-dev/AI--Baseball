export const buildDateFilter = (endTime: string) => {
  const specifiedDate = new Date(endTime);
  if (isNaN(specifiedDate.getTime())) return null;

  const startOfDay = new Date(
    specifiedDate.getFullYear(),
    specifiedDate.getMonth(),
    specifiedDate.getDate()
  );
  const endOfDay = new Date(
    specifiedDate.getFullYear(),
    specifiedDate.getMonth(),
    specifiedDate.getDate(),
    23,
    59,
    59,
    999
  );

  return {
    endTime: {
      $gte: startOfDay.toISOString(),
      $lte: endOfDay.toISOString(),
    },
  };
};

/**
 * Returns the start of day (00:00:00.000) for a given date
 */
export const startOfDay = (date: Date | string): Date => {
  const targetDate = date instanceof Date ? date : new Date(date);
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided to startOfDay');
  }
  
  return new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    0,
    0,
    0,
    0
  );
};

/**
 * Returns the end of day (23:59:59.999) for a given date
 */
export const endOfDay = (date: Date | string): Date => {
  const targetDate = date instanceof Date ? date : new Date(date);
  if (isNaN(targetDate.getTime())) {
    throw new Error('Invalid date provided to endOfDay');
  }
  
  return new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    23,
    59,
    59,
    999
  );
};
