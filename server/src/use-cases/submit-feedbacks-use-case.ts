import { MailAdpter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbacksUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbacksUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdpter
  ){}

  async execute(request: SubmitFeedbacksUseCaseRequest){
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error('type is required');
    }

    if(!comment) {
      throw new Error('comment is required');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('invalid screenshot format');
    }

    await this.feedbacksRepository.create({
      type, 
      comment, 
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
      `<div>`,
      `<p>Tipo de feedback: ${type}</p>`,
      `<p>comentário: ${comment}</p>`,
      screenshot ? `<img width="400px" src="${screenshot}" />` : ``,
      `</div>`].join('\n')
    })

  }
}