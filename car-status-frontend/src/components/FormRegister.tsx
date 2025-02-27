import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { registerUser } from '../services/authService'
import { useNavigate } from 'react-router-dom'

export default function FormRegister() {
    const { dispatch } = useContext(AuthContext) // Obtenemos el dispatch del Context
    const [formData, setFormData] = useState({ username: '', email: '', password: '', })

    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Hacer la solicitud POST al backend para registrar al usuario
        const data = await registerUser(formData)
        if (data) {
            localStorage.setItem('token', data.token)
            dispatch({ type: 'SET_USER', payload: { user: data.user, token: data.token } })
            setFormData({ username: '', email: '', password: '' }) // Reiniciamos el formulario
            navigate('/login')
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md mx-auto"
        >
            <h2 className="text-2xl font-semibold text-center mb-8 text-slate-800">Crear una nueva cuenta</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Nombre de usuario</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Correo electrónico</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold py-2 rounded-lg transition-all cursor-pointer"
            >
                Registrarse
            </button>
        </form>
    )
}
