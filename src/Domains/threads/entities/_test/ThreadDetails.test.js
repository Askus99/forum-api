const ThreadDetails = require('../ThreadDetails');

describe('a ThreadDetails entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'gameboy',
      body: 'seru',
      date: '2022-02-02T05:23:14.615Z',
      username: 'user-123',
    };

    // Action and Assert
    expect(() => new ThreadDetails(payload)).toThrowError('THREAD_DETAILS.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      title: 'gameboy',
      body: 'seru',
      date: '2022-02-02T05:23:14.615Z',
      username: 'user-123',
      comments: {},
    };

    // Action and Assert
    expect(() => new ThreadDetails(payload)).toThrowError('THREAD_DETAILS.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create threadDetails object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'gameboy',
      body: 'seru',
      date: new Date().toISOString(),
      username: 'user-123',
      comments: [],
    };

    // Action
    const thread = new ThreadDetails(payload);

    // Assert
    expect(thread.id).toEqual(payload.id);
    expect(thread.title).toEqual(payload.title);
    expect(thread.body).toEqual(payload.body);
    expect(thread.date).toEqual(payload.date);
    expect(thread.username).toEqual(payload.username);
    expect(thread.comments).toEqual(payload.comments);
  });
});