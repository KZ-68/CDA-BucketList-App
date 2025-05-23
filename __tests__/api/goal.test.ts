import { getGoalById } from '../../__mocks__/goalService';

jest.mock('./goalService');

const mockedGetGoalById = getGoalById as jest.MockedFunction<typeof getGoalById>;

describe('getGoalById', () => {
  it('should return mocked goal', async () => {
    const mockGoal = {
      id: 'goal123',
      label: 'Test Goal',
      description: 'Une description de test',
      createdAt: new Date('2023-01-01T00:00:00Z'),
      updatedAt: new Date('2023-01-02T00:00:00Z'),
      isAccomplished: false,
      priority: 2,
      collectionId: 'col123',
      categoryId: 'cat123',
      collection: {
        id: 'col123',
        name: 'Collection Test',
      },
      category: {
        id: 'cat123',
        name: 'Category Test',
      },
    };

    mockedGetGoalById.mockResolvedValue(mockGoal);

    const result = await getGoalById('goal123');
    expect(result).toEqual(mockGoal);

    expect(mockGoal).toMatchObject({
      id: 'goal123',
      label: 'Test Goal',
      description: 'Une description de test',
      isAccomplished: false,
      priority: 2,
      collectionId: 'col123',
      categoryId: 'cat123',
      collection: {
        id: 'col123',
        name: 'Collection Test',
      },
      category: {
        id: 'cat123',
        name: 'Category Test',
      },
    });
    
  });
});