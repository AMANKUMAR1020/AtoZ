const contactsDB = {
    contacts: require('../../model/contacts.json'),
    setContacts: function (data) { this.contacts = data; }
};

const usersDB = {
    users: require('../../model/users.json'),
    setUsers: function (data) { this.users = data; }
};

require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const getAllContacts = async (req, res) => {
    if (contactsDB.contacts.length === 0) {
        return res.status(404).json({ 'message': 'contacts are empty' });
    }
    return res.status(200).json(contactsDB.contacts);
};

const createContact = async (req, res) => {
    const { user, phoneNumber, email } = req.body;
    const photo = req.file ? req.file.filename : "null"; // Use filename instead of photo

    if (!user || !phoneNumber || !email) {
        return res.status(400).json({ 'message': 'All fields are required.' });
    }

    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) {
        return res.status(401).json({ 'message': 'Username not found.' });
    }

    try {
        const dateTime = format(new Date(), 'yyyy/MM/dd\tHH:mm:ss');
        const id = uuid();

        const newContact = {
            id,
            username: user,
            phoneNumber,
            email,
            photo,
            date: dateTime,
        };

        contactsDB.setContacts([...contactsDB.contacts, newContact]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'contacts.json'), JSON.stringify(contactsDB.contacts));

        foundUser.contacts.push(newContact); // Add new contact to user's contacts
        usersDB.setUsers([...usersDB.users.filter(person => person.username !== foundUser.username), foundUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));

        return res.status(201).json({ 'success': `New contact ${newContact.username} created!` });
    } catch (err) {
        return res.status(500).json({ 'message': err.message });
    }
};

const updateContact = async (req, res) => {
    const { id, user, phoneNumber, email, photo } = req.body;

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    if (!id || !user || !phoneNumber || !email) {
        return res.status(400).json({ 'message': 'All fields are required.' });
    }

    const contact = contactsDB.contacts.find(contact => contact.id === id);
    if (!contact) {
        return res.status(404).json({ "message": "Contact not found" });
    }

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        return res.status(401).json({ 'message': 'Unauthorized user' });
    }

    try {
        const dateTime = format(new Date(), 'yyyy/MM/dd\tHH:mm:ss');
        const updatedContact = {
            id,
            username: user,
            phoneNumber,
            email,
            photo: photo || contact.photo, // Keep existing photo if not provided
            date: dateTime,
        };

        contactsDB.setContacts(contactsDB.contacts.map(c => (c.id === id ? updatedContact : c)));
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'contacts.json'), JSON.stringify(contactsDB.contacts));

        return res.status(200).json({ 'success': `Contact ${updatedContact.username} updated!` });
    } catch (err) {
        return res.status(500).json({ 'message': err.message });
    }
};

const deleteContact = async (req, res) => {
    const { id } = req.params;

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        return res.status(401).json({ 'message': 'Unauthorized user' });
    }

    contactsDB.setContacts(contactsDB.contacts.filter(contact => contact.id !== id));
    foundUser.contacts = foundUser.contacts.filter(contact => contact.id !== id); // Remove contact from user's contacts

    usersDB.setUsers([...usersDB.users.filter(person => person.username !== foundUser.username), foundUser]);
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));

    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'contacts.json'), JSON.stringify(contactsDB.contacts));

    return res.sendStatus(200);
};

const getContact = async (req, res) => {
    const { id } = req.params;

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        return res.status(401).json({ 'message': 'Unauthorized user' });
    }

    const contact = contactsDB.contacts.find(contact => contact.id === id);
    if (!contact) {
        return res.status(404).json({ "message": "Contact not found" });
    }

    return res.status(200).json(contact);
};

router.route('/')
    .get(getAllContacts)
    .post(upload.single('uploaded_file'), createContact);

router.route('/:id')
    .get(getContact)
    .put(upload.single('uploaded_file'), updateContact)
    .delete(deleteContact);

module.exports = router;
















// const contactsDB = {
//     contacts: require('../../model/contacts.json'),
//     setContacts: function (data) { this.contacts = data }
// }
// const usersDB = {
//     users: require('../../model/users.json'),
//     setUsers: function (data) { this.users = data }
// }
// require('dotenv').config();
// const fsPromises = require('fs').promises;
// const path = require('path');

// const { format } = require('date-fns');
// const { v4: uuid } = require('uuid');
// const { error } = require('console');
// const express = require('express');
// const router = express.Router();
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// //const contactsController = require('../../controllers/contactsController');


// const getAllContacts = async (req, res) => {

//     if(contactsDB.contacts.length === 0){
//       await  res.status(404).json({'message':'constants are empty'});
//     }

//     await  res.status(200).json(contactsDB.contacts);
// }

// const createContact = async (req, res) => {
//     const {photo} = req.file
//     const { user, phoneNumber, email} = req.body;

//     if (!user || !phoneNumber || !email) return res.status(400).json({ 'message': 'all field are required.' });

//     const foundUser = usersDB.users.find(person => person.username === user);
//     if (!foundUser) return res.sendStatus(401).json({ 'message': 'Username not found.' });


//     try {

//         const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
//         const id = uuid();
//         const img = photo || "nuLL";

//         const newContact = {
//             "id": id,
//             "username":user,
//             "phoneNumber": phoneNumber,
//             "email": email,
//             "photo":img,
//             "date": dateTime,
//         };
        
//         contactsDB.setContacts([...contactsDB.contacts, newContact]);
//         await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'constants.json'),JSON.stringify(contactsDB.contacts));
//         console.log(contactsDB.contacts);

//         const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
//         //const currentUser = { ...foundUser, refreshToken };
//         const currentUser = foundUser.contacts.push(newContact);

//         usersDB.setUsers([...otherUsers, currentUser]);
//         await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'),JSON.stringify(usersDB.users));
        
//         res.status(201).json({ 'success': `New constant ${newContact} created!` });
//     } catch (err) {
//         res.status(500).json({ 'message': err.message });
//     }
// }

// const updateContact = async (req, res) => {
//     const { id, user, phoneNumber, email, photo} = req.body;

//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(204);
//     const refreshToken = cookies.jwt;
    
//     if (!id || !user || !phoneNumber || !email) return res.status(400).json({ 'message': 'all field are required.' });

//     const Constacts = contactsDB.contacts.find(constant => constant.id === id);
//     if(!Constacts){res.status(400).json({"message":"contacts is not found"})}

//     // if(!foundUser.contacts.include(id)){
//     //     return res.sendStatus(401).json({ 'message': 'unauthrise user' });
//     // }

//     // Is refreshToken in db?
//     const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
//     if (!foundUser) {
//         return res.sendStatus(401).json({ 'message': 'unauthrise user' });
//     }

//     //img
//     try {

//         const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
//         const img = photo || "nuLL";

//         const newContact = {
//             "id": id,
//             "username":user,
//             "phoneNumber": phoneNumber,
//             "email": email,
//             "photo":img,
//             "date": dateTime,
//         };

//         contactsDB.setContacts([...contactsDB.contacts, newContact]);
//         await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'constants.json'),JSON.stringify(contactsDB.contacts));
//         console.log(contactsDB.contacts);

//         res.status(201).json({ 'success': `New constant ${newContact} created!` });
//     } catch (err) {
//         res.status(500).json({ 'message': err.message });
//     }
// }

// const deleteContact = async (req, res) => {
//     const id = req.params

//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(204);
//     const refreshToken = cookies.jwt;

//     const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
//     if (!foundUser) {
//         return res.sendStatus(401).json({ 'message': 'unauthrise user' });
//     }
    
//     const Contacts = contactsDB.contacts.filter(constant => constant.id !== id);
//     contactsDB.setContacts([...Contacts]);

//     foundUser.contacts.remove(id);
//     const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);

//     usersDB.setUsers([...otherUsers, foundUser]);
//     await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'),JSON.stringify(usersDB.users));

//     try{
//         await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'constants.json'),JSON.stringify(contactsDB.contacts));
//     }catch {
//         console.log(error);
//         res.status(401).json({"message":"an error is occur"});
//     }

//     res.sendStatus(200);
// }

// const getContact = async (req, res) => {
// //    const {id} = req.params.id;

//     const cookies = req.cookies;
//     if (!cookies?.jwt) return res.sendStatus(204);
//     const refreshToken = cookies.jwt;

//     const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
//     if (!foundUser) {
//         return res.sendStatus(401).json({ 'message': 'unauthrise user' });
//     }

//     const constant = contactsDB.contacts.find(constant => constant.id === parseInt(req.params.id));
//     if(!constant){
//       await res.status(404).json({"message":"contact is not found"});
//     }
//     await  res.status(200).json(constant);
// }


// router.route('/')
//     .get(getAllContacts)
//     .post(upload.single('uploaded_file'),createContact);

// router.route('/:id')
//     .get(getContact)
//     .put(upload.single('uploaded_file'),updateContact)
//     .delete(deleteContact);

// module.exports = router;






















// const express = require('express');
// const router = express.Router();
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
// const contactsController = require('../../controllers/contactsController');


// router.route('/')
//     .get(contactsController.getAllContacts)
//     .post(upload.single('uploaded_file'),contactsController.createContact);

// router.route('/:id')
//     .get(contactsController.getContact)
//     .put(contactsController.updateContact)
//     .delete(contactsController.deleteContact);

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const contactsController = require('../../controllers/contactsController');


// router.route('/')
//     .get(contactsController.getAllContacts)
//     .post(contactsController.createContact);

// router.route('/:id')
//     .get(contactsController.getContact)
//     .put(contactsController.updateContact)
//     .delete(contactsController.deleteContact);

// module.exports = router;