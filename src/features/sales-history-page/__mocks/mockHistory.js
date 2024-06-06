// mockHistory.js

const generateWeekDates = (year) => {
    const startDate = new Date(year, 0, 1);
    const firstMonday = new Date(startDate.setDate(startDate.getDate() + (1 + 7 - startDate.getDay()) % 7));
  
    const weekDates = [];
    let currentMonday = firstMonday;
    while (currentMonday.getFullYear() === year) {
      weekDates.push(`${currentMonday.getDate()} ${currentMonday.toLocaleString('default', { month: 'short' })}`);
      currentMonday = new Date(currentMonday.setDate(currentMonday.getDate() + 7));
    }
  
    return weekDates;
  };
  
  const weekDates2022 = generateWeekDates(2022);
  const weekDates2023 = generateWeekDates(2023);
  const weekDates2024 = generateWeekDates(2024);
  
  const createMockData = (year, weekDates) => {
    const productCodes = ['A123', 'B456', 'C789', 'D012', 'E345', 'F678', 'G901', 'H234', 'I567', 'J890', 'K123', 'L456', 'M789', 'N012', 'O345'];
    const descriptions = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G', 'Product H', 'Product I', 'Product J', 'Product K', 'Product L', 'Product M', 'Product N', 'Product O'];
  
    return productCodes.map((productCode, index) => {
      const mockEntry = { id: `${year}-${productCode}`, productCode, description: descriptions[index] };
  
      let total = 0;
  
      weekDates.forEach((weekDate) => {
        const sales = year === 2024 && new Date(`${weekDate} ${year}`).getTime() > Date.now() ? null : Math.floor(Math.random() * 300);
        mockEntry[weekDate] = sales;
        if (sales !== null) {
          total += sales;
        }
      });
  
      mockEntry.total = total;
  
      return mockEntry;
    });
  };
  
  export const mockData2022 = createMockData(2022, weekDates2022);
  export const mockData2023 = createMockData(2023, weekDates2023);
  export const mockData2024 = createMockData(2024, weekDates2024);
  