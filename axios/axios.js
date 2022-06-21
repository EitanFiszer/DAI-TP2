import  axios from "axios"

const clientAxios=axios.create({
baseURL: 'localhost:5000'

})

export const getMovies = async() => {
    

    return .clientAxios.get('/movies',(),)
}