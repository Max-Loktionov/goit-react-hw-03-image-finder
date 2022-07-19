import PropTypes from 'prop-types';
import style from './button.module.css';

function Button({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={style.button}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
