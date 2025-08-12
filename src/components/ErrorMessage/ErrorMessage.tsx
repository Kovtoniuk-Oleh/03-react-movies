import css from './ErrorMessage.module.css';

type Props = {
  message?: string;
};

const ErrorMessage = ({ message }: Props) => {
  return <div className={css.error}>{message || 'Something went wrong.'}</div>;
};

export default ErrorMessage;
