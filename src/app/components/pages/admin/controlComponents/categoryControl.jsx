import React, { useState } from 'react';
import { useProduct } from "../../../../hooks/useProduct";
import BadgeWithControl from "../../../badgeWithControl";
import UseModal from '../../../hoc/useModal';
import ModalPrompt from '../../../modals/modalPrompt';
import ModalConfirm from '../../../modals/modalConfirm';
import { nanoid } from 'nanoid';
import BorderWrapper from '../../../hoc/borderWrapper';

const CategoryControl = () => {
  const { category, updateCategory, addCategory, deleteCategory, } = useProduct();

  const [inputValue, setInputValue] = useState({});
  const [openModal, setOpenModal] = useState({ state: false, type: '' });
  const [editCategory, setEditCategory] = useState();


  function handleToggleModal(data, modalType) {
    setOpenModal(prev => ({ state: !prev, type: modalType }))
    if (!editCategory && data) {
      setEditCategory(data);
      return;
    }
    setEditCategory();
  }

  function handleChange({ target }) {
    setInputValue({ [target.name]: target.value })
  }


  async function handleCategoryUpdate() {
    const trimed = inputValue.category && !!inputValue.category.trim();
    if (editCategory && !trimed) { return; }
    const newData = { ...editCategory, name: inputValue.category };

    await updateCategory(newData);
    setEditCategory();
    setInputValue({});
    setOpenModal({ state: false, type: '' });
  }

  async function handleDeleteCategory(id) {
    if (!editCategory) { return; }
    await deleteCategory(id);
    setEditCategory();
    setOpenModal({ state: false, type: '' });


  }
  async function handleCreateCategory(id) {
    const trimed = inputValue.categoryAdd.trim();
    console.log(trimed)
    if (!trimed) { return; }
    await addCategory({ name: inputValue.categoryAdd, id: nanoid() });
    setInputValue({});
    setOpenModal({ state: false, type: '' });
  }

  return (
    <>

      <h3 className=" text-center font-bold py-1 text-lg rounded bg-gray-700">Категории</h3>

      <div className='relative '>
        {openModal.type &&
          <UseModal >
            {
              openModal.type === 'prompt'
                ? <ModalPrompt
                  name='newCategory'
                  title='Изменить категорию:'
                  selectedName={editCategory.name}
                  value={inputValue.newCategory}
                  applyBtnText='Сохранить'
                  onChange={handleChange}
                  onModalToggle={handleToggleModal}
                  handleApply={handleCategoryUpdate}
                />
                : openModal.type === 'confirm'
                  ? <ModalConfirm
                    title='Удалить категорию ?'
                    currentData={editCategory}
                    applyBtnText='Удалить'
                    onModalToggle={handleToggleModal}
                    handleApply={handleDeleteCategory}
                  />
                  : openModal.type === 'add'
                    ? <ModalPrompt
                      name='categoryAdd'
                      title='Добавить категорию:'
                      value={inputValue.categoryAdd}
                      applyBtnText='Добавить'
                      onChange={handleChange}
                      onModalToggle={handleToggleModal}
                      handleApply={handleCreateCategory}
                    />
                    : null
            }
          </UseModal>}

        <div className=' grid h-64 overflow-hidden overflow-y-auto   rounded '>
          <BorderWrapper>
            <span className='m-5'>
              <button
                onClick={() => handleToggleModal(null, 'add')}
                className=" mx-2 mt-1   inline-flex  items-center px-1 bg-yellow-400  rounded hover:bg-yellow-400/90" >
                <i className="bi bi-plus-lg "></i>
                <span className='text-xs ms-1'> Добавить</span>
              </button>
              <BadgeWithControl data={category} onToggleModal={handleToggleModal} />
            </span>
          </BorderWrapper>
        </div >

      </div >
    </>

  );
}

export default CategoryControl;