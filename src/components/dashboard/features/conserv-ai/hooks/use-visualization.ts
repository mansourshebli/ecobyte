export function useVisualization() {
  const generateVisualization = (text: string) => {
    const hasNumbers = /\d+/.test(text);
    if (!hasNumbers) return null;

    const years = text.match(/\b(19|20)\d{2}\b/g) || [];
    const numbers = text.match(/\b\d+(?:\.\d+)?%?\b/g) || [];

    if (years.length > 0 && numbers.length > 0) {
      if (text.toLowerCase().includes('distribution') || text.toLowerCase().includes('percentage')) {
        const pieData = numbers.slice(0, 4).map((value, index) => ({
          name: `Category ${index + 1}`,
          value: parseFloat(value.replace('%', '')),
        }));
        return { type: 'pie', data: pieData };
      } else {
        const lineData = years.slice(0, 5).map((year, i) => ({
          year,
          value: parseFloat(numbers[i]?.replace('%', '') || '0'),
        }));
        return { type: 'line', data: lineData };
      }
    }

    return null;
  };

  return { generateVisualization };
}