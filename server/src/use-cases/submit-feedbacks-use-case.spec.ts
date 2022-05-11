import { SubmitFeedbacksUseCase } from "./submit-feedbacks-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeddback = new SubmitFeedbacksUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback',async () => {
   await expect(submitFeddback.execute({
      type: 'BUG',
      comment: 'example coment',
      screenshot: 'data:image/png;base64'
    })).resolves.not.toThrow();
   
    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();

  })

  it('should not be able to submit feedback without type',async () => {
    expect(submitFeddback.execute({
      type: '',
      comment: 'example coment',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();
  })

  it('should not be able to submit feedback without comment',async () => {
    expect(submitFeddback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64'
    })).rejects.toThrow();
  })

  it('should not be able to submit feedback with an invalid screenshot',async () => {
    expect(submitFeddback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.jpg'
    })).rejects.toThrow();
  })
})