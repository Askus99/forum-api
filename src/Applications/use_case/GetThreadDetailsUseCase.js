/* eslint-disable no-param-reassign */
const ThreadDetails = require('../../Domains/threads/entities/ThreadDetails');
const CommentDetails = require('../../Domains/comments/entities/CommentDetails');

class GetThreadDetailsUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId) {
    await this._threadRepository.isThreadExist(threadId);
    const threadComments = await this._commentRepository.getThreadComments(threadId);
    const thread = await this._threadRepository.getThreadById(threadId);

    threadComments.forEach((comment) => {
      if (comment.is_delete === true) {
        comment.content = '**komentar telah dihapus**';
      }
      delete comment.is_delete;
    });

    const commentsById = threadComments.map((data) => {
      return new CommentDetails({
        ...data,
      });
    });

    return new ThreadDetails({
      ...thread,
      comments: commentsById,
    });
  }
}

module.exports = GetThreadDetailsUseCase;