const authMiddleware = async (context) => {
    if(!context.isLoggedIn) {
        throw new Error('Access Token was not provided, Please Login');
    }
    const result = await resolve(root, args, context, info)
    return result
}

module.exports = authMiddleware;