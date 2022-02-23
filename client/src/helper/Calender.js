export const getEndDate = (currentDate) => {
    const endDate = new Date(currentDate);
   
    endDate.setMonth(currentDate.getMonth() + 1);
    endDate.setDate(1);
    endDate.setDate(endDate.getDate() - 1);
    if (endDate.getDay() === 0) return endDate.setDate(endDate.getDate() + 1);
    return endDate.setDate(endDate.getDate() + (7 - endDate.getDay() + 1));
  };

  export const getStartDate = (currentDate) => {
    
    const startDate = new Date(currentDate);
    if (currentDate.getDay() === 0)
      return startDate.setDate(currentDate.getDate() - 6);
    return startDate.setDate(
      currentDate.getDate() - (currentDate.getDay() - 1)
    );
  };