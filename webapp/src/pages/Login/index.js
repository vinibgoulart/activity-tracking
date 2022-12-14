import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import api from "../../services/api";

import Button from '../../components/Button'

export default function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        formState,
    } = useForm();

    const onLogin = async (data) => {
        try {
            const res = await api.post("api/login", {
                email: data.email,
                password: data.password,
            });
            localStorage.setItem("token", res.data.access_token);

            navigate("/home");
        } catch (err) {
            handleStyleFailFiedls();
        }
    };

    const handleStyleFailFiedls = () => {
        document.getElementById('password-alert').classList.remove('hidden');
        document.getElementById('password-input').classList.add('border-red-500');
        document.getElementById('email-input').classList.add('border-red-500');
    };

    return (
        <div className="flex items-center justify-center items-center h-screen">
            <div className="w-full max-w-xs">
                <form
                    onSubmit={handleSubmit(onLogin)}
                    className="bg-white shadow-md w-full rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            E-mail
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email"
                            type="text"
                            id="email-input"
                            {...register("email")}
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="******"
                            type="password"
                            id="password-input"
                            {...register("password")}
                        />
                        <p className="hidden text-red-500 text-xs italic" id="password-alert">
                            Check your credentials and try again.
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button
                            type="submit"
                        >Sign In</Button>
                        <Button
                            navigate="/register"
                        >Register</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
