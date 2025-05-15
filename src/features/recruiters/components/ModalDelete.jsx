

export const ModalDelete = ({isOpen, setIsOpen}) => {
  return (

<dialog open={isOpen} className="modal modal-bottom left- sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Are you sure you want to delete this offer?</p>
            <div className="modal-action justify-between ">
              <button className="btn" onClick={() => setIsOpen(false)}>
                Close
              </button>
              <button className="btn btn-error" >
              Yes, I'm sure
              </button>
            </div>
          </div>
        </dialog>

  )
}
