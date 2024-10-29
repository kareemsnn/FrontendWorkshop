"use client";
import React, { useState, useEffect } from "react";
import { Button, Modal, TextField, Box, Typography } from "@mui/material";
import { firestore } from "@/firebaseConfig";
import { collection, getDoc, setDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const namesCollection = collection(firestore, "Users");

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewUsername("");
  };

  const updateUsers = async() => {
    const snapshot = await getDocs(namesCollection);
    const newUsers = [];
    snapshot.forEach((doc) => {
      newUsers.push({ id: doc.id, ...doc.data() });
    });
    setUsers(newUsers);
  };

  const addUser = async() => {
    const username = newUsername.trim();
    const userRef = doc(namesCollection, username);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, { username });
      console.log(username + " added");
      handleClose();
      updateUsers();
    } else {
      console.log("User already exists!");
    }
  };

  useEffect(() => {
    updateUsers();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center p-8">
      <h1 
        className={`text-6xl font-bold mb-12 mt-24 transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-105 text-blue-500' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        COLORSTACK FRONTEND WORKSHOP
      </h1>

      <div className="w-[90%] h-[70%] bg-gray-500 border-2 border-gray-300 rounded-3xl p-6 flex flex-col items-center mt-12">
        <Button 
          variant="contained"
          onClick={handleOpen}
          className="mb-6"
        >
          Add Name
        </Button>

        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-blue-500 text-white font-bold">
            Users List
          </div>
          <div className="divide-y divide-gray-200">
            {users.map((user) => (
              <div 
                key={user.id} 
                className="p-4 flex justify-between items-center hover:bg-gray-50"
              >
                <span className="text-gray-800">{user.username}</span>
                <Button 
                  variant="outlined" 
                  color="error" 
                  size="small"
                  onClick={async () => {
                    await deleteDoc(doc(namesCollection, user.id));
                    updateUsers();
                  }}
                >
                  Delete
                </Button>
              </div>
            ))}
            {users.length === 0 && (
              <div className="p-4 text-gray-500 text-center">
                No users found. Add some users!
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }} className="text-black">
            Add New User
          </Typography>
          <TextField
            fullWidth
            label="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            sx={{ mb: 2 }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && newUsername.trim()) addUser();
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
              variant="contained"
              onClick={addUser}
              disabled={!newUsername.trim()}
            >
              Add User
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}