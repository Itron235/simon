import './Button.css';

interface ButtonProps {
  offColor: string;
  onColor: string;
  isOn: boolean;
  onClick: () => void;
}

function Button({ offColor, onColor, isOn, onClick }: ButtonProps) {
  return (
    <div className="simon-button-container">
      <button
        className="simon-button"
        style={{ backgroundColor: isOn ? onColor : offColor }}
        onClick={onClick}
      >
      </button>
    </div>
  );
}

export default Button;
