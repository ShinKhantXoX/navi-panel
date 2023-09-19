export const userPayload = {
    userCreate: {
        name: "",
        role : "",
        agree : '',
        position : "",
        jd : "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: ""
    },
    userUpdate: {
        name: "",
        role : "",
        agree : '',
        position : "",
        jd : "",
        email: "",
        phone: "",
        profile: "",
        status: null
    },
    userChangeSatus: (user) => {
        return {
            status: user ? user.status : null
        }
    }
}