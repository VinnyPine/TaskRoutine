import { Modal } from "../Modal"
import { useNavigate } from "react-router-dom"

interface ModalErrorProps {
  toggleModal: () => void
}

export const ModalError = ({ toggleModal }: ModalErrorProps) => {
  const navigate = useNavigate()

  const handleCloseAndRedirect = () => {
    toggleModal()
    navigate('/')
  }

  return (
    <Modal toggleModal={toggleModal} blockClosing> 
      Você não está autenticado!
      <button onClick={handleCloseAndRedirect}>Ir para o login</button>
    </Modal>
  )
}