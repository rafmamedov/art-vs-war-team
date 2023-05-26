type Props = {
  label: string;
  onClick?: () => void;
  className: string;
};

export const Button: React.FC<Props> = ({ label, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};
