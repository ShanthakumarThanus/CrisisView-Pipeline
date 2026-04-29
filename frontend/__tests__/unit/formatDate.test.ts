import '@testing-library/jest-dom';

export const formatIncidentStatus = (technicianCount: number): string => {
  if (technicianCount === 0) return 'critical';
  if (technicianCount < 3) return 'in-progress';
  return 'resolved';
};

describe('Tests Unitaires - formatIncidentStatus', () => {
  test('retourne critical quand 0 technicien', () => {
    expect(formatIncidentStatus(0)).toBe('critical');
  });

  test('retourne in-progress avec 1 ou 2 techniciens', () => {
    expect(formatIncidentStatus(1)).toBe('in-progress');
    expect(formatIncidentStatus(2)).toBe('in-progress');
  });

  test('retourne resolved avec 3+ techniciens', () => {
    expect(formatIncidentStatus(3)).toBe('resolved');
    expect(formatIncidentStatus(5)).toBe('resolved');
  });
});