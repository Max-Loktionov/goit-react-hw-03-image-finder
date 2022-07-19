import { Component } from 'react';
import { createPortal } from 'react-dom';
import style from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  onBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <div className={style.overlay} onClick={this.onBackdrop}>
        <div className={style.modal}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
export default Modal;
