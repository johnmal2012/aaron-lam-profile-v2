export type SendEmailInput = {
  to: string;
  subject: string;
  meta: {
    title?: string;
    description: string;
    buttonText?: string;
    link: string;
  };
};