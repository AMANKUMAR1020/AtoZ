const contactsDB = {
    contacts: require('../model/contacts.json'),
    setContacts: function (data) { this.contacts = data; }
};

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data; }
};

require('dotenv').config();
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const handleNewUser = async (req, res) => {
    const user = req.body.username;
    const pwd  = req.body.password;

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const duplicate = usersDB.users.find(person => person.username === user);
    if (duplicate) {
        return res.status(409).json({ 'message': 'Username already exists.' });
    }
    console.log(duplicate)

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const dateTime = format(new Date(), 'yyyy/MM/dd\tHH:mm:ss');
        const id = uuid();
        const newUser = { 
            id,
            username: user,
            password: hashedPwd,
            contacts: [],
            date: dateTime,
            refreshToken: ''
        };

        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));
        res.status(201).json({ 'success': "New user created!","user":newUser });
    
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
};

const handleLogin = async (req, res) => {
    const user = req.body.username;
    const pwd  = req.body.password;

    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = usersDB.users.find(person => person.username === user);
    if (!foundUser) return res.status(401).json({ 'message': 'Username not found.' });

    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const refreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30min' }
        );

        // Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
        const currentUser = { ...foundUser, refreshToken };

        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));

        const userContacts = contactsDB.contacts.filter(contact => contact.userId === currentUser.id); // Assuming contacts have userId

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

        res.json({
            "Token": refreshToken,
            "user": currentUser,
            "userContacts": userContacts
        });

    } else {
        res.status(401).json({ 'message': 'Invalid password.' });
    }
};

const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // No content
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = { ...foundUser, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), JSON.stringify(usersDB.users));

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
};

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); // Forbidden 

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
            { "username": decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );
        res.json({ accessToken });
    });
};

module.exports = {
    handleLogin,
    handleNewUser,
    handleLogout,
    handleRefreshToken
};
