const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const GetThreadDetailsUseCase = require('../GetThreadDetailsUseCase');
const ThreadDetails = require('../../../Domains/threads/entities/ThreadDetails');
const CommentDetails = require('../../../Domains/comments/entities/CommentDetails');

describe('GetThreadDetailsUseCase', () => {
  /**
   * Menguji apakah use case mampu mengoskestrasikan langkah demi langkah dengan benar.
   */
  describe('when is_delete false', () => {
    it('should orchestrating the get thread details action correctly', async () => {
      // Arrange
      const useCaseThreadId = 'thread-123';
  
      const expectedThreadDetails = new ThreadDetails({
        id: 'thread-123',
        title: 'dicoding',
        body: 'dicodingindo',
        date: '2022-02-02T09:34:56.555Z',
        username: 'ferero',
        comments: [
          new CommentDetails({
            id: 'comment-123',
            username: 'dicoding',
            date: '2022-02-02T09:34:56.555Z',
            content: 'komentar',
          }),
        ],
      });
  
      /** creating dependency of use case */
      const mockThreadRepository = new ThreadRepository();
      const mockCommentRepository = new CommentRepository();
  
      /** mocking needed function */
      mockThreadRepository.isThreadExist = jest.fn()
        .mockImplementation(() => Promise.resolve());
      mockCommentRepository.getThreadComments = jest.fn()
        .mockImplementation(() => Promise.resolve([{
          id: 'comment-123',
          username: 'dicoding',
          date: '2022-02-02T09:34:56.555Z',
          content: 'komentar',
          is_delete: false,
        },
        ]));
      mockThreadRepository.getThreadById = jest.fn()
        .mockImplementation(() => Promise.resolve({
          id: 'thread-123',
          title: 'dicoding',
          body: 'dicodingindo',
          date: '2022-02-02T09:34:56.555Z',
          username: 'ferero',
        }));
  
      /** creating use case instance */
      const getThreadDetailsUseCase = new GetThreadDetailsUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: mockCommentRepository,
      });
  
      // Action
      const threadDetails = await getThreadDetailsUseCase.execute(useCaseThreadId);
  
      // Assert
      expect(threadDetails).toStrictEqual(expectedThreadDetails);
      expect(mockThreadRepository.isThreadExist).toBeCalledWith(useCaseThreadId);
      expect(mockCommentRepository.getThreadComments).toBeCalledWith(useCaseThreadId);
      expect(mockThreadRepository.getThreadById).toBeCalledWith(useCaseThreadId);
    });
  })
  describe('when is_delete true', () => {
    it('should orchestrating the get thread details action correctly', async () => {
      // Arrange
      const useCaseThreadId = 'thread-123';
  
      const expectedThreadDetails = new ThreadDetails({
        id: 'thread-123',
        title: 'dicoding',
        body: 'dicodingindo',
        date: '2022-02-02T09:34:56.555Z',
        username: 'ferero',
        comments: [
          new CommentDetails({
            id: 'comment-123',
            username: 'dicoding',
            date: '2022-02-02T09:34:56.555Z',
            content: '**komentar telah dihapus**',
          }),
        ],
      });

      /** creating dependency of use case */
      const mockThreadRepository = new ThreadRepository();
      const mockCommentRepository = new CommentRepository();

      mockThreadRepository.isThreadExist = jest.fn()
        .mockImplementation(() => Promise.resolve());
      mockCommentRepository.getThreadComments = jest.fn()
        .mockImplementation(() => Promise.resolve([{
          id: 'comment-123',
          username: 'dicoding',
          date: '2022-02-02T09:34:56.555Z',
          content: '**komentar telah dihapus**',
          is_delete: true,
        },
        ]));
      mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve({
        id: 'thread-123',
        title: 'dicoding',
        body: 'dicodingindo',
        date: '2022-02-02T09:34:56.555Z',
        username: 'ferero',
      }));

      /** creating use case instance */
      const getThreadDetailsUseCase = new GetThreadDetailsUseCase({
        threadRepository: mockThreadRepository,
        commentRepository: mockCommentRepository,
      });
  
      // Action
      const threadDetails = await getThreadDetailsUseCase.execute(useCaseThreadId);
  
      // Assert
      expect(threadDetails).toStrictEqual(expectedThreadDetails);
      expect(mockThreadRepository.isThreadExist).toBeCalledWith(useCaseThreadId);
      expect(mockCommentRepository.getThreadComments).toBeCalledWith(useCaseThreadId);
      expect(mockThreadRepository.getThreadById).toBeCalledWith(useCaseThreadId);
    })
  })
});