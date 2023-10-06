import {Modal as ModalFlowbite} from 'flowbite'
import type {ModalOptions, ModalInterface} from 'flowbite'
import {ReactNode, useCallback, useEffect, useState} from "react";
import {Flex} from "@/components/ui/Flex";

type Props = {
  id: string;
  children: ReactNode;
  title?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
};
export const Modal = ({id, children, title, onClose, onOpen, isOpen = false}: Props) => {
  const [modal, setModal] = useState<ModalInterface | null>(null);

  const openModal = useCallback(() => {
    if (!modal) return;
    typeof onOpen === 'function' ? onOpen() : modal.show();
  }, [modal, onOpen]);

  const closeModal = useCallback(() => {
    if (!modal) return
    typeof onClose === 'function' ? onClose() : modal.hide();
  }, [modal, onClose]);

  useEffect(() => {
    const $modalElement: HTMLDivElement | null = document.querySelector(`#${id}`);
    if (!$modalElement) return;
    const modalOptions: ModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        console.log('modal is hidden');
      },
      onShow: () => {
        console.log('modal is shown');
      },
      onToggle: () => {
        console.log('modal has been toggled');
      }
    }

    setModal(new ModalFlowbite($modalElement, modalOptions));

    return () => {
      setModal(null);
    }
  }, [id]);

  useEffect(() => {
    if (!modal) return;
    isOpen ? modal.show() : modal.hide();
  }, [modal, isOpen, openModal, closeModal]);

  return (
    <div id={id} tabIndex={-1} aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {title && (
            <Flex items="center" justify="center" className="p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">{title}</h3>
              <button
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
                type="button">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </Flex>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
