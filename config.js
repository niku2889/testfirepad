module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'SimpleJWT',
    fileStorageUrl: process.env.FILE_STORAGE_URL || 'http://localhost:3000/',
    blogPerPage: parseInt(process.env.BLOGS_PER_PAGE || '10'),
    server: {
        port: process.env.PORT || 3000
    }
};