const authMiddleware = async (resolve, root, args, context, info) => {
    if(!context.loggedIn) {
        throw new Error("Access Denied, Please Log In");
    }
    const result = await resolve(root, args, context, info)
    return result
}


module.exports = authMiddleware;