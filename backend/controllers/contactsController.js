require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const { error } = require('console');

const getAllContacts = async (req, res) => {

    if(contactsDB.contacts.length === 0){
      await  res.status(404).json({'message':'constants are empty'});
    }

    await  res.status(200).json(contactsDB.contacts);
}


const createContact = async (req, res) => {
    console.log(req.body);
    const {photo} = req.file
    const { user, phoneNumber, email} = req.body;
    console.log("aman")

    if (!user || !phoneNumber || !email) return res.status(400).json({ 'message': 'all field are required.' });

    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.sendStatus(401).json({ 'message': 'Username not found.' });

    try {
        const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
        const id = uuid();
        const img = photo || "nuLL";

        const newContact = {
            "id": id,
            "username":user,
            "phoneNumber": phoneNumber,
            "email": email,
            "photo":img,
            "date": dateTime,
        };
        
        contactsDB.setContacts([...contactsDB.contacts, newContact]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'constants.json'),JSON.stringify(contactsDB.contacts));
        console.log(contactsDB.contacts);

        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        //const currentUser = { ...foundUser, refreshToken };
        const currentUser = foundUser.contacts.push(newContact);

        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'),JSON.stringify(usersDB.users));
        
        res.status(201).json({ 'success': `New constant ${newContact} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const updateContact = async (req, res) => {
    const { id, user, phoneNumber, email, photo} = req.body;

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    
    if (!id || !user || !phoneNumber || !email) return res.status(400).json({ 'message': 'all field are required.' });

    const Constacts = contactsDB.contacts.find(constant => constant.id === id);
    if(!Constacts){res.status(400).json({"message":"contacts is not found"})}

    if(!foundUser.contacts.include(id)){
        return res.sendStatus(401).json({ 'message': 'unauthrise user' });
    }

    // Is refreshToken in db?
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        return res.sendStatus(401).json({ 'message': 'unauthrise user' });
    }

    //img
    try {

        const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
        const img = photo || "nuLL";

        const newContact = {
            "id": id,
            "username":user,
            "phoneNumber": phoneNumber,
            "email": email,
            "photo":img,
            "date": dateTime,
        };

        contactsDB.setContacts([...contactsDB.contacts, newContact]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'constants.json'),JSON.stringify(contactsDB.contacts));
        console.log(contactsDB.contacts);

        res.status(201).json({ 'success': `New constant ${newContact} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const deleteContact = async (req, res) => {
    const id = req.params

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        return res.sendStatus(401).json({ 'message': 'unauthrise user' });
    }
    
    const Contacts = contactsDB.contacts.filter(constant => constant.id !== id);
    contactsDB.setContacts([...Contacts]);

    foundUser.contacts.remove(id);
    const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);

    usersDB.setUsers([...otherUsers, foundUser]);
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'),JSON.stringify(usersDB.users));

    try{
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'constants.json'),JSON.stringify(contactsDB.contacts));
    }catch {
        console.log(error);
        res.status(401).json({"message":"an error is occur"});
    }

    res.sendStatus(200);
}

const getContact = async (req, res) => {
//    const {id} = req.params.id;

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        return res.sendStatus(401).json({ 'message': 'invailed user' });
    }

    const constant = contactsDB.contacts.find(constant => constant.id === parseInt(req.params.id));
    if(!constant){
      await res.status(404).json({"message":"contact is not found"});
    }
    await  res.status(200).json(constant);
}

module.exports = {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact,
    getContact
}