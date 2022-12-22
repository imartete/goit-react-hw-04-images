import 'styles.css';
import { createPortal } from 'react-dom';

const loaderRoot = document.querySelector('#loader-root');

export function Loader() {
  return createPortal(
    <div className="Overlay">
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>,
    loaderRoot
  );
}
