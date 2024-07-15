import axios from "axios"

const redirectLogin = () => {
    return {
        redirect: {
            destination: "/login",
            permanent: false,
        },
    }
}

export const checkAuth = async(req) => {
    let token = req?.cookies?.token?.toString().length > 0 ? req?.cookies?.token?.replace("j:", "") : null
    if(!token) return redirectLogin()
    try {
        const result = await axios.post("http://localhost:3000/api/user/check-token", {}, {
            headers:{
                Authorization: `Bearer ${token}`
            } 
        })
        return {
            props: {
                user: result?.data
            }
        }
    } catch (error) {
        return redirectLogin()
    }
}