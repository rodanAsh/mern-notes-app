import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import NoteCard from '../../components/cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCard from '../../components/EmptyCard/EmptyCard'
import AddNotesImg from '../../assets/images/add-notes.PNG'

const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null
  })

  const [showToastMsg,setShowToastMsg] = useState({
    isShown: false,
    type: "add",
    message: ""
  })

  const [allNotes,setAllNotes] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type: "edit" })
  }

  // Get user info
  const getUserInfo = async() => {
    try {
      const response = await axiosInstance.get('/get-user');

      if (response.data && response.data.user) {
        setUserInfo(response.data.user)
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  // Get all notes
  const getAllNotes = async() => {
    try {
      const response = await axiosInstance.get("get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }

    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
      
    }
  }

  // Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete(`/delete-note/${noteId}`);

      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.message
      ) {
        console.log("An unexpected error occured. Please try again.")
      }
    }
  }

  // Show Toast message
  const showToastMessage = (message, type) => {
    setShowToastMsg({
      isShown: true,
      message,
      type
    })
  }

  // close toast message
  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false,
      message: ""
    })
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {}
  },[])

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className='container mx-auto px-8'>
        {
          allNotes.length > 0 ? (
            <div className='grid grid-cols-3 gap-4 mt-8'>
              {
                allNotes.map((note,index) => (
                  <NoteCard 
                    key={note._id}
                    title={note.title}
                    date={note.createdOn}
                    content={note.content}
                    tags={note.tags}
                    isPinned={note.isPinned}
                    onEdit={() => handleEdit(note)}
                    onDelete={() => deleteNote(note)}
                    onPinNote={() => {}}
                  />
              ))}
            </div>
          ) : (
            <EmptyCard 
              imgSrc={AddNotesImg}
              message={"Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas and reminders. Let's get started!"}
            />
          )
        }
      </div>

      <button 
        className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => setOpenAddEditModal({isShown: true, type: "add", data: null})}>
        <MdAdd className='text-[32px] text-white' />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          }
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          getAllNotes={getAllNotes}
          onClose={
            () => setOpenAddEditModal({isShown:false, type:"add", data:null})
          }
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  )
}

export default Home