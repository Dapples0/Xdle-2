/**
 * Modal component that returns a pop up
 * @param {React.ReactNode} children - child components
 * @param {boolean} small - Whether the modal size should be small
 * @param {boolean} medium - Whether the modal size should be medium
 * @returns html component for a modal dialog
 */
const Modal = ({ children }) => {

  return (
    <>
      <div role="dialog" className="fixed inset-0 z-60 flex items-center justify-center bg-gray-700/40">
        <div className={`bg-white rounded-2xl shadow-lg p-6 relative max-w-lg w-full dark:bg-[#1d1e20]`}>
          {children}
        </div>
      </div>
    </>
  );
}


export const VictoryModal = ({ show, setModal }) => {
  if (!show) return null;

  const handleClose = () => {
    setModal(false);
  }

  return (
    <Modal>
      <button type="button"
        onClick={() => handleClose()} className="absolute top-3 right-3 text-gray-900 hover:text-gray-500 cursor-pointer dark:text-white dark:hover:text-gray-400">
        Close
      </button>
      <div className="flex flex-col gap-5 justify-center items-center">
        <section className="flex flex-col justify-center items-center text-white">
          <p>Victory!</p>
        </section>
      </div>
    </Modal>
  );
}


export const LoseModal = ({ show, setModal, num }) => {
  if (!show) return null;

  const handleClose = () => {
    setModal(false);
  }

  return (
    <Modal>
      <button type="button"
        onClick={() => handleClose()} className="absolute top-3 right-3 text-gray-900 hover:text-gray-500 cursor-pointer dark:text-white dark:hover:text-gray-400">
        Close
      </button>
      <div className="flex flex-col gap-5 justify-center items-center">
        <section className="flex flex-col justify-center items-center text-white">
          <p>The number was {num}</p>
        </section>
      </div>
    </Modal>
  );
}
