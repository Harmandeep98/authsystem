const cookieToken = async (user, statusCode, res) => {
    const token = await user.getJwtToken();
    //   optionsForCookie
    const options = {
        expires: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = cookieToken;
