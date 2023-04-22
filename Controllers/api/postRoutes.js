const router = require('express').Router();
const {Posts} = require('../../models');
const withAuth = require('../../utils/auth');

// GET all posts
